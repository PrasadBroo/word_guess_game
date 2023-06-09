import classNames from "classnames";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  user: {
    name: string;
  };
};

const variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function UserTyping({ user }: Props) {
  const { currentUser } = useContext(UserContext);
  const msg_class = classNames(
    "guess font-Bungee p-2 text-center mb-1 flex items-center",
    {
      "flex-row-reverse ": currentUser?.name === user.name,
    }
  );
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={msg_class}
    >
      <span className="username h-10 w-10 flex font-bold items-center  justify-center bg-btn-blue rounded-full p-2 text-white ">
        {user?.name && user.name[0].toLocaleUpperCase()}
      </span>
      <p className="user-guess mx-2 dark:bg-primary py-2 dark:text-secondary px-3  rounded-xl">
        <PulseLoader color="#38388f" size={10} speedMultiplier={0.5} loading />
      </p>
    </motion.div>
  );
}
