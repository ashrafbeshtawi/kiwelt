import { Inter, JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { LangProvider } from '@/components/LangProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Datenflow — Maßgeschneiderte KI für Unternehmen',
  description: 'Datenflow — Custom AI for serious companies.',
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const saved = cookieStore.get('df-lang')?.value;
  const lang = saved === 'en' ? 'en' : 'de';

  return (
    <html lang={lang} data-accent="violet" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LangProvider initial={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
