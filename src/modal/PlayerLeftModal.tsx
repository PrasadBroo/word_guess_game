import classNames from "classnames";
import { Link } from "react-router-dom";

type PlayerLeftType = { user: { name: string; room: string; id: string } };

type Props = {
  player: PlayerLeftType | null;
};

export default function PlayerLeftModal(props: Props) {
  const modal_classnames = classNames(
    "max-w-sm  w-4/5 dark:bg-white p-3 rounded "
  );

  return (
    <div className={modal_classnames}>
      <div className="heading text-center">
        <span className="capitalize underline">{props.player?.user.name}</span> has left the game :(
      </div>
      <div className="options flex items-center">
        <Link
          to="/landing"
          replace={true}
          className=" py-2 px-3 mt-4 rounded bg-btn-blue text-white  mx-auto"
        >
          <i className="fa-solid fa-bars mr-4"></i>Menu
        </Link>
      </div>
    </div>
  );
}
