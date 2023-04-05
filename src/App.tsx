import { useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import useWindowUnloadEffect from "./customHooks/useWindowReload";
import GamePage from "./pages/GamePage";

import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import { socket } from "./services/socket";
import HomepageLayout from "./layouts/HomepageLayout";
import Landingpage from "./pages/Landingpage";
import CreateRoom from "./pages/CreateRoomPage";
import JoinRoom from "./pages/JoinRoom";
import JoinRandomRoompage from "./pages/JoinRandomRoompage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "createroom",
        element: <CreateRoom />,
      },
      {
        path: "loading",
        element: <LoadingPage />,
      },
      {
        path: "joinroom",
        element: <JoinRoom />,
      },
      {
        path: "landing",
        element: <Landingpage />,
      },
      {
        path: "random",
        element: <JoinRandomRoompage />,
      },
    ],
  },
  {
    path: "/game",
    element: <GamePage />,
  },
]);

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

  return <RouterProvider router={router} />;
}

export default App;
