<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\GroupSessionAction;
use App\ApiResource\PomodoroSessionAction;
use App\Entity\PomodoroSession;
use App\Repository\GroupSessionRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Service\PomodoroSessionManager;
use App\Service\GroupSessionManager;

class GroupSessionMemberProcessor implements ProcessorInterface
{
    public function __construct(
        private GroupSessionManager $manager,
        private GroupSessionRepository $groupSessionRepository
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ) {
        // dd('test');
        $name = $operation->getName();
        return match ($name) {
            'group_session_create' => $this->manager->newGroupSession($data),
            'group_session_invite' => $this->manager->newMembers($data),
            'group_session_remove_member' => $this->removeMember($uriVariables),
            'group_member_action' => $this->handleMemberAction($uriVariables),
            default => throw new BadRequestHttpException("Unsupported GroupSession action: $name"),
        };
    }

    private function removeMember(array $uriVariables)
    {
        $groupId = $uriVariables['group_id'] ?? null;
        $memberId = $uriVariables['member_id'] ?? null;
        if (!$groupId || !$memberId) {
            throw new BadRequestHttpException('Missing group_id or member_id');
        }
        $this->manager->removeMemberFromGroup((int)$groupId, (int)$memberId);
        return ['success' => true];
    }

    private function handleMemberAction(array $uriVariables)
    {
        $groupId = $uriVariables['groupSession_id'] ?? null;
        $action = $uriVariables['action'] ?? null;
        if (!$groupId || !$action) {
            throw new BadRequestHttpException('Missing groupSession_id or action');
        }
        $action = GroupSessionAction::fromString($action);
        dd('good');
        if (!isset($allowed[$action])) {
            throw new BadRequestHttpException('Invalid action');
        }
        $this->manager->updateCurrentUserStatusForGroup((int)$groupId, $allowed[$action]);
        return ['success' => true];
    }
}
