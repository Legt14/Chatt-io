import { useState } from "react";
import "./App.css";
import { Chat } from "./components/chat/Chat";
import { SocketProvider } from "./components/SocketContext/SocketContext";
import CreateRoomForm from "./components/createRoom/CreatedRoom";
import RoomList from "./components/RoomList/RoomList";

function App() {
  const [roomName, setRoomName] = useState("");

  const handleRoomName = (room: string) => {
    setRoomName(room);
  };
  return (
    <>
      <section className="min-h-screen min-w-screen bg-PrussianBlue text-LinkWater flex">
        {/* <div className="bg-Elephant w-10 h-10"></div>
        <div className="bg-MineShaft w-10 h-10"></div>
        <div className="bg-Tarawera w-10 h-10"></div>
        <div className="bg-PrussianBlue w-10 h-10"></div> */}
        <SocketProvider>
          {/* <CreateRoomForm /> */}
          <RoomList room={handleRoomName} />
          <Chat roomName={roomName} />
        </SocketProvider>
      </section>
    </>
  );
}

export default App;
