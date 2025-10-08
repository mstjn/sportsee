import { motion } from "framer-motion";
import { MOTION_VARIANTS } from "../constants/MOTION_VARIANTS";

export default function PageMotion({ children }) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial="initial"
      animate="in"
      exit="out"
      variants={MOTION_VARIANTS}
      transition={MOTION_VARIANTS.transition}
    >
      {children}
    </motion.div>
  );
}
