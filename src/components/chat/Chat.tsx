import React, { useContext, useState, useEffect, SyntheticEvent } from "react";
import { SocketContext } from "../SocketContext/SocketContext";
import { Socket } from "socket.io-client";

interface ReactProp {
  roomName: string;
}

const Chat = ({ roomName }: ReactProp) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<object[]>([]);
  const { socket }: Socket = useContext(SocketContext);
  
  const validation = (data: string) => {
    return data.trim() == "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      data: message,
      from: "Me",
    };
    if (validation(message)) {
      console.log("error");
    } else {
      setMessages([...messages, newMessage]);
      socket.emit("message", message, roomName);
      handleScroll();
      setMessage("");
    }
  };

  const receiveMessage = (msg: string) => {
    setMessages((state) => [...state, msg]);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const handleScroll = () => {
    const scrollContainer: HTMLElement | null =
      document.getElementById("chatContainer");
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  };

  return (
    <>
      <main className="flex flex-col items-end justify-between h-screen w-full">
        <section className="flex items-center justify-start p-4 w-full bg-MineShaft rounded-br-3xl ">
          <h2 className="font-Roboto text-3xl">
            #{roomName}
          </h2>
        </section>
        <section
          className="h-full p-4 text-base w-full break-all overflow-y-scroll"
          id="chatContainer"
        >
          {messages?.map((msg, i) => (
            <section key={i} className={`flex flex-col w-full`}>
              <section
                className={`flex flex-col p-2 m-2 text-sm max-w-[30rem] ${
                  msg.from === "Me"
                    ? "bg-CuriousBlue ml-auto rounded-t-2xl rounded-bl-2xl"
                    : "bg-CuriousBlue/20 mr-auto rounded-t-2xl rounded-br-2xl"
                } `}
              >
                <p
                  className={`text-xs ${
                    msg.from === "Me" ? "hidden" : "text-SeaPink"
                  }`}
                >
                  {msg.from}
                </p>
                <p>{msg.data}</p>
              </section>

              {/* <p
                className={` p-2 m-2 ${
                  msg.from === "Me"
                    ? "bg-Elm ml-auto rounded-t-2xl rounded-bl-2xl"
                    : "bg-Tarawera mr-auto rounded-t-2xl rounded-br-2xl"
                }`}
              >
                {msg.from === "Me" ? `${msg.data}` : `${msg.from}:${msg.data}`}
              </p> */}
            </section>
          ))}
        </section>
        <form
          onSubmit={handleSubmit}
          className="p-5 w-full flex items-center justify-center gap-4 h-16 bg-MineShaft rounded-se-3xl "
        >
          <input
            type="text"
            name=""
            id="inputChat"
            value={message}
            placeholder="Type something"
            autoComplete="off"
            className="p-3 w-full rounded-xl bg-LinkWater/10 focus:outline-none"
            onChange={handleInputChange}
          />
          <button className="flex justify-center items-center w-9 h-9 rounded-xl bg-CuriousBlue transition transform delay-100 duration-300 hover:-rotate-90">
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </main>
    </>
  );
};
export { Chat };
