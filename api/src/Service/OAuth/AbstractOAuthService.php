<?php

namespace App\Service\OAuth;

use App\Entity\User;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Doctrine\ORM\EntityManagerInterface;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;
use League\OAuth2\Client\Token\AccessToken;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

abstract class AbstractOAuthService
{

    public function __construct(
        protected ClientRegistry $clientRegistry,
        protected JWTTokenManagerInterface $JWTManager,
        protected EntityManagerInterface $em
    ) {}

    public function authenticate(string $accessToken): array
    {
        try {
            $client = $this->clientRegistry->getClient($this->getProviderKey());
            $token = new AccessToken([
                'access_token' => $accessToken
            ]);

            $userOAuth = $client->fetchUserFromToken($token);
            $user = $this->getUser($userOAuth);

            return ['user' => $user, 'token' => $this->JWTManager->create($user)];
        } catch (\Exception $e) {
            throw new \RuntimeException("Error with " . $this->getProviderKey() . " authentication");
        }
    }

    abstract protected function getUser(ResourceOwnerInterface $userOAuth): User;
    abstract protected function getProviderKey(): string;
}
