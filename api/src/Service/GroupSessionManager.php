<?php

namespace App\Service;

use App\Entity\GroupSession;
use App\Entity\GroupSessionMember;
use App\Entity\User;
use App\Repository\GroupSessionMemberRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use App\Service\MailerService;

class GroupSessionManager
{

    public function __construct(
        private EntityManagerInterface $em,
        private Security $security,
        private UserRepository $userRepository,
        private GroupSessionMemberRepository $gsmRepository,
        private MailerService $mailerService,
    ) {}

    private function getUser(): User
    {
        $user = $this->security->getUser();

        if (!$user instanceof User) {
            throw new \LogicException('No authenticated user found.');
        }
        return $user;
    }

    public function newGroupSession(GroupSession $group): GroupSession
    {
        foreach ($group->getEmails() as $email) {
            $this->addMember($email, $group);
        }

        $group->setCreator($this->getUser());

        $this->em->persist($group);
        $this->em->flush();

        return $group;
    }

    public function newMembers(GroupSession $group)
    {
        foreach ($group->getEmails() as $email) {
            $member = $this->gsmRepository->findOneBy(['email' => $email]);
            if ($member) {
                $status = $member->getStatus();
                if ($status !== GroupSessionMember::STATUS_INVITED) {
                    continue;
                }
                $this->mailerService->sendInvitation($email);
                continue;
            }
            $this->addMember($email, $group);
        }
        return $group;
    }

    private function addMember(string $email, GroupSession $group)
    {
        $existing = $this->gsmRepository->findOneBy(['email' => $email, 'groupSession' => $group]);
        if ($existing) {
            return;
        }
        $user = $this->userRepository->findOneBy(['email' => $email]);

        $member = new GroupSessionMember();
        $member->setGroupSession($group);
        $member->setUser($user);
        $member->setEmail($email);
        $this->em->persist($member);
        $this->mailerService->sendInvitation($email);
    }
}
