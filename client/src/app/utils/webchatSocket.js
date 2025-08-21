// utils/socket.js
import { io } from "socket.io-client";

// Replace with your backend server
const webchatSocket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}/webchat`, {
  transports: ['websocket'],
});

export default webchatSocket;
    