// import client from "twilio";
// import { WhatsAppMessage } from "./whatsapp.model";
// import dotenv from "dotenv";
// import { emitNewWhatsAppMessage } from "../../sockets/socket";
// dotenv.config();

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
import axios from "axios";
import { WhatsAppMessage } from "./whatsapp.model";
import dotenv from "dotenv";
import { emitNewWhatsAppMessage } from "../../sockets/socket";
dotenv.config();

const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${process.env.META_PHONE_NUMBER_ID}/messages`;

export const sendMessage = async (
  to: string,
  content: {
    templateName?: string;
    templateLanguage?: string;
    body?: string;
  }
) => {
  try {
    const payload: any = {
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
    } else if (content.body) {
      payload.type = "text";
      payload.text = { body: content.body };
    } else {
      throw new Error("Either templateName or body must be provided.");
    }

    const response = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const messageId = response.data.messages?.[0]?.id;

    await WhatsAppMessage.create({
      from: process.env.META_PHONE_NUMBER_ID,
      to,
      messageSid: messageId,
      direction: "outbound",
      body: content.body || content.templateName,
    });

    return messageId;
  } catch (err) {
    console.error("WhatsApp Cloud API error:",err);
    throw err;
  }
};

export const handleIncomingMessage = async (payload: any) => {
  // Expected payload from Meta webhook
  const { from, text } = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0] || {};

  if (!from || !text) return;

  await WhatsAppMessage.create({
    from,
    to: process.env.META_PHONE_NUMBER_ID,
    body: text.body,
    messageSid: payload.entry[0].id,
    direction: "inbound",
  });

  emitNewWhatsAppMessage({
    from,
    to: process.env.META_PHONE_NUMBER_ID,
    body: text.body,
    direction: "inbound",
  });

  return "Message saved";
};
