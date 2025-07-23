<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\GroupSessionMemberRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\State\GroupSessionMemberProcessor;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: GroupSessionMemberRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['member:read']],
    denormalizationContext: ['groups' => ['member:write']],
    security: 'is_granted("ROLE_USER")',
    operations: []
)]
class GroupSessionMember
{
    public const STATUS_INVITED = 'invited';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_DECLINED = 'declined';
    public const STATUS_LEFT = 'left';

    public const STATUSES = [
        self::STATUS_INVITED,
        self::STATUS_ACCEPTED,
        self::STATUS_DECLINED,
        self::STATUS_LEFT,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['member:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'members')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['member:read'])]
    private ?GroupSession $groupSession = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['member:read'])]
    private ?User $user = null;

    #[ORM\Column(length: 20)]
    #[Assert\Choice(choices: GroupSessionMember::STATUSES)]
    #[Groups(['member:read'])]
    private string $status = self::STATUS_INVITED;

    #[ORM\Column(length: 180)]
    #[Assert\Email]
    #[Groups(['member:read'])]
    private string $email;

    #[ORM\Column]
    #[Groups(['member:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['member:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGroupSession(): ?GroupSession
    {
        return $this->groupSession;
    }

    public function setGroupSession(?GroupSession $groupSession): static
    {
        $this->groupSession = $groupSession;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;
        $this->updatedAt = new \DateTimeImmutable();
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }
}
