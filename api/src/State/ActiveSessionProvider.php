<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\PomodoroSession;
use App\Service\PomodoroSessionManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ActiveSessionProvider implements ProviderInterface
{
    public function __construct(
        private PomodoroSessionManager $manager
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?PomodoroSession
    {
        try {
            $session = $this->manager->getActiveSession();
        } catch (NotFoundHttpException $e) {
            return null;
        }

        return $session;
    }
}
