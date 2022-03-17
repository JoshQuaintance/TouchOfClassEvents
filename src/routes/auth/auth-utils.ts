/**
 * File Location: src/routes/auth/auth-utils.ts
 * Description: Utilities for authentications
 */
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// putting public key (it should be ok)
export const PUBLIC_RSA_KEY =
    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4OTZpNHN2V1ZHOUxxV0lEeDhKSgovU2xsM25vaTkxMVpjZEY0RWtGVlB4Vk8xQlN6NGZWYjhKeDd3NmNLRUVYd3dLOEc1dXppT3VvVnVJNFpoMmR3Cm1LcktkR3hDMnlaZ296YS9PT0VDWjF6OTdPSUpkenBpdG8wQUt3S0F6Y1hKTFl5Y05sMGxKU3dzWFRYRVZFM3EKTVV2dDd3MitqMjNBWFU3T1luc3hBVjgvMCsvaUxWWVRlZitDWXlYeXUvQlFTcjVPOXRSTFozdEkvUHFkc3htQQpEUkRXRExjNFB0NW5HR1M4Ym90enpxQWp4TkRjVUFjcEp1VlhEZTc0cDczOHUydUdXVkFxVXR4UFB3enlpTmVDCjB0WlMrcHhxcGtzTUgwY0RkWkprbFkwRzB4a1pYV0lkYmlubUdwMWhoR3NOSndwY2dzUm0wdFN6a0w2TkFoVzEKcFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==';

/**
 * Generates a JWT token
 * @param payload What to output when JWT is verified or decoded
 * @param jwtSignOptions SignOptions, leave it empty for default
 * @returns JWT Token
 */
export async function generateJWT(payload: string | object | Buffer, jwtSignOptions?: SignOptions) {
    try {
        const signOptions: SignOptions = jwtSignOptions || {
            algorithm: 'RS256'
        };

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

/**
 * Verifies the JWT and if successful will return the payload
 * @param token JWT Token in string
 * @param jwtVerifyOptions Whatever SignOptions used to make this JWT to verify
 * @returns The payload
 */
export async function verifyJWT(token: string, jwtVerifyOptions?: VerifyOptions) {
    const verifyOptions: VerifyOptions = jwtVerifyOptions || {
        algorithms: ['RS256']
    };

    try {
        return jwt.verify(token, Buffer.from(PUBLIC_RSA_KEY, 'base64'), verifyOptions);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Encrypts data
 * @param data Data to encrypt
 * @returns Encrypted data in base64 form
 */
export async function encryptData(data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer> | string) {
    const encryptedBuffer = crypto.publicEncrypt(
        {
            key: Buffer.from(PUBLIC_RSA_KEY, 'base64').toString(),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            // eslint-disable
            // @ts-ignore
            oeapHash: 'sha256'
        },
        typeof data === 'string' ? Buffer.from(data) : Buffer.from(data)
    );

    return Buffer.from(encryptedBuffer).toString('base64');
}
