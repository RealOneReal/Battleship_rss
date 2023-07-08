import { Attack, AttackResult, Room, UserResponse, WS } from "../types/events";
import { wss } from '../../index';
import { getGame, getUserShips } from "../models/games";
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
export const emitCreateGame = (data:Room) => {
    const userIds = data.roomUsers.map(user => user.index);
    userIds.forEach(id => {
        wss.clients.forEach((socket) => {
            if ((socket as any).id === id) {
                const msg = {
                    type: 'create_game',
                    id: 0,
                    data: JSON.stringify({ idGame: data.roomId, idPlayer: id})
                }
                socket.send(JSON.stringify(msg));
            }
        })
    })
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
        socket.send(JSON.stringify(msg))
    });
}
export const emitStartGame = (gameId: number) => {
    const game = getGame(gameId);
    game.playerShips.forEach((userGame) => {
        wss.clients.forEach((socket) => {
            if((socket as any).id === userGame.id) {
                const msg = {
                    type: 'start_game',
                    id: 0,
                    data: JSON.stringify({ ships: userGame.ships, currentPlayerIndex: userGame.id })
                };
                socket.send(JSON.stringify(msg));
            }
        })
    })
};

export const emitAttack = (result: AttackResult, data: Attack) => {
    const game = getGame(data.gameId);
    game.playerShips.forEach((userGame) => {
        wss.clients.forEach((socket) => {
            if((socket as any).id === userGame.id) {
                const msg = {
                    type: 'attack',
                    id: 0,
                    data: JSON.stringify({ position: { x: data.x, y: data.y}, currentPlayer: data.indexPlayer, status: result })
                }
                socket.send(JSON.stringify(msg));
            }
        })
    })
};

export const emitTurn = (gameId) => {
    const game = getGame(gameId);
    let turn = game.turn;
    if(!turn) {
        game.turn = game.playerShips[0].id;
        turn = game.playerShips[0].id
    };
    const msg = {
        type: 'turn',
        id: 0,
        data: JSON.stringify({ currentPlayer: turn })
    };
    game.playerShips.forEach((userGame) => {
        wss.clients.forEach((socket) => {
            if((socket as any).id === userGame.id) {
                socket.send(JSON.stringify(msg))
            }
        })
    });
};

export const emitFinish = () => {
    
}

