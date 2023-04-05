import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  user: {
    name: string;
    id: string;
    correct: boolean;
    guess: string;
    typing: boolean;
  };
};

const variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const GuessMsg: React.FC<Props> = ({ user }) => {
  const { currentUser } = useContext(UserContext);
  const msg_class = classNames("guess p-2 text-center mb-1 flex items-center", {
    "flex-row-reverse ": currentUser?.id === user.id,
  });
  const user_msg_classes = classNames(
    "user-guess mx-2  py-2  px-3  rounded-xl",
    {
      "bg-green-400 text-white": user.correct,
      "dark:bg-primary dark:text-secondary": !user.correct,
    }
  );
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={msg_class}
    >
      <span className="username h-10 w-10  flex font-bold items-center  justify-center bg-btn-blue rounded-full p-2 text-white ">
        {user.name[0].toLocaleUpperCase()}
      </span>
      <p className={user_msg_classes}>{user.guess}</p>
    </motion.div>
  );
};

export default GuessMsg;
