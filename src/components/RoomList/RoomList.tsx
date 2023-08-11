/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../SocketContext/SocketContext";
import CreateRoomForm from "../createRoom/CreatedRoom";

const RoomList = ({ room }: any) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const { socket }: any = useContext(SocketContext);
  const [currentRoom, setCurrentRoom] = useState<string | null>("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [IsActive, setIsActive] = useState(true);
  const [UserCounts, setUserCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    socket.emit("getRooms"); // Enviar mensaje al servidor para obtener la lista de rooms

    socket.on("roomList", (roomList: string[]) => {
      setRooms(roomList);
    });

    socket.on("userCount", (data: { room: string; count: number }) => {
      setUserCounts((prevCounts) => ({
        ...prevCounts,
        [data.room]: data.count,
      }));
    });

    window.addEventListener("beforeunload", () => {
      if (currentRoom) {
        leaveRoom(currentRoom);
      }
    });

    // Importante: Limpiar el event listener al desmontar el componente
    return () => {
      socket.off("roomList");
      socket.off("userCount");
      window.removeEventListener("beforeunload", () => {
        if (currentRoom) {
          leaveRoom(currentRoom);
        }
      });
    };
  }, [socket, currentRoom]);

  const leaveRoom = (room: string | null) => {
    socket.emit("leave", room);
  };

  const joinRoom = (roomName: string) => {
    leaveRoom(currentRoom);
    socket.emit("joinRoom", roomName); // Enviar mensaje al servidor para unirse a la room especificada
    room(roomName);
    setCurrentRoom(roomName);
    setIsActive(false);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleMenu = () => {
    setIsActive(IsActive ? !IsActive : !IsActive);
    console.log(IsActive);
  };

  return (
    <aside>
      <section
        className={`${
          IsActive
            ? "hidden"
            : " p-4 absolute inset-y-0 left-0 flex items-center justify-start"
        } `}
      >
        <button
          onClick={handleMenu}
          className="bg-CuriousBlue/30 rounded-lg flex items-center justify-center w-8 h-8"
        >
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
      </section>
      <section
        className={` ${
          IsActive
            ? " overflow-hidden h-full md:w-72 w-screen p-4 z-30 bg-MineShaft max-sm:absolute  flex flex-col justify-between gap-4"
            : "hidden"
        } `}
      >
        <section className="h-full flex flex-col ">
          <section className="p-2 flex items-center justify-between ">
            <h1 className="font-Roboto text-3xl">Chattio</h1>
            <span
              onClick={handleOpenPopup}
              className=" w-6 h-6  bg-CuriousBlue rounded-lg flex items-center justify-center transition transform delay-100 duration-700 hover:-rotate-180 cursor-pointer ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <span className="material-symbols-outlined">add</span>
            </span>
            {isPopupOpen && (
              <CreateRoomForm
                isActive={isPopupOpen}
                onClose={() => setPopupOpen(false)}
              />
            )}
          </section>
          <section className="h-full overflow-y-scroll p-4 w-full grid grid-cols-2  justify-items-start content-start  md:flex md:flex-col  md:justify-start md:items-center gap-4">
            {rooms.map((roomName: string) => (
              <section
                onClick={() => joinRoom(roomName)}
                key={roomName}
                className="w-36 h-24 cursor-pointer md:h-16 flex items-center md:w-full shadow-none hover:shadow-xl hover:shadow-Tarawera/25 bg-LinkWater/5 hover:bg-CuriousBlue rounded-lg transition ease-in-out  delay-150  hover:-translate-y-1 hover:scale-110 duration-150"
              >
                <section className=" flex flex-col md:flex-row md:items-center max-sm:justify-center gap-4  font-Roboto p-2">
                  <span className="w-10 h-10  bg-HippieBlue rounded-xl flex items-center justify-center">
                    {UserCounts[roomName] || 0}
                  </span>
                  <p>{roomName}</p>
                </section>
              </section>
            ))}
          </section>
          <section className="p-2 flex items-center justify-self-end justify-end md:hidden">
            <button
              onClick={handleMenu}
              className="bg-CuriousBlue/30 rounded-lg flex items-center justify-center w-8 h-8"
            >
              <span className="material-symbols-outlined">arrow_left_alt</span>
            </button>
          </section>
        </section>
      </section>
    </aside>
  );
};

export default RoomList;
