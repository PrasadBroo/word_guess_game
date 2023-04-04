import React, { useContext, useEffect, useState } from "react";
import GuessMsg from "../components/GuessMsg";
import { UserContext } from "../contexts/userContext";
import { socket } from "../services/socket";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import UserTyping from "../components/UserTyping";

type Defination = string | null;

interface GuessType {
  name: string;
  id: string;
  guess: string;
  typing: boolean;
  correct: boolean;
}
interface StartGameType {
  defination: string;
  secret_word_length: number;
  counter: number;
}

interface UserGuessType {
  user: GuessType;
}

export default function GamePage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [defination, setDefination] = useState<Defination>(null);
  const [secretWordLength, setSecretWordLength] = useState<number>(0);
  const [counter, setCounter] = useState<number>(120);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [userGuesses, setUserGuesses] = useState<GuessType[]>([]);
  const [value] = useDebounce(userGuess, 500);
  const [typing, setTyping] = useState<{ name: string } | null>(null);

  const handelStartGame = (data: StartGameType) => {
    setDefination(data.defination);
    setSecretWordLength(data.secret_word_length);
  };

  const handelUserGuess = (data: UserGuessType) => {
    setTyping(null);
    setUserGuesses((prevGuesses) => [...prevGuesses, data.user]);
  };

  const handelDecrementCounter = (data: number) => {
    setCounter(data);
  };

  const handelUserTyping = (data: UserGuessType) => {
    setTyping({ name: data.user.name });
    setTimeout(() => {
      setTyping(null);
    }, 3000);
  };

  const handelEndGame = () => {
    navigate("/");
  };

  useEffect(() => {
    if (value) socket.emit("user_typing", currentUser);
  }, [value]);

  useEffect(() => {
    socket.on("start_game", handelStartGame);
    socket.on("user_guess", handelUserGuess);
    socket.on("decrement_counter", handelDecrementCounter);
    socket.on("end_game", handelEndGame);
    socket.on("user_typing", handelUserTyping);

    return () => {
      socket.off("start_game", handelStartGame);
      socket.off("user_guess", handelUserGuess);
      socket.off("decrement_counter", handelDecrementCounter);
      socket.off("end_game", handelEndGame);
      socket.off("user_typing", handelUserTyping);
    };
  }, []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const handelGuessSubmit = (e: React.SyntheticEvent) => {
    setUserGuess("");
    socket.emit("user_guess", {
      user: currentUser?.name,
      room: currentUser?.room,
      guess: userGuess,
      id: currentUser?.id,
    });
  };

  return (
    <div className="game transition text-black font-Bungee h-screen mx-auto max-w-xl  p-4 dark:bg-secondary dark:text-primary">
      <div className="wrap w-4/5 mx-auto">
        <div className="header    shadow-md  ">
          <div className="defination text-center italic">
            <p className=" dark:bg-primary tracking-wide  rounded-md  dark:text-black">
              {defination}
            </p>
          </div>
          <div className="counter bg-btn-blue text-white h-12 w-12 my-2 mx-auto flex items-center justify-center font-bold rounded-full">
            {counter}
          </div>
          <div className="wrap-word flex items-end dark:bg-light-grey  pb-2 h-14  justify-items-center justify-around">
            {Array(secretWordLength)
              .fill("X")
              .map((word, i) => (
                <div
                  key={i}
                  className=" w-10 font-bold border-b-2 dark:text-white dark:border-white text-center text-xl "
                >
                  <i className="fa-solid fa-question"></i>
                </div>
              ))}
          </div>
        </div>
        <main className="guesses  dark:bg-bg-secondary scroll-smooth min-h-[400px] overflow-y-scroll  shadow-md">
          {userGuesses.map((g, i) => (
            <GuessMsg user={g} key={i} />
          ))}
          {typing && <UserTyping user={{ name: typing.name }} />}
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
