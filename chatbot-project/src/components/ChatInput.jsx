import { useState } from 'react'
import {chatbot} from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
          if (!inputText.trim()) {
                return;
            }
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    const response = chatbot.getResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="send a message to chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        className="chat-input"
      />

      <button
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}