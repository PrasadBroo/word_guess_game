import { useContext, useEffect } from "react";
import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/gameContext";

export default function JoinRandomRoompage() {
  const { currentUser } = useContext(UserContext);
  const { foundPlayer } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.name) navigate("/");
    socket.emit("join_room", { data: { username: currentUser?.name } });
  }, []);

  useEffect(() => {
    if (foundPlayer) {
      navigate("/game");
    }
  }, [foundPlayer]);

  return (
    <div className="joinanyroom">
      <div className=" transition dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
        Wating for user <span className="mx-2 animate-bounce ">.</span>{" "}
        <span className="mr-2 animate-bounce  ">.</span>{" "}
        <span className=" animate-bounce  ">.</span>
      </div>
    </div>
  );
}
