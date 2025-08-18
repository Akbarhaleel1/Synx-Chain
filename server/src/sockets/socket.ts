import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { IWebChatMessage } from '../plugins/webchat/webchat.model';

let io: SocketIOServer;

// Initialize Socket.IO
export const initSockets = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: { origin: '*' }, // Change to your frontend domain in production
  });

  // ===== WhatsApp namespace =====
  const whatsapp = io.of('/whatsapp');
  whatsapp.on('connection', (socket: Socket) => {
    console.log('WhatsApp client connected:', socket.id);

    socket.on('join-room', (room: string) => {
      socket.join(room);
    });

    socket.on('disconnect', () => {
      console.log('WhatsApp client disconnected:', socket.id);
    });
  });

  // ===== WebChat namespace =====
  const webchat = io.of('/webchat');
  webchat.on('connection', (socket: Socket) => {
    console.log('WebChat client connected:', socket.id);

    socket.on('join-room', (room: string) => {
      socket.join(room);
    });

    socket.on('disconnect', () => {
      console.log('WebChat client disconnected:', socket.id);
    });
  });

  return io;
};

// Emit WhatsApp message
export const emitNewWhatsAppMessage = (message: any) => {
  if (!io) return console.error('Socket.io not initialized!');
  io.of('/whatsapp').emit('new-whatsapp-message', message);
};

// Emit WebChat message
export const emitNewWebChatMessage = (message: IWebChatMessage | any) => {
  if (!io) return console.error('Socket.io not initialized!');
  io.of('/webchat').emit('new-webchat-message', message);
};
