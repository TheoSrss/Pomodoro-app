<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PomodoroSessionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\State\ActiveSessionProvider;
use App\State\PomodoroSessionProcessor;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PomodoroSessionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['pomodoro:read']],
    denormalizationContext: ['groups' => ['pomodoro:write']],
    security: 'is_granted("ROLE_USER")',
    operations: [
        new Get(
            uriTemplate: '/session/{id}',
            requirements: ['id' => '\d+'],
        ),
        new Get(
            name: 'session_active',
            uriTemplate: '/session/active',
            provider: ActiveSessionProvider::class,
            output: PomodoroSession::class,
        ),
        new Post(
            name: 'session_action',
            uriTemplate: '/session/{action}',
            uriVariables: ['action' => new Link(fromClass: null, identifiers: ['action'])],
            processor: PomodoroSessionProcessor::class,
            read: false,
            output: PomodoroSession::class
        ),

    ]
)]
class PomodoroSession
{
    public const PHASE_FOCUS = 'focus';
    public const PHASE_SHORT_BREAK = 'short_break';
    public const PHASE_LONG_BREAK = 'long_break';

    public const PHASES = [
        self::PHASE_FOCUS,
        self::PHASE_SHORT_BREAK,
        self::PHASE_LONG_BREAK,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sessions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['pomodoro:read'])]
    private ?User $creator;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 300, max: 3600)]
    #[Assert\NotNull]
    #[Groups(['pomodoro:read', 'pomodoro:write'])]
    private int $focusDuration = 1500;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 120, max: 1800)]
    #[Assert\NotNull]
    #[Groups(['pomodoro:read', 'pomodoro:write'])]
    private int $shortBreakDuration = 300;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 600, max: 3600)]
    #[Assert\NotNull]
    #[Groups(['pomodoro:read', 'pomodoro:write'])]
    private int $longBreakDuration = 900;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 1, max: 5)]
    #[Assert\NotNull]
    #[Groups(['pomodoro:read', 'pomodoro:write'])]
    private int $repetitions = 4;

    #[ORM\Column(type: 'integer')]
    #[Groups(['pomodoro:read'])]
    private int $currentCycle = 1;

    #[Assert\Choice(choices: PomodoroSession::PHASES)]
    #[ORM\Column(type: 'string', length: 20)]
    #[Groups(['pomodoro:read'])]
    private string $phase = self::PHASE_FOCUS;

    #[ORM\Column(nullable: true)]
    #[Groups(['pomodoro:read'])]
    private ?\DateTimeImmutable $phaseStartedAt = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(['pomodoro:read'])]
    private int $elapsedSeconds = 0;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['pomodoro:read'])]
    private bool $isPaused = false;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['pomodoro:read'])]
    private bool $isAborted = false;

    #[ORM\Column(nullable: true)]
    #[Groups(['pomodoro:read'])]
    private ?\DateTimeImmutable $startedAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['pomodoro:read'])]
    private ?\DateTimeImmutable $endedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreator(): User
    {
        return $this->creator;
    }

    public function setCreator(User $creator): static
    {
        $this->creator = $creator;

        return $this;
    }

    public function getPhase(): string
    {
        return $this->phase;
    }

    public function setPhase(string $phase): static
    {
        $this->phase = $phase;

        return $this;
    }


    public function getIsPaused(): bool
    {
        return $this->isPaused;
    }

    public function setIsPaused(bool $isPaused): static
    {
        $this->isPaused = $isPaused;

        return $this;
    }

    public function getIsAborted(): bool
    {
        return $this->isAborted;
    }

    public function setIsAborted(bool $isAborted): static
    {
        $this->isAborted = $isAborted;

        return $this;
    }

    public function getStartedAt(): \DateTimeImmutable|null
    {
        return $this->startedAt;
    }

    public function setStartedAt(\DateTimeImmutable $startedAt): static
    {
        $this->startedAt = $startedAt;

        return $this;
    }

    public function getEndedAt(): \DateTimeImmutable|null
    {
        return $this->endedAt;
    }

    public function setEndedAt(?\DateTimeImmutable $endedAt): static
    {
        $this->endedAt = $endedAt;

        return $this;
    }

    public function getPhaseStartedAt(): \DateTimeImmutable|null
    {
        return $this->phaseStartedAt;
    }

    public function setPhaseStartedAt(\DateTimeImmutable $phaseStartedAt): static
    {
        $this->phaseStartedAt = $phaseStartedAt;

        return $this;
    }

    public function getElapsedSeconds(): int
    {
        return $this->elapsedSeconds;
    }

    public function setElapsedSeconds(int $elapsedSeconds): static
    {
        $this->elapsedSeconds = $elapsedSeconds;

        return $this;
    }

    public function getFocusDuration(): int
    {
        return $this->focusDuration;
    }

    public function setFocusDuration(int $focusDuration): static
    {
        $this->focusDuration = $focusDuration;

        return $this;
    }

    public function getShortBreakDuration(): int
    {
        return $this->shortBreakDuration;
    }

    public function setShortBreakDuration(int $shortBreakDuration): static
    {
        $this->shortBreakDuration = $shortBreakDuration;

        return $this;
    }

    public function getLongBreakDuration(): int
    {
        return $this->longBreakDuration;
    }

    public function setLongBreakDuration(int $longBreakDuration): static
    {
        $this->longBreakDuration = $longBreakDuration;

        return $this;
    }

    public function getRepetitions(): int
    {
        return $this->repetitions;
    }

    public function setRepetitions(int $repetitions): static
    {
        $this->repetitions = $repetitions;

        return $this;
    }

    public function getCurrentCycle(): int
    {
        return $this->currentCycle;
    }

    public function setCurrentCycle(int $currentCycle): static
    {
        $this->currentCycle = $currentCycle;

        return $this;
    }
}
