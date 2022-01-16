export type Base64 = string;
export type UUID = string;

export interface GoogleConnection {
    connection: 'google';
    id: string;
    name: string;
    email: string;
    picture: string;
    refresh_token: Base64;
}

export interface DatabaseUser {
    uid: UUID;
    email: string;
    nickname: string;
    password: string;
    connections?: Array<GoogleConnection>;
    noPass?: boolean;
    admin?: boolean;
}

export interface SpawnedObjectData {
    discriminator: 'spawned-object-data';
    label: string;
    isSeat: boolean;
    isTable: boolean;
    width: number;
    height: number;
    coords: { x: number; y: number };
    holdAmount: number;
    canHoldType: string;
    texture: string;
}

export interface EventData {
    event_id: UUID;
    title: string;
    date: Date;
    host: string;
    details: string;
    createdBy: UUID;
    seating_chart_data: [];
}
