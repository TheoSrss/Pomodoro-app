<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\State\UserProcessor;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Attribute\SerializedName;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(
    fields: ['email'],
    groups: ['user:create']
)]
#[ApiResource(
    operations: [
        new Get(),
        new Post(
            uriTemplate: '/register',
            security: "is_granted('PUBLIC_ACCESS')",
            validationContext: ['groups' => ['Default', 'user:create']],
            normalizationContext: ['groups' => ['user:read', 'user:create']],
            processor: UserProcessor::class
        )
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{

    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';

    public static array $allRoles = [self::ROLE_USER, self::ROLE_ADMIN];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\Email()]
    #[Assert\NotBlank()]
    #[Assert\Length(max: 100)]
    #[Groups(['user:write', 'user:read'])]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column(nullable: true)]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[SerializedName('password')]
    #[Assert\Length(min: 8)]
    #[Assert\Regex("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/")]
    #[Groups(['user:write'])]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $googleId = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $githubId = null;

    /**
     * @var Collection<int, Session>
     */
    #[ORM\OneToMany(targetEntity: PomodoroSession::class, mappedBy: 'creator', orphanRemoval: true)]
    private Collection $sessions;

    /**
     * @var Collection<int, GroupSession>
     */
    #[ORM\OneToMany(targetEntity: GroupSession::class, mappedBy: 'creator', orphanRemoval: true)]
    private Collection $groupSessions;

    public function __construct()
    {
        $this->sessions = new ArrayCollection();
        $this->groupSessions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $accepted = array_filter($roles, function ($role) {
            return in_array($role, self::$allRoles);
        });

        $this->roles = array_unique($accepted);

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getGoogleId(): ?string
    {
        return $this->googleId;
    }

    public function setGoogleId(?string $googleId): static
    {
        $this->googleId = $googleId;

        return $this;
    }

    public function getGithubId(): ?string
    {
        return $this->githubId;
    }

    public function setGithubId(?string $githubId): static
    {
        $this->githubId = $githubId;

        return $this;
    }

    /**
     * @return Collection<int, Session>
     */
    public function getSessions(): Collection
    {
        return $this->sessions;
    }

    public function addSession(PomodoroSession $session): static
    {
        if (!$this->sessions->contains($session)) {
            $this->sessions->add($session);
            $session->setCreator($this);
        }

        return $this;
    }

    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $password): static
    {
        $this->plainPassword = $password;

        return $this;
    }

    /**
     * @return Collection<int, GroupSession>
     */
    public function getGroupSessions(): Collection
    {
        return $this->groupSessions;
    }

    public function addGroupSession(GroupSession $groupSession): static
    {
        if (!$this->groupSessions->contains($groupSession)) {
            $this->groupSessions->add($groupSession);
            $groupSession->setCreator($this);
        }
        return $this;
    }

    public function removeGroupSession(GroupSession $groupSession): static
    {
        if ($this->groupSessions->removeElement($groupSession)) {
            if ($groupSession->getCreator() === $this) {
                $groupSession->setCreator(null);
            }
        }
        return $this;
    }
}
