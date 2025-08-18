import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWebChatMessage extends Document {
  from: string; // user ID or bot
  to: string;   // user ID or bot
  body: string;
  direction: 'inbound' | 'outbound';
  createdAt: Date;
}

const WebChatMessageSchema: Schema<IWebChatMessage> = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
    direction: { type: String, enum: ['inbound', 'outbound'], required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // track message creation time
  }
);

export const WebChatMessage: Model<IWebChatMessage> = mongoose.model<IWebChatMessage>(
  'WebChatMessage',
  WebChatMessageSchema
);
