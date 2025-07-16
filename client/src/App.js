import React, { useState } from "react";

function App() {
  const [roomName, setRoomName] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/study-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roomName }),
      });

      const data = await res.json();
      setResponse(data);
      setRoomName(""); // Clear the input
    } catch (err) {
      console.error("❌ Error creating room:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Create a Study Room</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>Create</button>
      </form>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          ✅ <strong>Room created:</strong> {response.name}
        </div>
      )}
    </div>
  );
}

export default App;

