export interface Message {
    type: string;
    data: string;
    id: number;
}

export interface User {
    name: string;
    password: string;
    index: string;
}

export interface UserResponse {
    error: boolean;
    name: string;
    errorText?: string;
}

export interface Room {
    roomId: number;
    roomUsers: Partial<User>[];
}

export interface WS extends WebSocket {
    id: string;
}