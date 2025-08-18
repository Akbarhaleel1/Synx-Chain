"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitNewWhatsAppMessage = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: { origin: '*' }, // adjust for your frontend domain
    });
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('join-room', (room) => {
            socket.join(room);
        });
    });
    return io;
};
exports.initSocket = initSocket;
// Emit a new WhatsApp message to frontend
const emitNewWhatsAppMessage = (message) => {
    if (!io) {
        console.error('Socket.io not initialized!');
        return;
    }
    io.emit('new-whatsapp-message', message);
};
exports.emitNewWhatsAppMessage = emitNewWhatsAppMessage;
