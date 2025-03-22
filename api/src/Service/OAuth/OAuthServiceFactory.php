<?php

namespace App\Service\OAuth;

use Symfony\Component\DependencyInjection\ServiceLocator;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OAuthServiceFactory
{
    public const SERVICE_LIST = [
        'google' => 'App\Service\OAuth\GoogleOAuthService',
        'github' => 'App\Service\OAuth\GithubOAuthService',
    ];
    public function __construct(private ServiceLocator $locator) {}

    public function getOAuthService(string $service): AbstractOAuthService
    {
        $serviceClass = self::SERVICE_LIST[$service] ?? null;

        if (!$serviceClass || !$this->locator->has($serviceClass)) {
            throw new NotFoundHttpException("OAuth '$service' service not available.");
        }

        return $this->locator->get($serviceClass);
    }
}
