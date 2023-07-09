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
    name?: string;
    errorText?: string;
}

export interface Room {
    roomId: number;
    roomUsers: Partial<User>[];
}

export interface WS extends WebSocket {
    id: string;
}

export interface Game {
    id: number;
    playerShips: Ships[];
    turn: string;
    battlefields: Battlefield[];
}

export interface Ship {
    position: { x: number, y: number },
    direction: boolean;
    length: number;
    type: "small"|"medium"|"large"|"huge",
};

export interface Ships {
    id: string;
    ships: Ship[];
};

export interface Attack {
    gameId: number;
    x: number;
    y: number;
    indexPlayer: string;
}

export interface Battlefield {
    userId: string;
    grid: Cell[][];
}

export interface Cell {
    x: number;
    y: number;
    ship: boolean;
    hit: boolean;
}

export type AttackResult = "miss" | "killed" | "shot" | "finishGame";
export interface Winner {
    name: string;
    wins: number;
}