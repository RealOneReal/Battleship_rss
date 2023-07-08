import { Room, UserResponse, WS } from "../types/events";
import { wss } from '../../index';
export const emitRegistration = (socket:WebSocket, data: UserResponse) => {
    const msg = {
        type: 'reg',
        id: 0,
        data: JSON.stringify(data)
    }
    socket.send(JSON.stringify(msg));
}
export const emitUpdateWinners = () => {
    
}
export const emitCreateGame = () => {
    
}
export const emitUpdateRoom = (socket: WS | null, room: Room) => {
    const msg = {
        type: 'update_room',
        id:0,
        data: JSON.stringify([room])
    };
    if(socket) {
        socket.send(JSON.stringify(msg));
        return;
    }
    wss.clients.forEach((socket) => {
        console.log((socket as any).id)
        socket.send(JSON.stringify(msg))
    });
}
export const emitStartGame = () => {
    
}
export const emitAttack = () => {
    
}
export const emitTurn = () => {
    
}
export const emitFinish = () => {
    
}
