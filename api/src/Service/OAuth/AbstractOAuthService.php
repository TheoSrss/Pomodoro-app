<?php

namespace App\Service\OAuth;

use App\Entity\User;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Doctrine\ORM\EntityManagerInterface;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

abstract class AbstractOAuthService
{

    public function __construct(
        protected ClientRegistry $clientRegistry,
        protected JWTTokenManagerInterface $JWTManager,
        protected EntityManagerInterface $em
    ) {}

    public function authenticate(): string
    {
        try {
            $client = $this->clientRegistry->getClient($this->getProviderKey());
            $userOAuth = $client->fetchUser();
            $user = $this->getUser($userOAuth);

            return $this->JWTManager->create($user);
        } catch (\Exception $e) {
            throw new \RuntimeException("Error with " . $this->getProviderKey() . " authentication");
        }
    }

    abstract protected function getUser(ResourceOwnerInterface $userOAuth): User;
    abstract protected function getProviderKey(): string;
}
