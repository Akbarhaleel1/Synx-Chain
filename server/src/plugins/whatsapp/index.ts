import whatsappRouter from './whatsapp.router';

export const registerWhatsAppPlugin = (app:any) => {
  app.use('/plugins/whatsapp', whatsappRouter);
};
