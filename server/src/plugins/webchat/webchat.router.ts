import { Router } from 'express';
// import { IWebChatMessage, WebChatMessage } from './webchat.model';
// import { sendMessage, handleIncomingMessage } from './whatsapp.service';

const router = Router();

router.post('/message', async (req, res) => {
    try {
        console.log('🟢 /message route hit with:', req.body);
        // const messageData: Partial<IWebChatMessage> = {
        //     from: req.body.from,
        //     to: req.body.to,
        //     body: req.body.body,
        //     direction: req.body.direction,
        //     channel: req.body.channel,
        //     sessionId: req.body.sessionId,
        //     siteDomain: req.body.siteDomain,
        //     metadata: req.body.metadata || {}
        // }
        // console.log('messageData', messageData)
        // const message = new WebChatMessage(messageData);
        // const savedMessage = await message.save();

        // console.log('💾 Message saved to DB:', savedMessage);
        // res.status(201).json({ success: true, message: savedMessage });

    } catch (err) {
        console.error('❌ Error saving message:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });

    }
});

export default router;
