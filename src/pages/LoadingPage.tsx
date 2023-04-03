import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../services/socket";

export default function LoadingPage() {
  const navigate = useNavigate();
  const [foundPlayer, setFoundPlayer] = useState<boolean>(false);
  const [joining, setJoining] = useState<string | null>(null);

  const handleFoundPlayer = (data:{username:string,id:string,room:string}) => {
      console.log(data);
      setFoundPlayer(true);
    }
  useEffect(() => {
    socket.on("found-player", handleFoundPlayer);
    ()=>{
      socket.off('found-player',handleFoundPlayer)
    }
  }, []);

  useEffect(() => {
    if (foundPlayer) {
      navigate("/game");
    }
  }, [foundPlayer]);

  return (
    <div className="h-screen text-2xl w-full flex items-center justify-center">
      {!joining ? "Wating for user . . . " : joining}
    </div>
  );
}
