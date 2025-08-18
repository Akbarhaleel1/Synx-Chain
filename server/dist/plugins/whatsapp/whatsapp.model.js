"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMessage = void 0;
const mongoose_1 = require("mongoose");
const WhatsAppMessageSchema = new mongoose_1.Schema({
    from: String,
    to: String,
    body: String,
    messageSid: String,
    timeStamp: { type: Date, default: Date.now },
    direction: { type: String, enum: ['inbound', 'outbound'] },
});
exports.WhatsAppMessage = (0, mongoose_1.model)('WhatsAppMessage', WhatsAppMessageSchema);
