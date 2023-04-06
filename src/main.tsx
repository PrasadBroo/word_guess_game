import ReactDOM from "react-dom/client";

import App from "./App";
import { UserProvider } from "./contexts/userContext";
import { GameDataProvider } from "./contexts/gameContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <UserProvider>
      <GameDataProvider>
        <App />
      </GameDataProvider>
    </UserProvider>
  </BrowserRouter>
);
