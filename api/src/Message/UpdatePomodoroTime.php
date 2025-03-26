<?php

namespace App\Message;

final class UpdatePomodoroTime
{
    public function __construct(
        private readonly int $sessionId
    ) {}

    public function getSessionId(): int
    {
        return $this->sessionId;
    }
}
