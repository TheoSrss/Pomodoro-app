<?php

namespace App\Service;

use App\Entity\User;

class MercureSubscriberTokenGenerator
{
    public function __construct(
        private MercureJwtEncoder $encoder,
        private string $secret,

    ) {}

    public function createTokenForUser(User $user): string
    {
        return $this->encoder->encode(
            [
                'mercure' => [
                    'subscribe' => [sprintf('/user/%d/session', $user->getId())],
                ],
                'iat' => time(),
                'exp' => time() + 3600,
                'sub' => $user->getUserIdentifier(),
            ],
            $this->secret,
            'HS256'
        );
    }
}
