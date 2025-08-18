"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const whatsapp_1 = require("./plugins/whatsapp");
const datebase_1 = __importDefault(require("./config/datebase"));
const socket_1 = require("./sockets/socket");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, datebase_1.default)();
(0, whatsapp_1.registerWhatsAppPlugin)(app);
// Create HTTP server from Express
const server = (0, http_1.createServer)(app);
// Initialize Socket.IO
const io = (0, socket_1.initSocket)(server);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
