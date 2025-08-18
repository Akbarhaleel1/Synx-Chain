// src/components/WebChatWidget.tsx
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Replace with your backend URL

export default function WebChatWidget({ businessId, userId }: { businessId: string, userId: string }) {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Join room for this user
    socket.emit('join-room', { businessId, userId });

    // Listen for new messages
    socket.on('new-webchat-message', () => {
      // if (msg.businessId === businessId && msg.userId === userId) {
      //   setMessages((prev) => [...prev, msg]);
      // }
    });
  }, [businessId, userId]);

  const sendMessage = async () => {
    if (!input) return;
    try {
      // Send message to backend
      await axios.post('http://localhost:5000/webchat/send', {
        businessId,
        userId,
        body: input,
      });

      // Add to local chat
      // setMessages((prev) => [...prev, { from: 'user', body: input, direction: 'outbound' }]);
      setInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, width: 320, fontFamily: 'Arial' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%' }}>
        {open ? 'Close Chat' : 'Chat with us'}
      </button>

      {open && (
        <div style={{ border: '1px solid #ccc', background: '#fff', padding: 10, maxHeight: 400, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: 10 }}>
            {/* {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.direction === 'inbound' ? 'left' : 'right', margin: '5px 0' }}>
                <b>{msg.direction === 'inbound' ? 'Bot:' : 'You:'}</b> {msg.body}
              </div>
            ))} */}
          </div>
          <div style={{ display: 'flex' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flexGrow: 1, padding: 5 }}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={{ marginLeft: 5, padding: '5px 10px' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
