<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\PomodoroSession;
use App\Service\PomodoroSessionManager;

class ActiveSessionProvider implements ProviderInterface
{
    public function __construct(
        private PomodoroSessionManager $manager
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?PomodoroSession
    {
        $session = $this->manager->getActiveSession();
        return $session;
    }
}
