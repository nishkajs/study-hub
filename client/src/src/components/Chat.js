import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Send username when connected
    socket.emit("join", username);

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [username]);

  useEffect(() => {
    // Auto scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const messageData = {
      content: input,
      sender: username,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "1rem" }}>
      <h2>Chat Room</h2>
      <div
        style={{
          height: 400,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          backgroundColor: "#fafafa",
          borderRadius: "4px",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <strong>{msg.sender}</strong>{" "}
            <span style={{ color: "#888", fontSize: "0.85rem" }}>
              [{new Date(msg.timestamp).toLocaleTimeString()}]
            </span>
            : {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "4px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;

