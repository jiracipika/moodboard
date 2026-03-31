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
            padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 600,
            background: 'var(--ios-blue)', color: '#fff',
            boxShadow: '0 2px 8px rgba(0,122,255,0.25)',
          }}>+ New Board</Link>
        </div>

        <input type="text" placeholder="Search boards..." value={search} onChange={e => setSearch(e.target.value)} style={{
          width: '100%', padding: '14px 18px', borderRadius: 14, border: 'none',
          fontSize: 15, background: 'var(--ios-bg2)', color: 'var(--ios-label)', marginBottom: 24, outline: 'none',
          boxShadow: 'var(--ios-shadow)',
          transition: 'box-shadow 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {filtered.map(board => (
            <Link key={board.id} href={`/boards/${board.id}`} className="ios-card" style={{ borderRadius: 20, overflow: 'hidden', background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', display: 'block' }}>
              <div style={{ height: 140, background: board.coverGradient, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '4px 10px', borderRadius: 8, fontSize: 11, color: '#fff', fontWeight: 500 }}>
                  {board.items.length} items
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 650, color: 'var(--ios-label)', marginBottom: 4, letterSpacing: '-0.2px' }}>{board.title}</div>
                <div style={{ fontSize: 13, color: 'var(--ios-label3)', marginBottom: 8, lineHeight: 1.4 }}>{board.description}</div>
                <div style={{ fontSize: 12, color: 'var(--ios-label4)' }}>Updated {formatDate(board.updatedAt)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
