<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\PomodoroSessionAction;
use App\Entity\PomodoroSession;
use App\Service\PomodoroSessionManager;
use Symfony\Bundle\SecurityBundle\Security;

class PomodoroSessionProcessor implements ProcessorInterface
{
    public function __construct(
        private PomodoroSessionManager $manager,
        private Security $security,
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): PomodoroSession {
        if ($operation->getName() === 'session_create') {
            return $this->manager->newSession($data);
        }

        $actionStr = $uriVariables['action'] ?? null;
        $action = PomodoroSessionAction::fromString($actionStr);

        $session = match ($action) {
            PomodoroSessionAction::CREATE => $this->manager->newSession($data),
            PomodoroSessionAction::START => $this->manager->startSession(),
            PomodoroSessionAction::PAUSE => $this->manager->pauseSession(),
            PomodoroSessionAction::ABORT => $this->manager->abortSession(),
            default => throw new \LogicException("Unknown Pomodoro action: $action"),
        };

        return $session;
    }
}
