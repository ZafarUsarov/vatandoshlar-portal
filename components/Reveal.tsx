"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 32,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const shouldReduceMotion = useReducedMotion();

  const transition: Transition = {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1],
  };

  if (shouldReduceMotion) {
    return (
      <div ref={elementRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={{
        opacity: 0,
        y: distance,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: distance,
            }
      }
      transition={transition}
    >
      {children}
    </motion.div>
  );
}