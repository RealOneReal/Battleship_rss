import { User, WS, Winner } from "../types/events";

const users: User[] = [];
const winners: Winner[] = [];

export const addUser = (socket:WS, data:User): User | null => {
    if(!data.name || !data.password) {
        return null;
    };
    const user = { ...data, index: socket.id };
    users.push(user);
    winners.push({ name: user.name, wins: 0});
    return user;
};

export const getUserById = (id: string): Partial<User> => {
    const user = users.find(user => user.index === id);
    return user && { name: user.name, index: user.index }
};

export const addWin = (name: string) => {
    const winner = winners.find(i => i.name === name);
    winner.wins++;
};
export const getWinners = () => {
    return winners.filter(w => w.wins > 0);
}