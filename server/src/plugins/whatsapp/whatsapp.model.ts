import { Schema, model } from 'mongoose';

const WhatsAppMessageSchema = new Schema({
    from: String,
    to: String,
    body: String,
    messageSid: String,
    timeStamp: { type: Date, default: Date.now },
    direction: {type: String, enum: ['inbound', 'outbound']},
})

export const WhatsAppMessage = model('WhatsAppMessage', WhatsAppMessageSchema);

