import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../services/socket";
import useDocumentTitle from "../contexts/useDocumentTitle";
import { UserContext } from "../contexts/userContext";

export default function LoadingPage() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [foundPlayer, setFoundPlayer] = useState<boolean>(false);
  const [joining, setJoining] = useState<string | null>(null);

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
    <div className="h-screen dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
      {!joining ? "Wating for user . . . " : joining}
    </div>
  );
}
