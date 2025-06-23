<?php

namespace App\Repository;

use App\Entity\GroupSessionMember;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GroupSessionMember>
 *
 * @method GroupSessionMember|null find($id, $lockMode = null, $lockVersion = null)
 * @method GroupSessionMember|null findOneBy(array $criteria, array $orderBy = null)
 * @method GroupSessionMember[]    findAll()
 * @method GroupSessionMember[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GroupSessionMemberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupSessionMember::class);
    }

    public function save(GroupSessionMember $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(GroupSessionMember $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findActiveMembersByGroupSession(int $groupSessionId): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.groupSession = :groupSessionId')
            ->andWhere('m.status = :status')
            ->setParameter('groupSessionId', $groupSessionId)
            ->setParameter('status', GroupSessionMember::STATUS_ACCEPTED)
            ->getQuery()
            ->getResult();
    }
} 