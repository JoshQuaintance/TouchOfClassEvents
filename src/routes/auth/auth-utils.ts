
/**
 * File Location: src/routes/auth/auth-utils.ts
 * Description: Utilities for authentications
 */
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
        return jwt.verify(
            token,
            Buffer.from(import.meta.env['VITE_SECRET_PUBLIC_RSA_KEY'] as string, 'base64'),
            verifyOptions
        );
    } catch (err) {
        console.error(err);
    }
}

export async function encryptData(data) {
    const encryptedBuffer = crypto.publicEncrypt(
        {
            key: Buffer.from(import.meta.env['VITE_SECRET_PUBLIC_RSA_KEY'] as string, 'base64').toString(),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            // @ts-ignore
            oeapHash: 'sha256'
        },
        Buffer.from(data)
    );

    return Buffer.from(encryptedBuffer).toString('base64');
}
