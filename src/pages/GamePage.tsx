import React, { useContext, useEffect, useState } from "react";
import GuessMsg from "../components/GuessMsg";
import { UserContext } from "../contexts/userContext";
import { socket } from "../services/socket";
import useWindowUnloadEffect from "../customHooks/useWindowReload";

interface word {
  word: string | null;
  defination: string | null;
}
interface guess {
  username: string;
  guess: string;
}
interface StartGameType {
  data: {
    word: string;
    defination: string;
  };
}

interface UserGuessType {
  data: guess;
}

export default function GamePage() {
  const { currentUser } = useContext(UserContext);
  const [word, setWord] = useState<word>({ word: "ABCD", defination: null });
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [guess, setGuess] = useState<guess[]>([]);

  const handelStartGame = (data: StartGameType) => {
    setWord({ word: data.data.word, defination: data.data.defination });
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
    socket.emit("user_guess", {
      user: currentUser?.name,
      room: "room_1",
      guess: userGuess,
    });
  };

  return (
    <div className="game p-4">
      <div className="wrap w-4/5 mx-auto">
        <div className="header  border  shadow-md  ">
          <div className="defination text-center italic">
            <p>{word.defination}</p>
          </div>
          <div className="wrap-word flex items-end  pb-2 h-14  justify-items-center justify-around">
            {word.word &&
              word.word
                .split("")
                .map((w, i) => (
                  <div key={i} className="h-1 w-10  bg-black"></div>
                ))}
          </div>
        </div>
        <div className="guesses   p-4 mt-4 h-[300px] border overflow-y-scroll  shadow-md">
          {guess.map((g, i) => (
            <GuessMsg
              guessMsg={g.guess}
              user={{ username: g.username }}
              key={i}
            />
          ))}
        </div>
        <div className="send-guess mt-4  flex items-center justify-between">
          <div className="msg ">
            <input
              type="text"
              name="user_guess"
              id="user_guess"
              required
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Your guess . . ."
              className="px-4 py-2 border shadow-md"
            />
          </div>
          <div className="submit-btn">
            <button
              className="btn px-4 py-2 border shadow-md"
              onClick={handelGuessSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
