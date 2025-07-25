<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use App\Repository\GroupSessionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Link;
use App\State\ActiveGroupSessionProvider;
use App\State\GroupSessionMemberProcessor;
use App\State\PomodoroSessionProcessor;

#[ORM\Entity(repositoryClass: GroupSessionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['group:read']],
    denormalizationContext: ['groups' => ['group:write']],
    security: 'is_granted("ROLE_USER")',
    operations: [
        new Get(),
        new Get(
            name: 'group_session_active',
            uriTemplate: '/group/active',
            provider: ActiveGroupSessionProvider::class,
            output: GroupSession::class,
        ),
        new Post(
            name: 'group_session_create',
            uriTemplate: '/group/create',
            processor: GroupSessionMemberProcessor::class,
            output: PomodoroSession::class,
            validationContext: ['groups' => ['Default', 'group:create']],
        ),
        new Post(
            name: 'group_session_invite',
            uriTemplate: '/group/{group_id}/invite',
            uriVariables: [
                'group_id' => new Link(fromClass: GroupSession::class)
            ],
            processor: GroupSessionMemberProcessor::class,
            validationContext: ['groups' => ['Default', 'group:emails']],
        ),
        new Post(
            name: 'group_session_action',
            uriTemplate: '/group/{group_id}/{action}',
            uriVariables: [
                'group_id' => new Link(fromClass: GroupSession::class),
                'action' => new Link(fromClass: null, identifiers: ['action'])
            ],
            processor: PomodoroSessionProcessor::class,
            read: false,
            input: false,
            output: PomodoroSession::class
        ),
        new Delete(
            name: 'group_session_remove_member',
            uriTemplate: '/group/{group_id}/remove-member/{member_id}',
            uriVariables: [
                'group_id' => new Link(fromClass: GroupSession::class),
                'member_id' => new Link(fromClass: null, identifiers: ['member_id'])
            ],
            processor: GroupSessionMemberProcessor::class,
            read: false

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
    #[Assert\NotBlank(groups: ['group:create'])]
    #[Groups(['group:read', 'group:write'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['group:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['group:read'])]
    private ?\DateTimeImmutable $endedAt = null;

    #[ORM\OneToMany(mappedBy: 'groupSession', targetEntity: GroupSessionMember::class, orphanRemoval: true)]
    private Collection $members;

    #[ORM\OneToMany(mappedBy: 'groupSession', targetEntity: PomodoroSession::class, cascade: ['persist', 'remove'])]
    private Collection $pomodoroSessions;

    #[Assert\NotBlank(message: 'At least one email must be provided.')]
    #[Assert\Count(min: 1, minMessage: 'At least one email must be provided', max: 10, maxMessage: 'Maximum 10 emails allowed')]
    #[Assert\All([
        new Assert\Email(message: 'Email "{{ value }}" is not valid.')
    ])]
    #[Groups(['group:read', 'group:write', 'group:emails'])]
    private array $emails = [];

    public function __construct()
    {
        $this->members = new ArrayCollection();
        $this->pomodoroSessions = new ArrayCollection();
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

    /**
     * @return Collection<int, PomodoroSession>
     */
    public function getPomodoroSessions(): Collection
    {
        return $this->pomodoroSessions;
    }

    public function addPomodoroSession(PomodoroSession $session): static
    {
        if (!$this->pomodoroSessions->contains($session)) {
            $this->pomodoroSessions->add($session);
            $session->setGroupSession($this);
        }
        return $this;
    }

    public function removePomodoroSession(PomodoroSession $session): static
    {
        if ($this->pomodoroSessions->removeElement($session)) {
            if ($session->getGroupSession() === $this) {
                $session->setGroupSession(null);
            }
        }
        return $this;
    }

    public function getEmails(): array
    {
        return $this->emails;
    }

    public function setEmails(array $emails): static
    {
        $this->emails = $emails;
        return $this;
    }
}
