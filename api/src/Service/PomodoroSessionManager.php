<?php

namespace App\Service;

use App\ApiResource\PomodoroSessionAction;
use App\Controller\PomodoroMercureController;
use App\Entity\PomodoroSession;
use App\Entity\User;
use App\Message\UpdatePomodoroTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Messenger\MessageBusInterface;

class PomodoroSessionManager
{

    public function __construct(
        private EntityManagerInterface $em,
        private Security $security,
        private MessageBusInterface $busForCounter,
        private PomodoroMercureController $publisher,
    ) {}

    private function getUser(): User
    {
        $user = $this->security->getUser();

        if (!$user instanceof User) {
            throw new \LogicException('No authenticated user found.');
        }
        return $user;
    }

    private function activeSessionExist(): ?PomodoroSession
    {
        return $this->em->getRepository(PomodoroSession::class)->findOneBy([
            'creator' => $this->getUser(),
            'endedAt' => null,
            'isAborted' => false,
        ]);
    }

    private function assertActiveSession(): void
    {
        $session = $this->activeSessionExist();
        if (!$session) {
            throw new NotFoundHttpException('No active session found.');
        }
    }

    private function assertStartedSession(PomodoroSession $session): void
    {
        if (!$session->getStartedAt() || !$session->getPhaseStartedAt()) {
            throw new \LogicException('Session not started');
        }
    }

    public function getActiveSession()
    {
        $this->assertActiveSession();
        return $this->activeSessionExist();
    }

    public function newSession(PomodoroSession $session): PomodoroSession
    {
        if ($this->activeSessionExist()) {
            throw new \LogicException('An active session is already in progress.');
        }

        $session->setCreator($this->getUser());
        $this->em->persist($session);
        $this->em->flush();

        return $this->start($session);
    }

    public function startSession(): PomodoroSession
    {
        $session = $this->getActiveSession();

        if ($session->getStartedAt() || $session->getPhaseStartedAt()) {
            throw new \LogicException('Session already started');
        }
        return $this->start($session);
    }

    private function start(PomodoroSession $session)
    {
        $now = new \DateTimeImmutable();
        $session->setStartedAt($now);
        $session->setPhaseStartedAt($now);

        $this->em->flush();

        $this->busForCounter->dispatch(new UpdatePomodoroTime($session->getId()));
        $this->publisher->publish($session, PomodoroSessionAction::START);
        return $session;
    }


    public function pauseSession(): PomodoroSession
    {

        $session = $this->getActiveSession();

        $this->assertStartedSession($session);

        $session->setIsPaused(!$session->getIsPaused());

        $this->em->flush();

        if (!$session->getIsPaused()) {
            $this->busForCounter->dispatch(new UpdatePomodoroTime($session->getId()));
        }

        $this->publisher->publish($session, PomodoroSessionAction::PAUSE);
        return $session;
    }

    public function abortSession(): PomodoroSession
    {
        $session = $this->getActiveSession();
        $this->assertStartedSession($session);

        $session->setIsAborted(true);

        $this->em->flush();
        $this->publisher->publish($session, PomodoroSessionAction::ABORT);
        return $session;
    }


    // BACK ACTIONS
    public function nextPhase(PomodoroSession $session): PomodoroSession
    {

        $this->assertStartedSession($session);

        if ($session->getIsPaused()) {
            throw new \LogicException('Session in pause');
        }

        if (
            $session->getPhase() === PomodoroSession::PHASE_LONG_BREAK
        ) {
            $session->setEndedAt(new \DateTimeImmutable());
            $this->em->flush();
            return $session;
        }

        $session->setElapsedSeconds(0);

        $nextPhase = match ($session->getPhase()) {
            PomodoroSession::PHASE_FOCUS => ($session->getCurrentCycle() % $session->getRepetitions() === 0)
                ? PomodoroSession::PHASE_LONG_BREAK
                : PomodoroSession::PHASE_SHORT_BREAK,
            PomodoroSession::PHASE_SHORT_BREAK,
            PomodoroSession::PHASE_LONG_BREAK => PomodoroSession::PHASE_FOCUS,
            default => throw new \LogicException('Unknown phase')
        };

        $session->setPhase($nextPhase);
        $session->setPhaseStartedAt(new \DateTimeImmutable());

        if ($session->getPhase() === PomodoroSession::PHASE_FOCUS) {
            $session->setCurrentCycle($session->getCurrentCycle() + 1);
        }
        $this->em->flush();
        return $session;
    }

    public function tick(PomodoroSession $session): void
    {
        $session->setElapsedSeconds($session->getElapsedSeconds() + 1);

        $shouldChangePhase = match ($session->getPhase()) {
            PomodoroSession::PHASE_FOCUS => $session->getElapsedSeconds() >= $session->getFocusDuration(),
            PomodoroSession::PHASE_SHORT_BREAK => $session->getElapsedSeconds() >= $session->getShortBreakDuration(),
            PomodoroSession::PHASE_LONG_BREAK => $session->getElapsedSeconds() >= $session->getLongBreakDuration(),
            default => false
        };

        if ($shouldChangePhase) {
            $this->nextPhase($session);
        }

        $this->em->flush();
    }
    // BACK ACTIONS
}
