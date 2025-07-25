<?php

namespace App\Controller;

use App\ApiResource\GroupSessionAction;
use App\ApiResource\PomodoroSessionAction;
use App\Entity\GroupSession;
use App\Entity\GroupSessionMember;
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
            sprintf("/pomodoro/%s", $session->getCreator()->getId()),
            $payload
        );


        // $topics = ["/pomodoro/{$session->getCreator()->getId()}"];

        // // Si c'est une session de groupe, ajouter le topic du groupe
        // if ($session->getGroupSession()) {
        //     $topics[] = "/group/{$session->getGroupSession()->getId()}";
        // }

        // $update = new Update($topics, $payload);
        // dd($_ENV['MERCURE_JWT_SECRET'] ?? getenv('MERCURE_JWT_SECRET'));

        $this->hub->publish($update);
    }

    public function publishGroupSession(GroupSession $groupSession, GroupSessionAction $action): void
    {
        $groupSessionData = $this->serializer->serialize(
            $groupSession,
            'json',
            ['groups' => ['group:read']]
        );

        $payload = json_encode([
            'action' => $action->value,
            'groupSession' => json_decode($groupSessionData, true),
        ]);

        $topics = ["/group/{$groupSession->getId()}"];

        // Ajouter le topic pour chaque membre
        foreach ($groupSession->getMembers() as $member) {
            $topics[] = "/user/{$member->getUser()->getId()}/groups";
        }

        $update = new Update($topics, $payload);
        $this->hub->publish($update);
    }

    public function publishMemberUpdate(GroupSessionMember $member, string $status): void
    {
        $memberData = $this->serializer->serialize(
            $member,
            'json',
            ['groups' => ['member:read']]
        );

        $payload = json_encode([
            'action' => $status,
            'member' => json_decode($memberData, true),
        ]);

        $topics = [
            "/group/{$member->getGroupSession()->getId()}",
            "/user/{$member->getUser()->getId()}/groups"
        ];

        $update = new Update($topics, $payload);
        $this->hub->publish($update);
    }
}
