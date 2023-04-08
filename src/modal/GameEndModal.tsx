import classNames from "classnames";
import { motion } from "framer-motion";
import { useContext, useMemo } from "react";
import { GameContext } from "../contexts/gameContext";
import { UserContext } from "../contexts/userContext";

const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5, bounce: 0.4 },
  },
};

const handelIsUserWon = (
  winners: string[] | undefined,
  id: string | undefined
): boolean => {
  return winners?.includes(id || "") || false;
};

export default function GameEndModal() {
  const { gameEnded } = useContext(GameContext);
  const { currentUser } = useContext(UserContext);
  // not expensive operation but still :)
  const isUserWon = useMemo(
    () => handelIsUserWon(gameEnded?.winners, currentUser?.id),
    [gameEnded?.winners, currentUser?.id]
  );

  const modal_classnames = classNames(
    "max-w-sm  w-4/5 dark:bg-white p-3 rounded"
  );

  const handelplayAgain = () => {};
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={modal_classnames}
    >
      <div className="header text-center text-xl">
        <h3>
          Word was:- <span className=" underline">{gameEnded?.word}</span>
        </h3>
      </div>
      <div className="results my-4 text-center text-xl">
        {isUserWon ? (
          <div className="user-won text-green-600">You won!</div>
        ) : (
          <div className="user-lost text-red-500">You lost!</div>
        )}
      </div>
      <div className="btns text-center">
        <button
          className="mr-4 py-2 px-4 rounded bg-btn-blue text-white my-2 mx-auto"
          onClick={handelplayAgain}
        >
          <i className="fa-solid fa-arrow-rotate-right mr-4"></i>Play again
        </button>
        <button className=" py-2 px-4 rounded bg-btn-blue text-white my-2 mx-auto">
          <i className="fa-solid fa-bars mr-4"></i>Menu
        </button>
      </div>
    </motion.div>
  );
}
