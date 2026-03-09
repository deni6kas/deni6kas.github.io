import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { CustomCursor } from '@/components/CustomCursor';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Архитектурное наследие Ленинградской области | Цифровая экскурсия',
  description:
    'Историческая ретроспектива дворцово-парковых ансамблей и фортификационных сооружений: Павловск, Ораниенбаум, Выборгский замок, Гатчина и другие памятники.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-cloud-dancer text-charcoal">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
