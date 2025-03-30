<?php

namespace App\Controller;

use App\ApiResource\PomodoroSessionAction;
use App\Entity\PomodoroSession;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Serializer\SerializerInterface;

class PomodoroPublishController
{
    public function __construct(
        private HubInterface $hub,
        private SerializerInterface $serializer,

    ) {}

    public function publish(PomodoroSession $session, PomodoroSessionAction $action): void
    {
        $sessionData = $this->serializer->serialize(
            $session,
            'json',
            ['groups' => ['pomodoro:read']]
        );

        $payload = json_encode([
            'action' => $action->value,
            'session' => json_decode($sessionData, true),
        ]);

        $update = new Update(
            sprintf("/pomodoro/%s", $session->getId()),
            $payload
        );

        $this->hub->publish($update);
    }
}
