import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";

interface UserType {
  name: string | undefined;
  room?: string;
  id?: string;
}

type FounPlayerType = {
  name: string;
  room: string;
  id: string;
};
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

type GameDataType = {
  defination: string;
  secretWordLength: number;
  counter: number;
  userGuesses: GuessType[];
  typing: null | { name: string };
};
interface GameContextType {
  onlinePlayersCount: number;
  foundPlayer: null | FounPlayerType;
  gameData: null | GameDataType;
  gameEnded: null | GameEndedType;
}

interface Props {
  children: React.ReactNode;
}

type GameEndedType = {
  stats: number;
  word?: string;
  winners?: string[];
};

export const GameContext = createContext<GameContextType>({
  onlinePlayersCount: 0,
  foundPlayer: null,
  gameData: null,
  gameEnded: null,
});

export const GameDataProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [onlinePlayersCount, setOnlinePlayersCount] = useState(0);
  const [foundPlayer, setFoundPlayer] = useState<null | FounPlayerType>(null);
  const [gameData, setGameData] = useState<GameDataType>({
    counter: 120,
    defination: "",
    secretWordLength: 0,
    userGuesses: [],
    typing: null,
  });
  const [gameEnded, setGameEnded] = useState<null | GameEndedType>(null);

  const handleFoundPlayer = (data: {
    name: string;
    id: string;
    room: string;
  }) => {
    setFoundPlayer({ name: data.name, room: data.room, id: data.id });
    setCurrentUser((prevState: UserType) => ({
      ...prevState,
      room: data.room,
    }));
    document.title = `You vs ${data.name}`;
    navigate("/game");
  };

  const handelStartGame = (data: StartGameType) => {
    setGameData((prevState) => ({
      ...prevState,
      defination: data.defination,
      secretWordLength: data.secret_word_length,
    }));
  };

  const handelUserGuess = (data: UserGuessType) => {
    setGameData((prevState) => ({
      ...prevState,
      typing: null,
      userGuesses: [...prevState.userGuesses, data.user],
    }));
  };

  const handelDecrementCounter = (data: number) => {
    setGameData((prevState) => ({ ...prevState, counter: data }));
  };

  const handelUserTyping = (data: UserGuessType) => {
    setGameData((prevState) => ({
      ...prevState,
      typing: { name: data.user.name },
    }));
    setTimeout(() => {
      setGameData((prevState) => ({ ...prevState, typing: null }));
    }, 3000);
  };

  const handelEndGame = (data: { word: string; winners: string[] }) => {
    console.log(currentUser);
    setGameEnded({
      stats: 0,
      winners: data.winners,
      word: data.word,
    });
  };

  useEffect(() => {
    if (!socket.connected) socket.connect();
    () => {
      socket.off("join_room");
    };
  }, []);

  //   homepage user effect
  useEffect(() => {
    socket.on("players_count", (data: number) => {
      setOnlinePlayersCount(data);
    });
  }, []);

  useEffect(() => {
    socket.on("found-player", handleFoundPlayer);
    () => {
      socket.off("found-player", handleFoundPlayer);
    };
  }, []);

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

  return (
    <GameContext.Provider
      value={{
        foundPlayer,
        gameData,
        onlinePlayersCount,
        gameEnded,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
