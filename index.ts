import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
import crypto from 'node:crypto';
import { Message } from './src/types/events';
import { eventListeners } from './src/events/eventListeners';

const HTTP_PORT = 8181;
const WSS_PORT = 3000;

export const wss = new WebSocketServer({ port: WSS_PORT });

wss.on("connection", (socket ) => {
    console.log("Client connected to WebSocket");
    const index = crypto.randomUUID();
    (socket as any).id  = index;
    socket.on("message", (rawData) => {
        const msg = JSON.parse(rawData.toString()) as Message;
        const { type, data } = msg;
        if(eventListeners[type]) {
            eventListeners[type](socket, data && JSON.parse(data));
        }
    });
  
    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
