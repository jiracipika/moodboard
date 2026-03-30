'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPalette, hexToRGB, hexToHSL, generateTints, generateShades, generateComplementary, generateAnalogous, generateTriadic, type Palette } from '../../../lib/data';

export default function PaletteDetail({ params }: { params: { id: string } }) {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { setPalette(getPalette(params.id)); }, [params.id]);

  if (!palette) return <div style={{ padding: 60, textAlign: 'center', color: 'var(--ios-label3)' }}>Palette not found</div>;

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 16px 40px' }}>
        <Link href="/palette" style={{ fontSize: 14, color: 'var(--ios-blue)', marginBottom: 8, display: 'inline-block' }}>← Palettes</Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 4 }}>{palette.title}</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>{palette.description}</p>

        {/* Color cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
          {palette.colors.map(c => {
            const [r, g, b] = hexToRGB(c.hex);
            const [h, s, l] = hexToHSL(c.hex);
            return (
              <div key={c.id} style={{ borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', overflow: 'hidden' }}>
                <div style={{ height: 100, background: c.hex }} />
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
                  <div onClick={() => copy(c.hex, `hex-${c.id}`)} style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--ios-blue)', cursor: 'pointer', marginBottom: 2 }}>
                    {c.hex} {copied === `hex-${c.id}` ? '✓' : ''}
                  </div>
                  <div onClick={() => copy(`rgb(${r}, ${g}, ${b})`, `rgb-${c.id}`)} style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ios-label3)', cursor: 'pointer', marginBottom: 2 }}>
                    rgb({r}, {g}, {b}) {copied === `rgb-${c.id}` ? '✓' : ''}
                  </div>
                  <div onClick={() => copy(`hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`, `hsl-${c.id}`)} style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ios-label3)', cursor: 'pointer' }}>
                    hsl({Math.round(h)}, {Math.round(s)}%, {Math.round(l)}%) {copied === `hsl-${c.id}` ? '✓' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tints & Shades for first color */}
        {palette.colors[0] && (() => {
          const tints = generateTints(palette.colors[0].hex);
          const shades = generateShades(palette.colors[0].hex);
          return (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Tints & Shades — {palette.colors[0].name}</h3>
              <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', height: 60, marginBottom: 8 }}>
                {[...tints.reverse(), palette.colors[0].hex, ...shades].map((hex, i) => (
                  <div key={i} style={{ flex: 1, background: hex }} />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Complementary & Analogous */}
        {palette.colors[0] && (() => {
          const comp = generateComplementary(palette.colors[0].hex);
          const analog = generateAnalogous(palette.colors[0].hex);
          const triad = generateTriadic(palette.colors[0].hex);
          return (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Color Harmonies</h3>
              {[
                { label: 'Complementary', colors: [palette.colors[0].hex, comp] },
                { label: 'Analogous', colors: [analog[0], palette.colors[0].hex, analog[1]] },
                { label: 'Triadic', colors: [palette.colors[0].hex, ...triad] },
              ].map(group => (
                <div key={group.label} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--ios-label2)' }}>{group.label}</div>
                  <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', height: 48 }}>
                    {group.colors.map((hex, i) => (
                      <div key={i} onClick={() => copy(hex, `${group.label}-${i}`)} style={{ flex: 1, background: hex, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 11, fontFamily: 'monospace', color: copied === `${group.label}-${i}` ? '#fff' : 'transparent', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{copied === `${group.label}-${i}` ? '✓ Copied' : hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
