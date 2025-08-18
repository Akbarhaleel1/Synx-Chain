"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWhatsAppPlugin = void 0;
const whatsapp_router_1 = __importDefault(require("./whatsapp.router"));
const registerWhatsAppPlugin = (app) => {
    app.use('/plugins/whatsapp', whatsapp_router_1.default);
};
exports.registerWhatsAppPlugin = registerWhatsAppPlugin;
