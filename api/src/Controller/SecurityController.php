<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\OAuth\OAuthServiceFactory;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;

final class SecurityController extends AbstractController
{
    public function __construct(private OAuthServiceFactory $oauthFactory) {}


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
