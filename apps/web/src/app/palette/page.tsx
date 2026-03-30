'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPalettes, formatDate, type Palette } from '../../lib/data';

export default function Palettes() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { setPalettes(getPalettes()); }, []);

  const filtered = search
    ? palettes.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase())))
    : palettes;

  const copyHex = (hex: string, colorId: string) => {
    navigator.clipboard?.writeText(hex);
    setCopied(colorId);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 16px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <Link href="/" style={{ fontSize: 14, color: 'var(--ios-blue)', marginBottom: 8, display: 'inline-block' }}>Back</Link>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>Color Palettes</h1>
            <p style={{ fontSize: 15, color: 'var(--ios-label3)' }}>{filtered.length} palettes</p>
          </div>
        </div>

        <input type="text" placeholder="Search palettes..." value={search} onChange={e => setSearch(e.target.value)} style={{
          width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--ios-separator)',
          fontSize: 15, background: 'var(--ios-bg2)', color: 'var(--ios-label)', marginBottom: 24, outline: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map(pal => (
            <div key={pal.id} style={{ borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', overflow: 'hidden' }}>
              <Link href={`/palette/${pal.id}`}>
                <div style={{ display: 'flex', height: 80 }}>
                  {pal.colors.map(c => (
                    <div key={c.id} style={{ flex: 1, background: c.hex }} />
                  ))}
                </div>
              </Link>
              <div style={{ padding: 14 }}>
                <Link href={`/palette/${pal.id}`} style={{ fontSize: 16, fontWeight: 600, color: 'var(--ios-label)', display: 'block', marginBottom: 6 }}>{pal.title}</Link>
                <p style={{ fontSize: 13, color: 'var(--ios-label3)', marginBottom: 10, lineHeight: 1.3 }}>{pal.description}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {pal.colors.map(c => (
                    <div key={c.id} onClick={() => copyHex(c.hex, c.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'var(--ios-bg)', cursor: 'pointer', fontSize: 11 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: c.hex, border: '1px solid var(--ios-separator)' }} />
                      <span style={{ fontFamily: 'monospace', color: 'var(--ios-label2)' }}>{copied === c.id ? '✓' : c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
