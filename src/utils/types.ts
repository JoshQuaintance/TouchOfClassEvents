export type Base64 = string;
export type UUID = string;

export interface FacebookConnection {}

export interface GoogleConnection {
    connection: 'google';
    id: string;
    name: string;
    email: string;
    picture: string;
    refresh_token: Base64;
}

export interface User {
    uid: UUID;
    email: string;
    nickname: string;
    password: string;
    connections?: Array<GoogleConnection | FacebookConnection>;
}
