<?php


namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $user = $event->getUser();
        if (!$user) {
            return;
        }

        $data = $event->getData();
        $data['user'] = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
        ];

        $event->setData($data);
    }
}
