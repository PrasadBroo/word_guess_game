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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageLayout />,
    children: [
      {
        path: "/",
        element: <Landingpage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/loading",
    element: <LoadingPage />,
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

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => console.log("connected!"));

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        alert("Player left");
      }
    });
    return () => {
      socket.connected && socket.disconnect();
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
