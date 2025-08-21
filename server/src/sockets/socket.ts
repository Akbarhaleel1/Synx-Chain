import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { translateWithOpenRouter } from '../bots';
import Chat from '../plugins/webchat/webchat.model';

let io: SocketIOServer;

export const initSockets = (server: HttpServer): SocketIOServer => {
    io = new SocketIOServer(server, {
        cors: { origin: '*' },
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

        socket.on('user_message', async (msg) => {
            try {
                console.log('📨 msg is working:', msg);

                // 1. Fetch user chat history
                const history = await Chat.find({ from: msg.from }).sort({ createdAt: 1 }).lean();

                // 2. Prepare messages array for AI
                const messagesForAI = [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    ...history.map(h => ({
                        role: h.from === msg.from ? 'user' : 'assistant',
                        content: (h as any).translation || h.body
                    })),
                    { role: 'user', content: msg.body }
                ];

                // 3. Send messages array to AI
                const translation = await translateWithOpenRouter(messagesForAI);
console.log('translation',translation)
                // 4. Save chat
                await Chat.create({
                    from: msg.from,
                    body: msg.body,
                    translation,
                    channel: msg.channel,
                    siteDomain: msg.siteDomain,
                    role: 'bot'
                });

                // 5. Emit AI response
                socket.emit('bot_message', {
                    text: translation,
                    suggestions: ['Try again', 'Talk to agent'],
                });

            } catch (error) {
                console.error('Translation error:', error);
                socket.emit('bot_message', {
                    text: 'Sorry, something went wrong. Please try again later.',
                    suggestions: ['Try again', 'Talk to agent'],
                });
            }
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
export const emitNewWebChatMessage = (message: any) => {
    if (!io) return console.error('Socket.io not initialized!');
    io.of('/webchat').emit('new-webchat-message', message);
};
