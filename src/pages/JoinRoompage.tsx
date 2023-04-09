import { useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";
import toast from "react-hot-toast";

export default function JoinRoom() {

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [roomid, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  const handelRoomNotFound = () => {
    toast.error("room not found");
    setLoading(false);
  };

  useEffect(() => {
    socket.on("room_not_found", handelRoomNotFound);
    return () => {
      socket.off("room_not_found", handelRoomNotFound);
    };
  }, []);

  const handelJoinRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setCurrentUser((prevState: any) => ({
      ...prevState,
      room: roomid,
      name: currentUser?.name,
    }));
    socket.emit("join_private_room", { name: currentUser?.name, room: roomid });
  };

  return (
    <div className="joinroom">
      <form className="room" onSubmit={handelJoinRoom} >
        <input
          type="text"
          name="room_id"
          id="room_id"
          required
          min={10}
          className="px-4 py-2 rounded text-black"
          placeholder="Room id..."
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          type="submit"
          className="block mx-auto mt-4 py-2 px-4 bg-btn-blue disabled:opacity-50"
          disabled={!roomid || loading}
        >
          Join
        </button>
      </form>
    </div>
  );
}
