<?php

namespace App\Repository;

use App\Entity\GroupSession;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<GroupSession>
 *
 * @method GroupSession|null find($id, $lockMode = null, $lockVersion = null)
 * @method GroupSession|null findOneBy(array $criteria, array $orderBy = null)
 * @method GroupSession[]    findAll()
 * @method GroupSession[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GroupSessionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupSession::class);
    }

    public function save(GroupSession $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(GroupSession $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
} 