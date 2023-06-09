import React, { createContext, useEffect, useState } from "react";
import { socket } from "../services/socket";

interface User {
  name: string | undefined;
  room?: string;
  id?: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    socket.auth = { ...currentUser };
  }, [currentUser?.name]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
