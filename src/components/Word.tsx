import { motion } from "framer-motion";

export default function Word({ word }: { word: string }) {
  return (
    <motion.div
      className="word bolder"
      animate={{ y: ["0%", "-40%"] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {word}
    </motion.div>
  );
}
