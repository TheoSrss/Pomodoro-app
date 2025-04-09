<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\OAuth\OAuthServiceFactory;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\HubInterface;

final class SecurityController extends AbstractController
{
    public function __construct(
        private OAuthServiceFactory $oauthFactory,
        private EntityManagerInterface $em,
        private HubInterface $hub,
        private PomodoroMercureController $publisher
    ) {}


    #[Route('/oauth/connect/{service}', name: 'auth_oauth_connect', methods: ['GET', 'POST'])]
    public function connect(string $service, ClientRegistry $clientRegistry)
    {
        return $clientRegistry
            ->getClient($service)
            ->redirect([], []);
    }

    #[Route('/api/oauth/check/{service}', name: 'auth_oauth_check', methods: ['GET', 'POST'])]
    public function connectCheck(string $service, Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            if (!isset($data['access_token'])) {
                return new JsonResponse(['error' => 'Missing access_token'], 400);
            }

            $OAuthService = $this->oauthFactory->getOAuthService($service);
            $infos = $OAuthService->authenticate($data['access_token']);
            return new JsonResponse([
                'token' => $infos['token'],
                'user' => [
                    'id' => $infos['user']->getId(),
                    'email' => $infos['user']->getEmail(),
                ]
            ]);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
