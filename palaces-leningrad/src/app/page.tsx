import { HeroSection } from '@/components/HeroSection';
import { HistoricalIntro } from '@/components/HistoricalIntro';
import { PalaceGrid } from '@/components/PalaceGrid';
import { Footer } from '@/components/Footer';
import { palaces } from '@/data/palaces';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HistoricalIntro />
      <PalaceGrid palaces={palaces} />
      <Footer />
    </main>
  );
}
