'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBoards, formatDate, type Board } from '../../lib/data';

export default function MyBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => { setBoards(getBoards()); }, []);

  const filtered = search
    ? boards.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.includes(search.toLowerCase())))
    : boards;

  return (
    <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 16px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <Link href="/" style={{ fontSize: 14, color: 'var(--ios-blue)', marginBottom: 8, display: 'inline-block' }}>Back</Link>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>My Boards</h1>
            <p style={{ fontSize: 15, color: 'var(--ios-label3)' }}>{filtered.length} boards</p>
          </div>
          <Link href="/boards/new" style={{
            padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600,
            background: 'var(--ios-blue)', color: '#fff',
          }}>+ New Board</Link>
        </div>

        <input type="text" placeholder="Search boards..." value={search} onChange={e => setSearch(e.target.value)} style={{
          width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--ios-separator)',
          fontSize: 15, background: 'var(--ios-bg2)', color: 'var(--ios-label)', marginBottom: 24, outline: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {filtered.map(board => (
            <Link key={board.id} href={`/boards/${board.id}`} style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', display: 'block' }}>
              <div style={{ height: 140, background: board.coverGradient, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', padding: '4px 8px', borderRadius: 8, fontSize: 11, color: '#fff' }}>
                  {board.items.length} items
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ios-label)', marginBottom: 4 }}>{board.title}</div>
                <div style={{ fontSize: 13, color: 'var(--ios-label3)', marginBottom: 8, lineHeight: 1.3 }}>{board.description}</div>
                <div style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Updated {formatDate(board.updatedAt)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
