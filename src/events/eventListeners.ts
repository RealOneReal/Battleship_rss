import { addUserShips, getGame, isGameReady, useAttack } from "../models/games";
import { addRoom, updateRoom } from "../models/rooms";
import { addUser, getUserById } from "../models/users";
import { Attack, Room, User, WS } from "../types/events";
import { emitAttack, emitCreateGame, emitFinish, emitRegistration, emitStartGame, emitTurn, emitUpdateRoom, emitUpdateWinners} from "./eventEmitters";

const handleRegistration = (socket: WS, data:User) => {
    const user = addUser(socket, data);
    if (!user) {
        emitRegistration(socket, { errorText: 'For login add userName and password', error: true });
        return;
    }
    const processedData = { name: user.name, index: user.index, error: false }
    emitRegistration(socket, processedData);
}

const handleCreateRoom = (socket: WS, data: Room) => {
   const room = addRoom(socket.id);
   emitUpdateRoom(null, room);

}
const handleAddUserToRoom = (socket: WS, data: { indexRoom: number }) => {
    const updatedRoom = updateRoom(socket.id, data.indexRoom);
    if(!updatedRoom) return;
    emitCreateGame(updatedRoom);
}
const handleAddShips = (socket: WS, data: any) => {
    addUserShips(data.gameId, socket.id, data);
    if(isGameReady(data.gameId)) {
        emitStartGame(data.gameId);
        emitTurn(data.gameId);
    }
}
const handleAttack = (socket: WS, data: Attack) => {
    const game = getGame(data.gameId);
    if(socket.id !== game.turn) return;
    const result = useAttack(data);
    emitAttack(result, data);
    if(result === 'miss') {
        emitTurn(data.gameId, true);
        return;
    }
    if( result === 'finishGame') {
        emitFinish(data.gameId, data.indexPlayer);
        const user = getUserById(data.indexPlayer);
        emitUpdateWinners(data.gameId, user.name);
        return;
    }
    emitTurn(data.gameId);
}

const handleRandomAttack = (socket: WS, data: Attack) => {
    const game = getGame(data.gameId);
    if(socket.id !== game.turn) return;
    const result = useAttack(data);
    emitAttack(result, data);
    if(result === 'miss') {
        emitTurn(data.gameId, true);
        return;
    }
    if( result === 'finishGame') {
        emitFinish(data.gameId, data.indexPlayer);
        const user = getUserById(data.indexPlayer);
        emitUpdateWinners(data.gameId, user.name);
        return;
    }
    emitTurn(data.gameId);
}

export const eventListeners = {
    reg: handleRegistration,
    create_room: handleCreateRoom,
    add_user_to_room: handleAddUserToRoom,
    add_ships: handleAddShips,
    attack: handleAttack,
    randomAttack: handleRandomAttack,
};