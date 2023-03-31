import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { socket } from "../services/socket";

export default function HomePage() {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handelFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    setCurrentUser({ name: username });

    socket.emit("join_room", { data: { username } });

    navigate("/loading");
  };
  return (
    <div className="user-detailsw  h-screen flex items-center justify-center">
      <form className="form" onSubmit={handelFormSubmit}>
        <div className="username w-64">
          <input
            type="text"
            name="username"
            id="username"
            required
            autoFocus
            minLength={3}
            className="border bolder text-slate-400 w-full shadow-md border-slate-400  py-3 px-5"
            placeholder="Your name..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="btn mt-3 text-center">
          <button
            type="submit"
            className="bg-slate-400 py-2 rounded px-4 text-white disabled:cursor-not-allowed"
            disabled={!username}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
