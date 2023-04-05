import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../services/socket";
import { UserContext } from "./userContext";

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
  foundPlayer: boolean | FounPlayerType;
  gameData: null | GameDataType;
}

interface Props {
  children: React.ReactNode;
}

export const GameContext = createContext<GameContextType>({
  onlinePlayersCount: 0,
  foundPlayer: false,
  gameData: null,
});

export const GameDataProvider: React.FC<Props> = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [onlinePlayersCount, setOnlinePlayersCount] = useState(0);
  const [foundPlayer, setFoundPlayer] = useState<boolean>(false);
  const [gameData, setGameData] = useState<GameDataType>({
    counter: 120,
    defination: "",
    secretWordLength: 0,
    userGuesses: [],
    typing: null,
  });
  const [defination, setDefination] = useState<string | null>(null);
  const [secretWordLength, setSecretWordLength] = useState<number>(0);
  const [counter, setCounter] = useState<number>(120);
  const [userGuesses, setUserGuesses] = useState<GuessType[]>([]);
  const [typing, setTyping] = useState<{ name: string } | null>(null);

  const handleFoundPlayer = (data: {
    name: string;
    id: string;
    room: string;
  }) => {
    setFoundPlayer(true);
    setCurrentUser({
      room: data.room,
      name: currentUser?.name,
      id: currentUser?.id,
    });
    document.title = `You vs ${data.name}`;
  };

  const handelStartGame = (data: StartGameType) => {
    setGameData({
      ...gameData,
      defination: data.defination,
      secretWordLength: data.secret_word_length,
    });
  };

  const handelUserGuess = (data: UserGuessType) => {
    setGameData({
      ...gameData,
      typing: null,
      userGuesses: [...gameData.userGuesses, data.user],
    });
  };

  const handelDecrementCounter = (data: number) => {
    setGameData({ ...gameData, counter: data });
  };

  const handelUserTyping = (data: UserGuessType) => {
    setGameData({ ...gameData, typing: { name: data.user.name } });
    setTimeout(() => {
      setGameData({ ...gameData, typing: null });
    }, 3000);
  };

  const handelEndGame = () => {
    // navigate("/");
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
