import classNames from "classnames";
import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

type Props = {
  children?: React.ReactNode;
  guessMsg: string;
  user: {
    [username: string]: string;
  };
};

const GuessMsg: React.FC<Props> = ({ guessMsg, user }) => {
  const { currentUser } = useContext(UserContext);
  const msg_class = classNames(
    "guess p-2 bg-blue-400 text-center mb-1 text-white  w-min rounded-xl  flex items-center",
    {
      "flex-row-reverse ": currentUser?.name === user.username,
    }
  );
  return (
    <div className={msg_class}>
      <div className="msg">
        <span className="username inline-block">{user.username}</span>
        <span className="user-guess mx-2 inline-block">{guessMsg}</span>
      </div>
    </div>
  );
};

export default GuessMsg;
