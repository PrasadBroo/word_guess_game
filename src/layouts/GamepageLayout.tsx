import { Outlet } from "react-router-dom";
export default function GamepageLayout() {
  return (
    <div className="gamepage max-w-2xl mx-auto">
      <Outlet />
    </div>
  );
}
