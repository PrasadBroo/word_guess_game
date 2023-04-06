import { Outlet } from "react-router-dom";
export default function GamepageLayout() {
  return (
    <div className="gamepage">
      <Outlet />
    </div>
  );
}
