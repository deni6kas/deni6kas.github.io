'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.body.classList.add('custom-cursor-active');
      return () => document.body.classList.remove('custom-cursor-active');
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      const target = e.target as HTMLElement;
      const interactive = target?.closest('a, button, [data-cursor-hover]');
      const overLightbox = target?.closest('[data-lightbox]');
      setIsHovering(!!interactive);
      setIsLightMode(!!overLightbox);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted, isVisible]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      initial={{ opacity: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        opacity: { duration: 0.2 },
      }}
      style={{
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className={`rounded-full ${isLightMode ? 'bg-white/90' : 'bg-charcoal/30 mix-blend-difference'}`}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isLightMode ? (isHovering ? 1 : 0.85) : isHovering ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: 12,
          height: 12,
        }}
      />
    </motion.div>
  );
}
