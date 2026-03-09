'use client';

import Link from 'next/link';
import { ImageWithFallback } from './ImageWithFallback';
import { motion } from 'framer-motion';
import { type Palace } from '@/data/palaces';

const gridLayouts = [
  'col-span-1 row-span-2 md:row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2 md:row-span-2',
  'col-span-1 md:col-span-2 row-span-1',
];

function getGridClass(index: number) {
  return gridLayouts[index % gridLayouts.length] || 'col-span-1 row-span-1';
}

interface PalaceCardProps {
  palace: Palace;
  index: number;
}

function PalaceCard({ palace, index }: PalaceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={getGridClass(index)}
    >
      <Link
        href={`/palace/${palace.slug}`}
        className="group block h-full min-h-[280px] overflow-hidden rounded-lg relative"
        data-cursor-hover
      >
        <div className="relative h-full w-full">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ImageWithFallback
              src={palace.image}
              alt={palace.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 className="font-serif text-xl md:text-2xl text-white mb-2 group-hover:text-brass transition-colors duration-300">
              {palace.name}
            </h3>
            <p className="text-sand/90 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {palace.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface PalaceGridProps {
  palaces: Palace[];
}

export function PalaceGrid({ palaces }: PalaceGridProps) {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">
            Архитектурное наследие
          </h2>
          <p className="text-charcoal/70 text-lg max-w-xl">
            15 дворцов, крепостей и усадеб Ленинградской области
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {palaces.map((palace, index) => (
            <PalaceCard key={palace.id} palace={palace} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
