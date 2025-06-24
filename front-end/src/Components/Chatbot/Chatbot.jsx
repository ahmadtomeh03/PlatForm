import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // تمنع سكرول الصفحة لما الشات مفتوح أو موسّع
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen, isExpanded]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // أضف رسالة المستخدم
    const newUserMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    try {
      // أرسل للسيرفر
      const res = await axios.post("http://localhost:3000/chatboot", { input });

      // أضف رد البوت
      const botMessage = { from: "bot", text: res.data };
      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I couldn't get a response." },
      ]);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {!isExpanded && (
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="chatbot-toggle-button"
        >
          💬
        </button>
      )}

      <div
        className={`chatbot-container ${isOpen ? "open" : "closed"} ${isExpanded ? "expanded fullscreen" : ""}`}
      >
        <div className="chatbot-header">
          Chatbot
          <div style={{ position: "absolute", top: 8, left: 12 }}>
            <button onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? "⤡" : "⤢"}
            </button>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsExpanded(false);
            }}
            className="chatbot-close-button"
          >
            ×
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message ${msg.from === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-container">
          <textarea
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="chatbot-input"
          />
          <button onClick={handleSend} className="chatbot-send-button">
            ➤
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
