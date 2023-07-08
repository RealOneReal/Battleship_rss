import { addUserShips, isGameReady, useAttack } from "../models/games";
import { addRoom, updateRoom } from "../models/rooms";
import { addUser } from "../models/users";
import { Attack, Room, User, WS } from "../types/events";
import { emitAttack, emitCreateGame, emitRegistration, emitStartGame, emitTurn, emitUpdateRoom} from "./eventEmitters";

const handleRegistration = (socket: WS, data:User) => {
    const user = addUser(socket, data);
    const processedData = { name: user.name, index: user.index, error: false }
    emitRegistration(socket, processedData);
    // add helpers for cheking empty room emitUpdateRoom(socket, room);
}

const handleCreateRoom = (socket: WS, data: Room) => {
   const room = addRoom(socket.id);
   emitUpdateRoom(null, room);

}
const handleAddUserToRoom = (socket: WS, data: { indexRoom: number }) => {
    const updatedRoom = updateRoom(socket.id, data.indexRoom);
    emitCreateGame(updatedRoom);
}
const handleAddShips = (socket: WS, data: any) => {
    const result = addUserShips(data.gameId, socket.id, data);
    if(isGameReady(data.gameId)) {
        emitStartGame(data.gameId);
        emitTurn(data.gameId);
    }
}
const handleAttack = (socket: WS, data: Attack) => {
    const result = useAttack(data);
    emitAttack(result, data);
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