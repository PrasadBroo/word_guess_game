import React, { createContext, useState } from "react";

interface User {
  name: string;
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

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
