<?php


namespace App\EventListener;

use App\Service\MercureSubscriberTokenGenerator;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use App\Entity\User;

class AuthenticationSuccessListener
{

    public function __construct(
        private MercureSubscriberTokenGenerator $generator
    ) {}

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        /** @var User $user */
        $user = $event->getUser();
        if (!$user) {
            return;
        }

        $data = $event->getData();
        $data['user'] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'jwtSubscriber' => $this->generator->createTokenForUser($user)

        ];

        $event->setData($data);
    }
}
