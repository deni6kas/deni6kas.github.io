'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function BackToGallery() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 text-brass hover:text-charcoal transition-colors duration-300 py-2"
      data-cursor-hover
    >
      <motion.span
        className="inline-flex"
        whileHover={{ x: -4 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
      </motion.span>
      <span className="text-sm uppercase tracking-widest">Назад в галерею</span>
    </Link>
  );
}
