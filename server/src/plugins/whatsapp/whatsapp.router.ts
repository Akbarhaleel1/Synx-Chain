import { Router } from 'express';
import { sendMessage, handleIncomingMessage } from './whatsapp.service';

const router = Router();

router.post('/send', async (req, res) => {
  console.log('🟢 /send route hit with:', req.body);

  const { to, templateName, templateLanguage, body } = req.body;

  try {
    if (!templateName && !body) {
      return res.status(400).json({
        success: false,
        error: 'Either templateName or body must be provided.',
      });
    }

    const sid = await sendMessage(to, {
      templateName,
      templateLanguage,
      body,
    });

    res.json({ success: true, sid });
  } catch (err) {
    console.error('❌ Error sending WhatsApp message:', err);
    res.status(500).json({ success: false, error: err || 'Something went wrong.' });
  }
});


// ✅ Meta Webhook to receive incoming WhatsApp messages
router.get('/webhook', (req, res) => {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === verifyToken) {
    console.log('Webhook verified!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});


router.post('/webhook', (req, res) => {
  console.log('webhoook is working')
  console.log('Incoming message:', req.body);
  res.sendStatus(200); // always respond 200
});



export default router;
