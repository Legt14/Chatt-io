import { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(`${import.meta.env.VITE_CONNECTION}`);
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};

export {SocketProvider, SocketContext}
