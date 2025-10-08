export const MOTION_VARIANTS = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  in: {
    opacity: 1,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    filter: "blur(10px)",
  },
  transition: {
    duration: 1,
    ease: "easeInOut",
  },
};
