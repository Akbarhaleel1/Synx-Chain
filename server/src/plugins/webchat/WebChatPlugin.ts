// src/plugins/webchat/WebChatPlugin.ts
import { emitNewWebChatMessage } from '../../sockets/socket';
import { WebChatMessage } from './webchat.model';

export const handleIncomingMessage = async (from: string, body: string) => {
  const message = await WebChatMessage.create({ from, body, direction: 'inbound' });
  emitNewWebChatMessage(message);

  // Trigger plugins here
  // triggerPluginEngine(message);
};

export const sendMessage = async (to: string, body: string) => {
  const message = await WebChatMessage.create({ from: 'bot', to, body, direction: 'outbound' });
  emitNewWebChatMessage(message);
  return message;
};
