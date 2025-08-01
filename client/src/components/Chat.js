import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username] = useState(() => "User" + Math.floor(Math.random() * 1000));
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = {
      text: input,
      sender: username,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  // Format timestamp to "12:34 PM"
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Style for bubbles
  const bubbleStyle = (isOwn) => ({
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: "20px",
    marginBottom: "8px",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
    backgroundColor: isOwn ? "#A8DADC" : "#FFC8DD",  // pastel blue for own, pastel pink for others
    color: "#1D3557",
    alignSelf: isOwn ? "flex-end" : "flex-start",
    wordWrap: "break-word",
    fontWeight: "500",
    fontSize: "14px",
  });

  const containerStyle = {
    maxWidth: "400px",
    margin: "2rem auto",
    fontFamily: "'Quicksand', sans-serif",
    display: "flex",
    flexDirection: "column",
  };

  const messagesContainerStyle = {
    border: "1px solid #ccc",
    padding: "1rem",
    height: "300px",
    overflowY: "auto",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
  };

  const senderInfoStyle = {
    fontSize: "0.85rem",
    color: "#555",
    marginBottom: "4px",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#ff6f91" }}>Chat Room</h2>
      <div style={messagesContainerStyle}>
        {messages.map((msg, index) => {
          const isOwn = msg.sender === username;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isOwn ? "flex-end" : "flex-start",
              }}
            >
              <div style={senderInfoStyle}>
                {msg.sender} [{formatTimestamp(msg.timestamp)}]
              </div>
              <div style={bubbleStyle(isOwn)}>{msg.text}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flexGrow: 1,
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1.2rem",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#ff6f91",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 3px 6px rgba(255, 111, 145, 0.5)",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

