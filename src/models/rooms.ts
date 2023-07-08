import { Room } from "../types/events";
import { getUserById } from "./users";

const rooms:Room[] = [];

export const addRoom = (id: string):Room => {
    const roomId = rooms.length;
    const user = getUserById(id);
    const room = { roomId, roomUsers: [user] };
    rooms.push(room);
    return room;
}