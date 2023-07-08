import { addRoom } from "../models/rooms";
import { addUser } from "../models/users";
import { Room, User, WS } from "../types/events";
import { emitRegistration, emitUpdateRoom} from "./eventEmitters";

const handleRegistration = (socket: WS, data:User) => {
    const user = addUser(socket as WS, data);
    const processedData = { name: user.name, index: user.index, error: false }
    emitRegistration(socket, processedData);
    // add helpers for cheking empty room emitUpdateRoom(socket, room);
}

const handleCreateRoom = (socket: WS, data: Room) => {
   const room = addRoom(socket.id);
   emitUpdateRoom(null, room);
}
const handleAddUserToRoom = () => {
    
}
const handleAddShips = () => {
    
}
const handleAttack = () => {
    
}

const handleRandomAttack = () => {
    
}

export const eventListeners = {
    reg: handleRegistration,
    create_room: handleCreateRoom,
    add_user_to_room: handleAddUserToRoom,
    add_ships: handleAddShips,
    attack: handleAttack,
    randomAttack: handleRandomAttack,

};