import { User, WS } from "../types/events";
import crypto from 'node:crypto';

const users: User[] = [];

export const addUser = (socket:WS, data:User): User => {
    const user = { ...data, index: socket.id };
    users.push(user);
    return user;
}

export const getUserById = (id: string): Partial<User> => {
    const user = users.find(user => user.index === id);
    return user && { name: user.name, index: user.index }
}