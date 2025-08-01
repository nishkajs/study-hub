import React, { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setIsJoined(true);
    }
  };

  if (!isJoined) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Enter your username</h1>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "1rem" }}>
            Join Chat
          </button>
        </form>
      </div>
    );
  }

  return <Chat username={username} />;
}

export default App;

