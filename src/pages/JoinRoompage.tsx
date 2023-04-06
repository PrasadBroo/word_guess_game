import { useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [roomid, setRoomId] = useState("");

  const handelJoinRoom = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCurrentUser((prevState: any) => ({
      ...prevState,
      room: roomid,
      name: currentUser?.name,
    }));
    socket.emit("join_private_room", { name: currentUser?.name, room: roomid });
    navigate('/loading')

  };

  return (
    <div className="joinroom">
      <form className="room" onSubmit={handelJoinRoom}>
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
          disabled={!roomid}
        >
          Join
        </button>
      </form>
    </div>
  );
}
