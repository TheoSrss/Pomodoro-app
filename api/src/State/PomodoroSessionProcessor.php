<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\PomodoroSessionAction;
use App\Entity\GroupSession;
use App\Entity\PomodoroSession;
use App\Repository\GroupSessionRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Service\PomodoroSessionManager;
use App\Service\GroupSessionManager;

class PomodoroSessionProcessor implements ProcessorInterface
{
    public function __construct(
        private PomodoroSessionManager $manager,
        private GroupSessionManager $groupManager,
        private GroupSessionRepository $groupRepository
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): PomodoroSession|GroupSession {
        
        if ($operation->getName() === 'session_create') {
            return $this->manager->newSession($data);
        }

        $actionStr = $uriVariables['action'] ?? null;
        if (!$actionStr) {
            throw new BadRequestHttpException('Action not specified in URI.');
        }
        $action = PomodoroSessionAction::fromString($actionStr);

        return match ($action) {
            PomodoroSessionAction::START => $this->manager->startSession(),
            PomodoroSessionAction::PAUSE => $this->manager->pauseSession(),
            PomodoroSessionAction::ABORT => $this->manager->abortSession(),
            default => throw new BadRequestHttpException("Unsupported Pomodoro action: $actionStr"),
        };
    }
}
