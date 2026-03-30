import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Moodboard — Visual Inspiration Collector',
  description: 'Collect colors, typography, photos, and design references. Generate CSS and Tailwind tokens from any palette.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
