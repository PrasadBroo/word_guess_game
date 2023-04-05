import React, { useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";

export default function CreateRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const {currentUser} = useContext(UserContext)
  const handelGeneratedRoom = (roomid: string) => {
    setRoomId(roomId);
  };

  useEffect(() => {
    socket.emit("generate_room",currentUser);
    socket.on("generated_room", handelGeneratedRoom);

    return () => {
      socket.off("generate_room");
      socket.off("generated_room");
    };
  }, []);
  return (
    <div className="create-room ">
      <div className="details">
        <input
          type="text"
          className="px-4 py-2 rounded"
          name="room-id"
          id="room-id"
          disabled
          value={roomId}
        />
        <button className="ml-2 py-2 px-4 bg-btn-blue rounded">Copy</button>
      </div>
      <div className="wating text-center mt-4">
        Wating for player <span className="mx-2 animate-bounce ">.</span>{" "}
        <span className="mr-2 animate-bounce  ">.</span>{" "}
        <span className=" animate-bounce  ">.</span>
      </div>
    </div>
  );
}
