import React, { useState } from "react";
import Chat from "./components/Chat";
import "../src/styles/AnimatedBackground.css";

function App() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      {/* Background */}
      <div className="animated-background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {joined ? (
        <Chat username={username} room={room} />
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Nunito', sans-serif",
            padding: "1rem",
          }}
        >
          <h1 style={{ color: "#ff80ab", marginBottom: "1rem" }}>Welcome to Study Chat 💬</h1>
          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <input
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <button
            onClick={() => username && room && setJoined(true)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#cce5ff",
              border: "none",
              borderRadius: "1rem",
              fontWeight: "bold",
            }}
          >
            Join Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

