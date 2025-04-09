<?php

namespace App\Service\OAuth;

use App\Entity\User;
use League\OAuth2\Client\Provider\GoogleUser;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class GoogleOAuthService extends AbstractOAuthService
{
    protected function getProviderKey(): string
    {
        return 'google';
    }

    protected function getUser(ResourceOwnerInterface $userOAuth): User
    {
        if (!$userOAuth instanceof GoogleUser) {
            throw new \LogicException();
        }
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $userOAuth->getEmail(), 'googleId' => $userOAuth->getId()]);
        if (!$user) {
            $user = new User();
            $user->setEmail($userOAuth->getEmail());
            $user->setGoogleId($userOAuth->getId());
            $user->setRoles([User::ROLE_USER]);
            $this->em->persist($user);
        }
        $this->em->flush();

        return $user;
    }
}
