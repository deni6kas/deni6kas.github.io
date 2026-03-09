'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3';
  delay?: number;
  wordByWord?: boolean;
}

export function RevealText({
  text,
  className = '',
  as: Component = 'p',
  delay = 0,
  wordByWord = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (wordByWord) {
    const words = text.split(' ');
    return (
      <Component className={className}>
        <span ref={ref} className="inline-block">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.5,
                delay: delay + i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      </Component>
    );
  }

  return (
    <Component className={className}>
      <span ref={ref}>
        <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 30 }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="block"
      >
        {text}
      </motion.span>
      </span>
    </Component>
  );
}
