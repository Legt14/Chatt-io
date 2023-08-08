/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { io } from "socket.io-client";

const socket: any = io(`${import.meta.env.VITE_CONNECTION_2 }`, {
  transports: ['websocket']
});
const SocketContext = createContext(socket);

const SocketProvider = ({ children }: any) => {
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};

export { SocketProvider, SocketContext };
