import { useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "../services/socket";

export default function Landingpage() {
  
  useEffect(() => {
    socket.disconnected && socket.connect();
    console.log(socket.connected);
  }, []);

  return (
    <div className="landing-page">
      <Link
        to="/random"
        className="block my-2 w-full  hover:shadow-md shadow-white bg-slate-400 transition py-2 dark:bg-btn-blue rounded px-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Join random room
      </Link>
      <Link
        to="/createroom"
        className="block my-2 w-full hover:shadow-md shadow-white bg-slate-400 transition py-2 dark:bg-btn-blue rounded px-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create room
      </Link>
      <Link
        to="/joinroom"
        className="block my-2 w-full hover:shadow-md shadow-white bg-slate-400 transition py-2 dark:bg-btn-blue rounded px-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Join room
      </Link>
    </div>
  );
}
