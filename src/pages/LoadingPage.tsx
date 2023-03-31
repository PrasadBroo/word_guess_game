import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { socket } from "../services/socket";

export default function LoadingPage() {

  const navigate = useNavigate();
  const [foundPlayer, setFoundPlayer] = useState<boolean>(false);
  const [joining, setJoining] = useState<string | null>(null);

  useEffect(() => {
    socket.on("found-player", (data) => {
      console.log(data);
      setFoundPlayer(true);
    });
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
