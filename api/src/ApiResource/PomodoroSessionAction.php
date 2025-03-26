<?php

namespace App\ApiResource;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

enum PomodoroSessionAction: string
{
    case CREATE = 'create';
    case START = 'start';
    case PAUSE = 'pause';
    case ABORT = 'abort';

    public static function fromString(string $value): self
    {
        foreach (self::cases() as $case) {
            if ($case->value === $value) {
                return $case;
            }
        }
        throw new NotFoundHttpException("Unknown  action: '$value'");
    }
}
