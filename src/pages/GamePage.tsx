import React, { useContext, useEffect, useState } from "react";
import GuessMsg from "../components/GuessMsg";
import { UserContext } from "../contexts/userContext";
import { socket } from "../services/socket";
import useWindowUnloadEffect from "../customHooks/useWindowReload";

type Defination = string | null;
interface guess {
  name: string;
  guess: string;
}
interface StartGameType {
  defination: string;
  secret_word_length: number;
}

interface UserGuessType {
  data: guess;
}

export default function GamePage() {
  const { currentUser } = useContext(UserContext);
  const [defination, setDefination] = useState<Defination>(null);
  const [secretWordLength, setSecretWordLength] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [guess, setGuess] = useState<guess[]>([]);

  const handelStartGame = (data: StartGameType) => {
    setDefination(data.defination);
    setSecretWordLength(data.secret_word_length);
  };
  const handelUserGuess = (data: UserGuessType) => {
    setGuess((prevGuesses) => [...prevGuesses, data.data]);
  };

  useEffect(() => {
    socket.on("start_game", handelStartGame);
    socket.on("user_guess", handelUserGuess);

    return () => {
      socket.off("start_game", handelStartGame);
      socket.off("user_guess", handelUserGuess);
    };
  }, []);

  const handelGuessSubmit = (e: React.SyntheticEvent) => {
    setUserGuess("");
    socket.emit("user_guess", {
      user: currentUser?.name,
      room: currentUser?.room,
      guess: userGuess,
    });
  };

  return (
    <div className="game h-screen mx-auto max-w-xl p-4 dark:bg-secondary dark:text-primary">
      <div className="wrap w-4/5 mx-auto">
        <div className="header    shadow-md  ">
          <div className="defination text-center italic">
            <p className=" dark:bg-primary tracking-wide  rounded-md text-white dark:text-black">
              {defination}
            </p>
          </div>
          <div className="wrap-word flex items-end dark:bg-light-grey  pb-2 h-14  justify-items-center justify-around">
            {Array(secretWordLength)
              .fill("X")
              .map((w, i) => (
                <div
                  key={i}
                  className=" w-10 font-bold border-b-2 dark:text-white dark:border-white text-center text-xl "
                >
                  {w}
                </div>
              ))}
          </div>
        </div>
        <main className="guesses  dark:bg-bg-secondary scroll-smooth  h-[500px] overflow-y-scroll  shadow-md">
          {guess.map((g, i) => (
            <GuessMsg guessMsg={g.guess} user={{ name: g.name }} key={i} />
          ))}
        </main>
        <div className="send-guess  w-full ">
          <input
            type="text"
            name="user_guess"
            id="user_guess"
            required
            value={userGuess || ""}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Your guess . . ."
            className="px-4 outline-none py-3  w-4/5 shadow-md dark:bg-light-grey"
          />

          <button
            className="btn w-1/5 border-0 dark:bg-btn-blue px-4 py-3 disabled:opacity-50  shadow-md"
            onClick={handelGuessSubmit}
            disabled={!userGuess}
          >
            <i className="fa-regular fa-paper-plane text-xl text-black dark:text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
