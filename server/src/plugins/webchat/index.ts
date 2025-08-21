import webchatRouter from './webchat.router';

export const registerWebChatPlugin = (app: any) => {
  app.use('/plugins/webchat', webchatRouter);
};