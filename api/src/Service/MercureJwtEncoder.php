<?php

// src/Service/MercureJwtEncoder.php

namespace App\Service;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Firebase\JWT\JWT;

class MercureJwtEncoder implements JWTEncoderInterface
{
    public function __construct(
        private string $secret,
    ) {}

    public function encode(array $data): string
    {
        return JWT::encode($data, $this->secret, 'HS256');
    }

    public function decode($token): array
    {
        return (array) JWT::decode($token, $this->secret, ['HS256']);
    }
}
