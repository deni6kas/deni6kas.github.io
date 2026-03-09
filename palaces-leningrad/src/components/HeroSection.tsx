'use client';

import { useRef } from 'react';
import { palaces } from '@/data/palaces';
import { ImageWithFallback } from './ImageWithFallback';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from './RevealText';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src={palaces[0]?.image ?? 'https://picsum.photos/seed/pavlovsk/1920/1080'}
            alt="Павловский дворец"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-brass text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          Цифровая экскурсия
        </motion.p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          <RevealText text="Дворцы" as="span" className="block" />
          <RevealText text="Ленинградской" as="span" className="block" delay={0.1} />
          <RevealText text="области" as="span" className="block" delay={0.2} />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sand/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Историческая ретроспектива дворцово-парковых ансамблей и фортификационных сооружений
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-brass/60 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-brass" />
        </motion.div>
      </motion.div>
    </section>
  );
}
