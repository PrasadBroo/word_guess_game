import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../services/socket";
import { UserContext } from "../contexts/userContext";

export default function LoadingPage() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [foundPlayer, setFoundPlayer] = useState<boolean>(false);


  const handleFoundPlayer = (data: {
    name: string;
    id: string;
    room: string;
  }) => {
    setFoundPlayer(true);
    setCurrentUser({
      room: data.room,
      name: currentUser?.name,
      id: currentUser?.id,
    });
    document.title = `You vs ${data.name}`;
  };
  useEffect(() => {
    socket.on("found-player", handleFoundPlayer);
    () => {
      socket.off("found-player", handleFoundPlayer);
    };
  }, []);

  useEffect(() => {
    if (foundPlayer) {
      navigate("/game");
    }
  }, [foundPlayer]);

  return (
    <div className="h-screen transition dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
      Wating for user <span className="mx-2 animate-bounce ">.</span>{" "}
      <span className="mr-2 animate-bounce  ">.</span>{" "}
      <span className=" animate-bounce  ">.</span>
    </div>
  );
}
