import classNames from "classnames";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GameContext } from "../contexts/gameContext";

const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5, bounce: 0.4 },
  },
};

export default function GameEndModal() {
  const { gameEnded } = useContext(GameContext);
  const modal_classnames = classNames(
    "max-w-sm  w-4/5 dark:bg-white p-3 rounded m"
  );
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={modal_classnames}
    >
      <div className="header text-center text-xl">
        <h3>Word was:- {gameEnded?.word}</h3>
      </div>
      <div className="results my-4 text-center text-xl">
        {gameEnded?.isUserWon && (
          <div className="user-won text-green-600">You won!</div>
        )}
        {!gameEnded?.isUserWon && (
          <div className="user-won text-red-500">You lost!</div>
        )}
      </div>
      <div className="btns text-center">
        <button className="mr-4 py-2 px-4 rounded bg-btn-blue text-white my-2 mx-auto">
          <i className="fa-solid fa-arrow-rotate-right mr-4"></i>Play again
        </button>
        <button className=" py-2 px-4 rounded bg-btn-blue text-white my-2 mx-auto">
          <i className="fa-solid fa-bars mr-4"></i>Menu
        </button>
      </div>
    </motion.div>
  );
}
