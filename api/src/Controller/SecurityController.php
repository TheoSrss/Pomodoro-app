<?php

namespace App\Controller;

use App\ApiResource\PomodoroSessionAction;
use App\Entity\PomodoroSession;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\OAuth\OAuthServiceFactory;
use Doctrine\ORM\EntityManagerInterface;
use Dom\Entity;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;

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

    #[Route('/oauth/check/{service}', name: 'auth_oauth_check', methods: ['GET', 'POST'])]
    public function connectCheck(string $service): JsonResponse
    {
        try {
            $OAuthService = $this->oauthFactory->getOAuthService($service);
            $token = $OAuthService->authenticate();
            return new JsonResponse(['token' => $token]);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
