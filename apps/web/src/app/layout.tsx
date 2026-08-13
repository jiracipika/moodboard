import type { Metadata } from 'next';
import './globals.css';
import AppTransitionShell from '@/components/app-transition-shell';

export const metadata: Metadata = {
  title: 'Moodboard — Visual Inspiration Collector',
  description: 'Collect colors, typography, photos, and design references. Generate CSS and Tailwind tokens from any palette.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', background: 'var(--ios-bg)', color: 'var(--ios-label)', transition: 'background 0.3s, color 0.3s' }}>
          <AppTransitionShell>{children}</AppTransitionShell>
        </div>
      </body>
    </html>
  );
}
