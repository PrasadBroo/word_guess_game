import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/gameContext";

export default function LoadingPage() {
  const navigate = useNavigate();
  const { foundPlayer } = useContext(GameContext);

  useEffect(() => {
    if (foundPlayer) {
      navigate("/game");
    }
  }, [foundPlayer]);

  return (
    <div className=" transition dark:text-white dark:bg-secondary text-2xl w-full flex items-center justify-center">
      Wating for user <span className="mx-2 animate-bounce ">.</span>{" "}
      <span className="mr-2 animate-bounce  ">.</span>{" "}
      <span className=" animate-bounce  ">.</span>
    </div>
  );
}
