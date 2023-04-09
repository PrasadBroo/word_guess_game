import React, { useEffect, useState } from "react";
import { socket } from "../services/socket";

const GameCounter: React.FC = () => {
  const [counter, setCounter] = useState(120);

  const handelDecrementCounter = (data: number) => {
    setCounter(data);
  };
  useEffect(() => {
    socket.on("decrement_counter", handelDecrementCounter);

    return () => {
      socket.off("decrement_counter", handelDecrementCounter);
    };
  }, []);

  return (
    <div className="counter  bg-btn-blue text-white h-12 w-12 flex items-center justify-center   font-bold rounded-full">
      {counter}
    </div>
  );
};
export default GameCounter;
