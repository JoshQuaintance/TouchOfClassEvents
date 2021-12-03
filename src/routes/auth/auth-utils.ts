/**
 * File Location: src/routes/auth/auth-utils.ts
 * Description: Utilities for authentications
 */
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const PUBLIC_RSA_KEY =
    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFxMWNaUHUyWU93TnhGVnhoalN5egpwdjRlc0grODA1TFFYait3blNWdVdEOVRiVStDVlEva3NDblFFWUpzQ2xHRk1JNzMwYkwrellGei9DdU4vd1NZCnQ5bS9LUjVnQW1uOENJaEFINFFqdU1IaDl3Y1EvMzZDanYvdTFtYkdRdFRlS0lWZ0k0dVdkSmR3QUUvUDNKNVYKbHdnaWo3bHBWQzQzei9BWmJlcVhrLzZKVXpPbVJoYW5Qd0NVcEJsUW5hZ3hkSlExakZabHpsQUxJQWl1V1ZITwp0ZUtzdU9BQnpIZlUzbHVuS2NPNHdzZWpzeWlUMzE5bi8vakdwbEJZRDlJWEFNME5HenpKRWNiTE1XdXowTnpVCkxLdUcxTmdrRmtJb1d2Z1BTL3FXRnNDYjV0UVlFMzRDeS9zdzNteTE5SEJEcittUkhtQ09wNzJrckJFWTE3RU4KWndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg';

export async function generateJWT(payload, jwtSignOptions?: SignOptions) {
    try {
        const signOptions: SignOptions = jwtSignOptions || {
            algorithm: 'RS256'
        };

        // payload = Buffer.from(JSON.stringify(payload)).toString('base64');

        const token = jwt.sign(
            payload,
            {
                key: Buffer.from(import.meta.env['VITE_SECRET_PRIVATE_RSA_KEY'] as string, 'base64'),
                passphrase: import.meta.env['VITE_SECRET_RSA_SECRET_PASSPHRASE'] as string
            },
            signOptions
        );

        return token;
    } catch (err) {
        console.error(err);
    }
}

export async function verifyJWT(token, jwtVerifyOptions?: VerifyOptions) {
    const verifyOptions: VerifyOptions = jwtVerifyOptions || {
        algorithms: ['RS256']
    };

    try {
        return jwt.verify(token, Buffer.from(PUBLIC_RSA_KEY, 'base64'), verifyOptions);
    } catch (err) {
        console.error(err);
    }
}

export async function encryptData(data) {
    const encryptedBuffer = crypto.publicEncrypt(
        {
            key: PUBLIC_RSA_KEY,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            // @ts-ignore
            oeapHash: 'sha256'
        },
        Buffer.from(data)
    );

    return Buffer.from(encryptedBuffer).toString('base64');
}
