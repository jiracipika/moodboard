'use client';
import { useState } from 'react';
import Link from 'next/link';
import { COMMUNITY_BOARDS, COMMUNITY_PALETTES, EXPLORE_CATEGORIES } from '../../lib/data';

export default function Explore() {
  const [category, setCategory] = useState('all');
  const [tab, setTab] = useState<'boards' | 'palettes'>('boards');

  const boards = category === 'all' ? COMMUNITY_BOARDS : COMMUNITY_BOARDS.filter(b => b.tags.some(t => t === category));
  const palettes = COMMUNITY_PALETTES;

  return (
    <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 16px 40px' }}>
        <Link href="/" style={{ fontSize: 14, color: 'var(--ios-blue)', marginBottom: 8, display: 'inline-block' }}>Back</Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 4 }}>Explore</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>Discover community boards and palettes.</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['boards', 'palettes'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: tab === t ? 'var(--ios-blue)' : 'var(--ios-bg2)', color: tab === t ? '#fff' : 'var(--ios-label2)',
            }}>{t === 'boards' ? 'Boards' : 'Palettes'}</button>
          ))}
        </div>

        {tab === 'boards' && (
          <>
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
              {EXPLORE_CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCategory(c.id)} style={{
                  padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                  background: category === c.id ? 'var(--ios-label)' : 'var(--ios-bg2)', color: category === c.id ? '#fff' : 'var(--ios-label2)',
                }}>{c.label}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {boards.map(b => (
                <div key={b.id} style={{ borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', overflow: 'hidden' }}>
                  <div style={{ height: 120, background: b.coverGradient }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ios-gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff' }}>{b.avatar}</div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ios-label2)' }}>{b.author}</span>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>❤️ {b.likes}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ios-label)', marginBottom: 4 }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ios-label3)' }}>{b.itemCount} items &middot; {b.views.toLocaleString()} views</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'palettes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {palettes.map(p => (
              <div key={p.id} style={{ borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', height: 72 }}>
                  {p.colors.map((hex, i) => <div key={i} style={{ flex: 1, background: hex }} />)}
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ios-gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff' }}>{p.avatar}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ios-label2)' }}>{p.author}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>❤️ {p.likes}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ios-label)' }}>{p.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
