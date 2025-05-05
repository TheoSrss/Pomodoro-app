<?php

namespace App\Controller;

use App\ApiResource\PomodoroSessionAction;
use App\Entity\PomodoroSession;
use App\Service\MercureSubscriberTokenGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class PomodoroMercureController extends AbstractController
{
    public function __construct(
        private HubInterface $hub,
        private SerializerInterface $serializer,

    ) {}






    #[Route('/api/mercure/token', name: 'mercure_token')]
    public function token(MercureSubscriberTokenGenerator $generator): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        $token = $generator->createTokenForUser($user);

        return new JsonResponse(['token' => $token]);
    }

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
            sprintf("/pomodoro/3", $session->getId()),
            $payload
        );
        $this->hub->publish($update);
    }
}
