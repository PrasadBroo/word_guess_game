import React, { useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";

export default function CreateRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const { currentUser } = useContext(UserContext);
  const [copied,setCopied] = useState(false)
  const handelGeneratedRoom = (roomid: string) => {
    setRoomId(roomid);
  };
const handelRoomIdCopy = async()=>{
 await navigator.clipboard.writeText(roomId)
 setCopied(true)
}

  useEffect(() => {
    socket.emit("generate_room", currentUser);
    socket.on("generated_room", handelGeneratedRoom);

    return () => {
      socket.off("generate_room");
      socket.off("generated_room");
    };
  }, []);
  
  return (
    <div className="create-room font-Bungee ">
      <div className="details">
        <input
          type="text"
          className="px-4 py-2 rounded"
          name="room-id"
          id="room-id"
          disabled
          value={roomId}
        />
        <button className=" py-2 px-4 bg-btn-blue rounded block mt-4 mx-auto" onClick={handelRoomIdCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="wating text-center mt-4">
        Wating for player <span className="mr-2 animate-bounce ">.</span>{" "}
        <span className="mr-2 animate-bounce  ">.</span>{" "}
        <span className=" animate-bounce  ">.</span>
      </div>
    </div>
  );
}
