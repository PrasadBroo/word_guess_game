import React, { useContext, useEffect, useState } from "react";
import GuessMsg from "../components/GuessMsg";
import { UserContext } from "../contexts/userContext";
import { socket } from "../services/socket";
import { useDebounce } from "use-debounce";
import UserTyping from "../components/UserTyping";
import { GameContext } from "../contexts/gameContext";
import Modal from "../modal/Modal";
import GameEndModal from "../modal/GameEndModal";
import OnlineStatus from "../components/OnlineStatus";
import GameCounter from "../components/GameCounter";
import useOnlineStatus from "../customHooks/useOnlineStatus";
import PlayerLeftModal from "../modal/PlayerLeftModal";

type PlayerLeftType = { user: { name: string; room: string; id: string } };

export default function GamePage() {
  const { currentUser } = useContext(UserContext);
  const { gameData, foundPlayer, gameEnded } = useContext(GameContext);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [value] = useDebounce(userGuess, 500);
  const { isOnline } = useOnlineStatus();
  const [playerLeft, setPlayerLeft] = useState<null | PlayerLeftType>(null);

  const handelPlyerLeft = (player: PlayerLeftType) => {
    setPlayerLeft(player);
  };

  useEffect(() => {
    socket.on("player_left", handelPlyerLeft);
    return () => {
      socket.off("player_left", handelPlyerLeft);
    };
  }, []);

  useEffect(() => {
    socket.emit("user_active_status", { user: currentUser, status: isOnline });
  }, [isOnline]);

  useEffect(() => {
    if (value) socket.emit("user_typing", currentUser);
  }, [value]);

  const handelGuessSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUserGuess("");
    socket.emit("user_guess", {
      user: currentUser?.name,
      room: currentUser?.room,
      guess: userGuess,
      id: currentUser?.id,
    });
  };

  return (
    <>
      <div className="game transition  text-black font-Bungee mx-auto max-w-2xl  dark:bg-secondary dark:text-primary">
        <div className="wrap ">
          <div className="header fixed left-0 right-0 mx-auto dark:bg-light-grey  max-w-2xl z-20 shadow-md  ">
            <div className="defination text-center italic">
              <p className=" dark:bg-primary tracking-wide  rounded-md  dark:text-black">
                {gameData?.defination}
              </p>
            </div>
            <div className="my-2">
              <div className="details flex items-center justify-between">
                <div className="current-user flex-1 text-center">
                  <div className=" capitalize">You</div>
                </div>
                <div className="counter-wrap flex-1 flex items-center justify-center">
                  <GameCounter />
                </div>
                <div className="opponent text-center flex-1 capitalize">
                  {foundPlayer?.name}
                  <OnlineStatus isOnline={foundPlayer?.isActive || false} />
                </div>
              </div>
            </div>
            <div className="wrap-word flex items-end dark:bg-light-black  pb-2 h-14  justify-items-center justify-around">
              {gameData?.secretWord.map((word, i) => (
                <div
                  key={i}
                  className=" w-10 font-bold border-b-2 dark:text-white dark:border-white text-center text-xl "
                >
                  {word === "X" ? (
                    <i className="fa-solid fa-question"></i>
                  ) : (
                    word
                  )}
                </div>
              ))}
            </div>
          </div>
          <main className="guesses pt-44 pb-12 min-h-[800px]  dark:bg-bg-secondary  scroll-smooth   overflow-y-auto ">
            {gameData?.userGuesses.map((g, i) => (
              <GuessMsg user={g} key={i} />
            ))}
            {gameData?.typing && (
              <UserTyping user={{ name: gameData?.typing?.name }} />
            )}
          </main>
          <form
            className="send-guess w-full flex fixed z-10 bottom-0 max-w-2xl  "
            onSubmit={handelGuessSubmit}
          >
            <input
              type="text"
              name="user_guess"
              id="user_guess"
              required
              value={userGuess || ""}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Your guess . . ."
              className="px-4 w-4/5 outline-none  py-3 shadow-md dark:bg-light-grey"
            />

            <button
              className="btn w-1/5  border-0 dark:bg-btn-blue px-4 py-3 disabled:bg-ligh-black  shadow-md"
              type="submit"
              disabled={!userGuess}
            >
              <i className="fa-regular fa-paper-plane text-xl text-black dark:text-white"></i>
            </button>
          </form>
        </div>
      </div>
      <Modal visible={Boolean(gameEnded)}>
        <GameEndModal />
      </Modal>
      <Modal visible={Boolean(playerLeft?.user.name)}>
        <PlayerLeftModal player={playerLeft} />
      </Modal>
    </>
  );
}
