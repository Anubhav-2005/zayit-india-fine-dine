"use client";

import { m, useReducedMotion } from "framer-motion";

import { MotionProvider } from "@/components/motion/motion-provider";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component =
    as === "section" ? m.section : as === "article" ? m.article : m.div;

  return (
    <MotionProvider>
      <Component
        className={cn(className)}
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 0.72,
          delay,
          ease: [0.22, 0.72, 0.22, 1],
        }}
      >
        {children}
      </Component>
    </MotionProvider>
  );
}
