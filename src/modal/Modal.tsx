import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  visible: boolean;
};

const Modal: React.FC<Props> = (props) => {
  const modal_cn = classNames(
    "modal font-Bungee fixed top-0 left-0 right-0 bottom-0 dark:bg-btn-blue dark:bg-opacity-30 max-w-2xl mx-auto z-50 flex items-center justify-center",
    props.className
  );
  return (
    <AnimatePresence>
      {props.visible && (
        <motion.div
          variants={varinats}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={modal_cn}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
