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
  isActive: boolean;
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
  secretWord: string[];
  userGuesses: GuessType[];
  typing: null | { name: string };
};
interface GameContextType {
  onlinePlayersCount: number;
  foundPlayer: null | FounPlayerType;
  gameData: null | GameDataType;
  gameEnded: null | GameEndedType;
  clearGameData: () => void;
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
  clearGameData: () => {},
});

export const GameDataProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [onlinePlayersCount, setOnlinePlayersCount] = useState(0);
  const [foundPlayer, setFoundPlayer] = useState<null | FounPlayerType>(null);
  const [gameData, setGameData] = useState<GameDataType>({
    defination: "",
    secretWordLength: 0,
    userGuesses: [],
    typing: null,
    secretWord: [],
  });
  const [gameEnded, setGameEnded] = useState<null | GameEndedType>(null);

  const handleFoundPlayer = (data: {
    name: string;
    id: string;
    room: string;
  }) => {
    setFoundPlayer({
      name: data.name,
      room: data.room,
      id: data.id,
      isActive: true,
    });
    setCurrentUser((prevState: UserType) => ({
      ...prevState,
      room: data.room,
    }));
    document.title = `You vs ${data.name}`;
    navigate("/game");
  };

  const clearGameData = () => {
    setGameData({
      defination: "",
      secretWord: [],
      secretWordLength: 0,
      typing: null,
      userGuesses: [],
    });
  };

  const handelStartGame = (data: StartGameType) => {
    setGameEnded(null);
    setGameData((prevState) => ({
      ...prevState,
      defination: data.defination,
      secretWordLength: data.secret_word_length,
      secretWord: Array(data.secret_word_length).fill("X"),
    }));
  };

  const handelUserGuess = (data: UserGuessType) => {
    setGameData((prevState) => ({
      ...prevState,
      typing: null,
      userGuesses: [...prevState.userGuesses, data.user],
    }));
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
    setGameEnded({
      stats: 0,
      winners: data.winners,
      word: data.word,
    });
  };

  const handelLetterReveal = (data: { letter: string; index: number }) => {
    setGameData((prevState) => {
      let arr = [...prevState.secretWord];
      arr[data.index] = data.letter;

      let result = { ...prevState, secretWord: arr };
      return result;
    });
  };

  const handelUserActiveStatus = (status: boolean) => {
    setFoundPlayer((prevState) => {
      let u = {
        name: prevState?.name || "",
        room: prevState?.room || "",
        id: prevState?.id || "",
        isActive: status,
      };
      return u;
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
    socket.on("end_game", handelEndGame);
    socket.on("user_typing", handelUserTyping);
    socket.on("reveal_letter", handelLetterReveal);
    socket.on("user_active_status", handelUserActiveStatus);

    return () => {
      socket.off("start_game", handelStartGame);
      socket.off("user_guess", handelUserGuess);
      socket.off("end_game", handelEndGame);
      socket.off("user_typing", handelUserTyping);
      socket.off("user_active_status", handelUserActiveStatus);
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        foundPlayer,
        gameData,
        onlinePlayersCount,
        gameEnded,
        clearGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
