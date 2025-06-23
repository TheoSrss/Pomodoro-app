<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GroupSessionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Link;
use App\Service\ActiveGroupSessionProvider;
use App\Service\GroupSessionProcessor;

#[ORM\Entity(repositoryClass: GroupSessionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['group:read']],
    denormalizationContext: ['groups' => ['group:write']],
    security: 'is_granted("ROLE_USER")',
    operations: [
        new Get(),
        new Get(
            name: 'group_active',
            uriTemplate: '/group/active',
            provider: ActiveGroupSessionProvider::class,
            output: GroupSession::class,
        ),
        new Post(
            name: 'group_create',
            uriTemplate: '/group/create',
            processor: GroupSessionProcessor::class,
            output: GroupSession::class
        ),
        new Post(
            name: 'group_action',
            uriTemplate: '/group/{id}/{action}',
            uriVariables: ['id' => new Link(fromClass: GroupSession::class), 'action' => new Link(fromClass: null, identifiers: ['action'])],
            processor: GroupSessionProcessor::class,
            read: false,
            input: false,
            output: GroupSession::class
        ),
    ]
)]
class GroupSession
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['group:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'groupSessions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['group:read'])]
    private ?User $creator;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['group:read', 'group:write'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['group:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['group:read'])]
    private ?\DateTimeImmutable $startedAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['group:read'])]
    private ?\DateTimeImmutable $endedAt = null;

    #[ORM\OneToMany(mappedBy: 'groupSession', targetEntity: GroupSessionMember::class, orphanRemoval: true)]
    private Collection $members;

    #[ORM\OneToOne(mappedBy: 'groupSession', targetEntity: PomodoroSession::class, cascade: ['persist', 'remove'])]
    private ?PomodoroSession $pomodoroSession = null;

    public function __construct()
    {
        $this->members = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): static
    {
        $this->creator = $creator;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->startedAt;
    }

    public function setStartedAt(?\DateTimeImmutable $startedAt): static
    {
        $this->startedAt = $startedAt;
        return $this;
    }

    public function getEndedAt(): ?\DateTimeImmutable
    {
        return $this->endedAt;
    }

    public function setEndedAt(?\DateTimeImmutable $endedAt): static
    {
        $this->endedAt = $endedAt;
        return $this;
    }

    /**
     * @return Collection<int, GroupSessionMember>
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(GroupSessionMember $member): static
    {
        if (!$this->members->contains($member)) {
            $this->members->add($member);
            $member->setGroupSession($this);
        }
        return $this;
    }

    public function removeMember(GroupSessionMember $member): static
    {
        if ($this->members->removeElement($member)) {
            if ($member->getGroupSession() === $this) {
                $member->setGroupSession(null);
            }
        }
        return $this;
    }

    public function getPomodoroSession(): ?PomodoroSession
    {
        return $this->pomodoroSession;
    }

    public function setPomodoroSession(?PomodoroSession $pomodoroSession): static
    {
        $this->pomodoroSession = $pomodoroSession;
        return $this;
    }
} 