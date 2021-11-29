/**
 * File Location: src/routes/auth/auth-utils.ts
 * Description: Utilities for authentications
 */
import type { SignOptions } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';

export async function generateJWT(payload, uid?: string) {
    const signOptions: SignOptions = {
        algorithm: 'RS256',
        subject: uid,
        issuer: 'TouchOfClassEvents'
    };

    payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    // ! TODO: GENERATE A MORE SECURE SECRET PASSPHRASE
    const token = jwt.sign(
        payload,
        {
            key: process.env['VITE_SECRET_PRIVATE_RSA_KEY'],
            passphrase: process.env['VITE_SECRET_RSA_SECRET_PASSPHRASE']
        },
        signOptions
    );

    // TODO Send this to client
}
