/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from "react";
import { SocketContext } from "../SocketContext/SocketContext";

interface ReactProp {
  isActive:boolean,
  onClose:()=>void
}

const CreateRoomForm = ({ isActive, onClose }:ReactProp) => {
  const { socket }:any = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState<boolean>()

  const validation = (data: string) => {
    return data.trim() == "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleButtonCancel = () => {
    setRoomName(""); // Limpiar el input al hacer clic en "Cancel"
    onClose(); // Cierra el pop-up al hacer clic en "Cancel"
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validation(roomName)) {
      console.log("RoomName invalid");
      setError(true)
    } else {
      socket.emit("create", roomName); // Enviar el nombre de la room al servidor mediante Socket.IO
      setRoomName(""); // Limpiar el input después de crear la room
      onClose();
    }
  };

  return (
    <section
      className={`z-40 bg-MineShaft/5 backdrop-blur-lg absolute inset-0 flex items-center justify-center ${
        isActive ? "visible" : "hidden"
      }`}
      // className={`z-40 bg-MineShaft/5 backdrop-blur-lg absolute inset-0 flex items-center justify-center`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="border border-LinkWater border-opacity-10 bg-MineShaft w-80 h-56 p-5 rounded-xl flex flex-col items-center justify-center gap-24"
      >
        <input
          type="text"
          value={roomName}
          maxLength={14}
          className={`p-3 w-full rounded-xl bg-LinkWater/10 focus:outline-none text-center ${error ? 'border border-PersianRed ' : ''}`}
          placeholder="Room Name"
          autoComplete="off"
          autoFocus={true}
          onChange={handleInputChange}
        />
        <section className="flex items-center justify-between w-full [&>button]:w-32 [&>button]:h-12 [&>button]:rounded-xl">
          <button
            type="button"
            className="bg-PersianRed"
            onClick={handleButtonCancel}
          >
            Cancel
          </button>
          <button className="bg-CuriousBlue transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 duration-150" type="submit">
            Create Room
          </button>
        </section>
      </form>
    </section>
  );
};

export default CreateRoomForm;
