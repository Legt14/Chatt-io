/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { io } from "socket.io-client";

const socket: any = io(`https://chattio-backend.onrender.com`, {
  withCredentials: true
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
