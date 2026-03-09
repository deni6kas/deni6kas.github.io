'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useParams } from 'next/navigation';
import { palaces } from '@/data/palaces';
import { BackToGallery } from '@/components/BackToGallery';
import { RevealBlock } from '@/components/RevealBlock';
import { RevealText } from '@/components/RevealText';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Building2, X } from 'lucide-react';

export default function PalaceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const palace = palaces.find((p) => p.slug === slug);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIdx]);

  if (!palace) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal/70">Объект не найден</p>
      </div>
    );
  }

  // Равномерное распределение текста: делим description по предложениям пополам
  const sentences = palace.description
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);
  const mid = Math.ceil(sentences.length / 2);
  const firstPart = sentences.slice(0, mid).join(' ');
  const secondPart = (
    sentences.slice(mid).join(' ') +
    ` Архитектор ${palace.architect} создал этот памятник в ${palace.year}.`
  ).trim();

  const zigzagSections = [
    { text: firstPart, imageIdx: 0, reverse: false },
    { text: secondPart, imageIdx: 1, reverse: true },
  ];

  return (
    <main>
      {/* Media block */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src={palace.image}
            alt={palace.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <BackToGallery />
            <RevealBlock delay={0.2}>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mt-6 mb-4">
                {palace.name}
              </h1>
            </RevealBlock>
            <RevealBlock delay={0.3}>
              <div className="flex flex-wrap gap-6 text-sand/90 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {palace.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {palace.year}
                </span>
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {palace.architect}
                </span>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Zigzag layout */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {zigzagSections.map((section, i) => {
            const img = palace.images[section.imageIdx] ?? palace.images[0];
            if (!img) return null;
            return (
              <RevealBlock key={i} delay={0.1} direction="up">
                <div
                  className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
                    section.reverse ? 'md:grid-flow-dense' : ''
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                      section.reverse ? 'md:col-start-2' : ''
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <ImageWithFallback
                        src={img.url}
                        alt={`${palace.name} — ${img.period}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-charcoal/70 text-sand/90 text-sm">
                      {img.period}
                    </div>
                  </div>
                  <div className={section.reverse ? 'md:col-start-1 md:row-start-1' : ''}>
                    <RevealText
                      text={section.text}
                      as="p"
                      className="text-charcoal/90 text-lg md:text-xl leading-[1.9]"
                    />
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </section>

      {/* Gallery by period */}
      <section className="py-16 px-6 bg-sand/30">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-12">
              Визуальная история
            </h2>
          </RevealBlock>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {palace.images.map((img, i) => (
              <RevealBlock key={i} delay={i * 0.05}>
                <motion.button
                  type="button"
                  className="relative aspect-[3/4] rounded-lg overflow-hidden w-full text-left cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => setLightboxIdx(i)}
                >
                  <ImageWithFallback
                    src={img.url}
                    alt={`${palace.name} — ${img.period}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white text-sm font-medium">{img.period}</span>
                  </div>
                </motion.button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            data-lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 md:p-8"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-sand/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={palace.images[lightboxIdx].url}
                alt={`${palace.name} — ${palace.images[lightboxIdx].period}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/90 to-transparent">
                <span className="text-white text-lg font-medium">
                  {palace.images[lightboxIdx].period}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related objects */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-12">
              Другие объекты
            </h2>
          </RevealBlock>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {palaces
              .filter((p) => p.id !== palace.id)
              .slice(0, 4)
              .map((p, i) => (
                <RevealBlock key={p.id} delay={i * 0.05}>
                  <Link
                    href={`/palace/${p.slug}`}
                    className="block group"
                    data-cursor-hover
                  >
                    <motion.div
                      className="relative aspect-[3/4] rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="text-white text-sm font-medium group-hover:text-brass transition-colors">
                          {p.name}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </RevealBlock>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealBlock>
            <p className="text-charcoal/80 text-lg mb-8">
              Исследуйте другие объекты архитектурного наследия Ленинградской области
            </p>
            <BackToGallery />
          </RevealBlock>
        </div>
      </section>
    </main>
  );
}
