import { palaces } from '@/data/palaces';
import { PalaceDetailClient } from './PalaceDetailClient';

export function generateStaticParams() {
  return palaces.map((p) => ({ slug: p.slug }));
}

export default function PalaceDetailPage() {
  return <PalaceDetailClient />;
}
