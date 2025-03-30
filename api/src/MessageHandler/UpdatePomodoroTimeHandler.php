<?php

namespace App\MessageHandler;

use App\Message\UpdatePomodoroTime;
use App\Repository\PomodoroSessionRepository;
use App\Service\PomodoroSessionManager;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\DelayStamp;

#[AsMessageHandler]
class UpdatePomodoroTimeHandler
{
    public function __construct(
        private PomodoroSessionManager $manager,
        private PomodoroSessionRepository $sessionRepository,
        private MessageBusInterface $bus

    ) {}

    public function __invoke(UpdatePomodoroTime $message)
    {
        $session = $this->sessionRepository->find($message->getSessionId());

        if (!$session) {
            return;
        }

        if ($session->getIsPaused() || $session->getIsAborted() || $session->getEndedAt()) {
            return;
        }

        $this->manager->tick($session);

        $this->redispatch($message->getSessionId());
    }


    private function redispatch(int $sessionId): void
    {
        $this->bus->dispatch(
            new UpdatePomodoroTime($sessionId),
            [new DelayStamp(1000)]
        );
    }
}
