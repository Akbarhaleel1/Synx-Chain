// utils/socket.js
import { io } from "socket.io-client";

// Replace with your backend server
const webchatSocket = io(`http://localhost:5000/webchat/webchat`, {
  transports: ['websocket'],
});

export default webchatSocket;
    