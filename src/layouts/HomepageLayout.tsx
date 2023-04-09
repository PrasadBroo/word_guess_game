import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { GameContext } from "../contexts/gameContext";

export default function HomepageLayout() {
  const { onlinePlayersCount } = useContext(GameContext);
  return (
    <div className="transition max-w-2xl mx-auto dark:text-white dark:bg-secondary  font-Bungee  h-screen flex items-center justify-center">
      <div className="online-users flex items-center dark:bg-primary dark:text-black justify-center fixed left-8 top-8 bg-secondary text-white py-2 px-4 rounded">
        <div className="circle h-3 w-3 animate-pulse bg-white  rounded-full dark:bg-green-400 mr-4"></div>
        <p className=" font-bold">{onlinePlayersCount}</p>
      </div>
      <Outlet />
    </div>
  );
}
