<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\GroupSession;
use App\Service\GroupSessionManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Service\PomodoroSessionManager;

class ActiveGroupSessionProvider implements ProviderInterface
{
    public function __construct(
        private PomodoroSessionManager $manager
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?GroupSession
    {
        try {
            $session = $this->manager->getActiveSession();
        } catch (NotFoundHttpException $e) {
            return null;
        }
        return $session;
    }
}
