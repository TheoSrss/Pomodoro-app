<?php

namespace App\Service\OAuth;

use App\Entity\User;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class GithubOAuthService extends AbstractOAuthService
{
    protected function getProviderKey(): string
    {
        return 'github';
    }

    protected function getUser(ResourceOwnerInterface $userOAuth): User
    {
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $userOAuth->getEmail(), 'githubId' => $userOAuth->getId()]);

        if (!$user) {
            $user = new User();
            $user->setEmail($userOAuth->getEmail());
            $this->em->persist($user);
        }

        $this->em->flush();

        return $user;
    }
}
