import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { UserProvider } from "./contexts/userContext";
import { GameDataProvider } from "./contexts/gameContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <GameDataProvider>
      <App />
    </GameDataProvider>
  </UserProvider>
);
