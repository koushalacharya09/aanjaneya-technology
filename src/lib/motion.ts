import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealTransition: Transition = {
  duration: 0.6,
  ease: easeOutExpo,
};

export const hoverTransition: Transition = {
  duration: 0.2,
  ease: easeOutExpo,
};

export const fadeUp: Variants = {
  // Keep a readable floor so content never stays fully invisible if IO misses
  hidden: { opacity: 0.2, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: revealTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const heroLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const underlineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.55, ease: easeOutExpo, delay: 0.15 },
  },
};

export const megaMenuPanel: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: easeOutExpo },
  },
};

export const drawerPanel: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: easeOutExpo },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: easeOutExpo },
  },
};

export const viewportOnce = {
  once: true,
  // Low amount so tall editorial lists still trigger when only the top is visible
  amount: 0.05,
  margin: "0px 0px -8% 0px" as const,
};
