import { Room } from "../types/events";
import { getUserById } from "./users";

const rooms: Room[] = [];

export const addRoom = (id: string):Room => {
    const roomId = rooms.length;
    const user = getUserById(id);
    const room = { roomId, roomUsers: [user] };
    rooms.push(room);
    return room;
};

export const updateRoom = (userID: string, roomId: number): Room | null => {
    const updatedRoom = rooms[roomId];
    const user = getUserById(userID);
    if(updatedRoom.roomUsers[0].index === userID) {
        return null;
    }
    updatedRoom.roomUsers.push(user);
    rooms.splice(roomId, 1);
    return updatedRoom;
};
