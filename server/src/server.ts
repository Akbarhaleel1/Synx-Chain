import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import connectDatabase from './config/datebase';
import { registerWhatsAppPlugin } from './plugins/whatsapp';
import { initSockets } from './sockets/socket';
import { registerWebChatPlugin } from './plugins/webchat';
import dotenv from 'dotenv';

dotenv.config()

const app = express();


// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database & plugins
connectDatabase();
registerWebChatPlugin(app);
registerWhatsAppPlugin(app);

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO (namespaces inside)
initSockets(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
