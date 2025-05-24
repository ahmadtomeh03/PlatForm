import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import notificationSound from './relax-message-tone.mp3';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.from === "bot" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Sound playback prevented:", err);
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { from: "user", text: input }]);

    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: `You said: "${input}"` },
      ]);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={notificationSound} preload="auto" />

      <button
        onClick={() => setIsOpen((open) => !open)}
        className="chatbot-toggle-button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28"
          viewBox="0 0 24 24"
          width="28"
          fill="white"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 2H4c-1.1 0-2 .9-2 2v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </button>

      <div
        className={`chatbot-container ${isOpen ? "open" : "closed"}`}
        aria-hidden={!isOpen}
      >
        <div className="chatbot-header">
          Chatbot
          <button
            onClick={() => setIsOpen(false)}
            className="chatbot-close-button"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message ${
                msg.from === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chatbot-input"
          />
          <button onClick={handleSend} className="chatbot-send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
