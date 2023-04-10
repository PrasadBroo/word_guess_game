import { useContext, useEffect } from "react";
import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

export default function JoinRandomRoompage() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.name) navigate("/");
    socket.emit("join_room", { data: { username: currentUser?.name } });
  }, []);

  return (
    <div className="joinanyroom">
      <div className=" transition dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
        {/* <span className="mr-4"> Wating for user </span> */}
        <PacmanLoader color="#fff" size={25} speedMultiplier={0.6} />
      </div>
    </div>
  );
}
