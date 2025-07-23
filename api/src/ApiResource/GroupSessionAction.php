<?php

namespace App\ApiResource;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

enum GroupSessionAction: string
{
    case CREATE = 'create';
    case INVITE = 'invite';
    case ACCEPT = 'accept';
    case DECLINE = 'decline';
    case LEAVE = 'leave';

    public static function fromString(string $action): self

    {
        foreach (self::cases() as $case) {
            if ($case->value === $action) {
                return $case;
            }
        }
        throw new NotFoundHttpException("Unknown  GroupSessionAction: '$action'");
    }
}
