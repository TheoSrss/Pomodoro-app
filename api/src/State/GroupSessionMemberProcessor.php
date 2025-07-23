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
        private GroupSessionManager $manager
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ) {
        $name = $operation->getName();
        return match ($name) {
            'group_session_create' => $this->manager->newGroupSession($data),
            'group_session_invite' => $this->manager->newMembers($data),
            default => throw new BadRequestHttpException("Unsupported GroupSession action: $name"),
        };
    }
}
