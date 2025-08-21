// import mongoose, { Schema, Document, Model } from 'mongoose';

// export interface IWebChatMessage extends Document {
//   from: string; // visitor sessionId or bot
//   to: string;   // bot or sessionId
//   body: string;
//   direction: 'inbound' | 'outbound';
//   channel: 'web' | 'whatsapp' | 'instagram';
//   sessionId: string; // unique per visitor
//   siteDomain: string; // which website the visitor is on
//   metadata?: any; // optional, for rich content or analytics
//   createdAt: Date;
// }

// const WebChatMessageSchema: Schema<IWebChatMessage> = new Schema(
//   {
//     from: { type: String, required: true },
//     to: { type: String, required: true },
//     body: { type: String, required: true },
//     direction: { type: String, enum: ['inbound', 'outbound'], required: true },
//     channel: { type: String, enum: ['web', 'whatsapp', 'instagram'], default: 'web' },
//     sessionId: { type: String, required: true },
//     siteDomain: { type: String, required: true }, // track which website this message belongs to
//     metadata: { type: Schema.Types.Mixed },
//   },
//   {
//     timestamps: { createdAt: true, updatedAt: false },
//   }
// );

// // Indexes for faster queries
// WebChatMessageSchema.index({ sessionId: 1, createdAt: -1 });
// WebChatMessageSchema.index({ siteDomain: 1, createdAt: -1 });

// export const WebChatMessage: Model<IWebChatMessage> = mongoose.model<IWebChatMessage>(
//   'WebChatMessage',
//   WebChatMessageSchema
// );


import mongoose, { Schema, Document } from 'mongoose';

interface IChatMessage extends Document {
  from: string;        // user ID or bot
  body: string;        // message text
  channel: string;     // e.g., 'web'
  siteDomain?: string; // optional
  role: 'user' | 'bot';
  createdAt: Date;
}

const ChatMessageSchema: Schema<IChatMessage> = new Schema({
  from: { type: String, required: true },
  body: { type: String, required: true },
  channel: { type: String, required: true },
  siteDomain: { type: String },
  role: { type: String, enum: ['user', 'bot'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
export default ChatMessage;
