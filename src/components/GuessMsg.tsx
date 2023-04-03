import classNames from "classnames";
import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

type Props = {
  children?: React.ReactNode;
  guessMsg: string;
  user: {
    name: string;
  };
};

const GuessMsg: React.FC<Props> = ({ guessMsg, user }) => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser?.name, user.name);
  const msg_class = classNames(
    "guess font-Bungee p-2 text-center mb-1 flex items-center",
    {
      "flex-row-reverse ": currentUser?.name === user.name,
    }
  );
  return (
    <div className={msg_class}>
      <span className="username h-10 w-10 flex font-bold items-center  justify-center bg-btn-blue rounded-full p-2 text-white ">
        {user.name[0].toLocaleUpperCase()}
      </span>
      <p className="user-guess mx-2 dark:bg-primary py-2 dark:text-secondary px-3  rounded-xl">
        {guessMsg}
      </p>
    </div>
  );
};

export default GuessMsg;
