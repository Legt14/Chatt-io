import { useState } from "react";
import "./App.css";
import { Chat } from "./components/chat/Chat";
import { SocketProvider } from "./components/SocketContext/SocketContext";
import RoomList from "./components/RoomList/RoomList";

function App() {
  const [roomName, setRoomName] = useState("");

  const handleRoomName = (room: string) => {
    setRoomName(room);
  };
  return (
    <>
      <section className="min-h-screen min-w-screen bg-PrussianBlue text-LinkWater flex">
        <SocketProvider>
          <RoomList room={handleRoomName} />
          <Chat roomName={roomName} />
        </SocketProvider>
      </section>
    </>
  );
}

export default App;
