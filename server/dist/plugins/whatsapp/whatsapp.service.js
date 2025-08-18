"use strict";
// import client from "twilio";
// import { WhatsAppMessage } from "./whatsapp.model";
// import dotenv from "dotenv";
// import { emitNewWhatsAppMessage } from "../../sockets/socket";
// dotenv.config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIncomingMessage = exports.sendMessage = void 0;
// const twilioClient = client(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
// export const sendMessage = async (
//   to: string,
//   content: {
//     contentSid?: string; // Optional - for templates
//     contentVariables?: object;
//     body?: string; // Optional - for custom messages
//   }
// ) => {
//   try {
//     const messageData: any = {
//       from: process.env.TWILIO_WHATSAPP_NUMBER,
//       to: to,
//     };
//     console.log('messageData is', messageData)
//     if (content.contentSid) {
//       console.log('content.contentSid is', content.contentSid)
//       // Template message
//       messageData.contentSid = content.contentSid;
//       messageData.contentVariables = JSON.stringify(content.contentVariables || {});
//     } else if (content.body) {
//       // Freeform message (inside 24h session only)
//       console.log('content.body is', content.body)
//       messageData.body = content.body;
//     } else {
//       console.log('Either contentSid or body must be provided')
//       throw new Error("Either contentSid or body must be provided.");
//     }
//     const message = await twilioClient.messages.create(messageData);
// console.log('message is', message)
//     // Save to DB
//     await WhatsAppMessage.create({
//       from: messageData.from,
//       to: messageData.to,
//       messageSid: message.sid,
//       direction: "outbound",
//       body: content.body || JSON.stringify(content.contentVariables),
//     });
//     return message.sid;
//   } catch (err) {
//     console.error("WhatsApp send error:", err);
//     throw err;
//   }
// };
// export const handleIncomingMessage = async (payload: any) => {
//   // payload comes from Twilio webhook
//   console.log("payload", payload);
//   const { From, Body, MessageSid } = payload;
//   await WhatsAppMessage.create({
//     from: From,
//     to: process.env.TWILIO_WHATSAPP_NUMBER,
//     body: Body,
//     messageSid: MessageSid,
//     direction: "inbound",
//   });
//   emitNewWhatsAppMessage({
//     from: From,
//     to: process.env.TWILIO_WHATSAPP_NUMBER,
//     body: Body,
//     direction: "inbound",
//   });
//   // Here you can call bot engine to trigger plugins
//   return "Message saved";
// };
// Replace Twilio logic with Meta WhatsApp Cloud API call
const axios_1 = __importDefault(require("axios"));
const whatsapp_model_1 = require("./whatsapp.model");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("../../sockets/socket");
dotenv_1.default.config();
const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${process.env.META_PHONE_NUMBER_ID}/messages`;
const sendMessage = async (to, content) => {
    try {
        const payload = {
            messaging_product: "whatsapp",
            to,
        };
        if (content.templateName) {
            payload.type = "template";
            payload.template = {
                name: content.templateName,
                language: {
                    code: content.templateLanguage || "en_US",
                },
            };
        }
        else if (content.body) {
            payload.type = "text";
            payload.text = { body: content.body };
        }
        else {
            throw new Error("Either templateName or body must be provided.");
        }
        const response = await axios_1.default.post(WHATSAPP_API_URL, payload, {
            headers: {
                Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        const messageId = response.data.messages?.[0]?.id;
        await whatsapp_model_1.WhatsAppMessage.create({
            from: process.env.META_PHONE_NUMBER_ID,
            to,
            messageSid: messageId,
            direction: "outbound",
            body: content.body || content.templateName,
        });
        return messageId;
    }
    catch (err) {
        console.error("WhatsApp Cloud API error:", err);
        throw err;
    }
};
exports.sendMessage = sendMessage;
const handleIncomingMessage = async (payload) => {
    // Expected payload from Meta webhook
    const { from, text } = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0] || {};
    if (!from || !text)
        return;
    await whatsapp_model_1.WhatsAppMessage.create({
        from,
        to: process.env.META_PHONE_NUMBER_ID,
        body: text.body,
        messageSid: payload.entry[0].id,
        direction: "inbound",
    });
    (0, socket_1.emitNewWhatsAppMessage)({
        from,
        to: process.env.META_PHONE_NUMBER_ID,
        body: text.body,
        direction: "inbound",
    });
    return "Message saved";
};
exports.handleIncomingMessage = handleIncomingMessage;
