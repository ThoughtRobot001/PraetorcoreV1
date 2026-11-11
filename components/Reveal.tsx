'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  style,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26.4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
