<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailerService
{

    const MAIN_MAIL = 'pomodoro@theosourisseau.com';

    public function __construct(
        private MailerInterface $mailer
    ) {}

    public function sendInvitation(string $to)
    {
        $email = (new Email())
            ->from(self::MAIN_MAIL)
            ->to($to)
            ->subject('Invitation')
            ->text('Vous êtes invité à rejoindre un groupe.');

        $this->mailer->send($email);
    }
}
