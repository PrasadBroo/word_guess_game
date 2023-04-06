import { useContext, useEffect } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import useWindowUnloadEffect from "./customHooks/useWindowReload";
import GamePage from "./pages/GamePage";

import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import { socket } from "./services/socket";
import HomepageLayout from "./layouts/HomepageLayout";
import Landingpage from "./pages/Landingpage";
import CreateRoom from "./pages/CreateRoomPage";
import JoinRoom from "./pages/JoinRoompage";
import JoinRandomRoompage from "./pages/JoinRandomRoompage";
import GamepageLayout from "./layouts/GamepageLayout";


function App() {
  const { currentUser } = useContext(UserContext);

  const disconnectSocket = () => {
    socket.emit("disconnected", {
      room: "room_1",
      user: currentUser?.name || "not working",
      test: "hi",
    });
  };

  useWindowUnloadEffect(disconnectSocket, [currentUser]);

  useEffect(() => {
    document.title = currentUser?.name || "No name";
    console.log("socket id", socket.id);
  }, [currentUser?.name]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomepageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="createroom" element={<CreateRoom />} />
          <Route path="loading" element={<LoadingPage />} />
          <Route path="joinroom" element={<JoinRoom />} />
          <Route path="landing" element={<Landingpage />} />
          <Route path="random" element={<JoinRandomRoompage />} />
          <Route path="landing" element={<Landingpage />} />
        </Route>
        <Route path="/game" element={<GamepageLayout />}>
          <Route index element={<GamePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
