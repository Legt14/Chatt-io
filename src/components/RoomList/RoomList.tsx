/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../SocketContext/SocketContext";
import CreateRoomForm from "../createRoom/CreatedRoom";

const RoomList = ({ room }:any) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const socket:any = useContext(SocketContext);
  const [currentRoom, setCurrentRoom] = useState<string | null>("");

  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    socket.emit("getRooms"); // Enviar mensaje al servidor para obtener la lista de rooms

    socket.on("roomList", (roomList: string[]) => {
      setRooms(roomList);
    });

    // Importante: Limpiar el event listener al desmontar el componente
    return () => {
      socket.off("roomList");
    };
  }, [socket]);

  const leaveRoom = () => {
    socket.emit("leaveRoom", currentRoom);
    console.log(currentRoom);
  };

  const joinRoom = (roomName: string) => {
    leaveRoom;
    socket.emit("joinRoom", roomName); // Enviar mensaje al servidor para unirse a la room especificada
    room(roomName);
    setCurrentRoom(roomName);
  };
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  return (
    <aside className="p-4 w-96 h-screen bg-MineShaft flex flex-col gap-4 overflow-hiddem ">
      <section className="flex items-center justify-between ">
        <h1 className="font-Roboto text-3xl">Chattio</h1>
        <span
          onClick={handleOpenPopup}
          className=" w-6 h-6  bg-CuriousBlue rounded-lg flex items-center justify-center transition transform delay-100 duration-700 hover:-rotate-180 cursor-pointer ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <span className="material-symbols-outlined">add</span>
        </span>
        {isPopupOpen && <CreateRoomForm isActive={isPopupOpen} onClose={() => setPopupOpen(false)} />}
      </section>
      <section className="p-4 w-full h-auto flex flex-col items-center justify-start gap-4 overflow-y-scroll">
        {rooms.map((roomName) => (
          <section
            key={roomName}
            className="w-48 shadow-none hover:shadow-xl hover:shadow-Tarawera/25 bg-LinkWater/5 hover:bg-CuriousBlue rounded-lg transition ease-in-out  delay-150  hover:-translate-y-1 hover:scale-110 duration-150 "
          >
            <p
              onClick={() => joinRoom(roomName)}
              className="flex gap-4 items-center cursor-pointer font-Roboto p-2 h-16"
            >
              <span className="w-10 h-10  bg-HippieBlue rounded-xl flex items-center justify-center"></span>
              {roomName}
            </p>
          </section>
        ))}
      </section>
    </aside>
  );
};

export default RoomList;
