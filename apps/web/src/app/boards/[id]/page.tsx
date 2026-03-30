'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBoard, saveBoard, deleteBoard, generateId, formatDate, type Board, type BoardItem } from '../../../lib/data';

export default function BoardDetail({ params }: { params: { id: string } }) {
  const [board, setBoard] = useState<Board | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { setBoard(getBoard(params.id)); }, [params.id]);

  if (!board) return <div style={{ padding: 60, textAlign: 'center', color: 'var(--ios-label3)' }}>Board not found</div>;

  const addItem = (type: 'color' | 'note' | 'image') => {
    const item: BoardItem = {
      id: generateId(), type,
      content: type === 'color' ? '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0') : type === 'note' ? 'New note' : `https://picsum.photos/seed/${Date.now()}/250/180`,
      x: 40 + Math.random() * 300, y: 200 + Math.random() * 200,
      width: type === 'note' ? 250 : 140, height: type === 'note' ? 90 : type === 'image' ? 120 : 140,
      label: '', bg: type === 'note' ? '#FFF9C4' : undefined,
    };
    const updated = { ...board, items: [...board.items, item] };
    setBoard(updated);
    saveBoard(updated);
  };

  const removeItem = (itemId: string) => {
    const updated = { ...board, items: board.items.filter(i => i.id !== itemId) };
    setBoard(updated);
    saveBoard(updated);
  };

  const copyHex = (hex: string, itemId: string) => {
    navigator.clipboard?.writeText(hex);
    setCopied(itemId);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <Link href="/boards" style={{ fontSize: 14, color: 'var(--ios-blue)' }}>← Boards</Link>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>{board.title}</h1>
            <p style={{ fontSize: 14, color: 'var(--ios-label3)' }}>{board.description} &middot; Updated {formatDate(board.updatedAt)}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => addItem('color')} style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'var(--ios-blue)', color: '#fff' }}>+ Color</button>
            <button onClick={() => addItem('note')} style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'var(--ios-orange)', color: '#fff' }}>+ Note</button>
            <button onClick={() => addItem('image')} style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'var(--ios-green)', color: '#fff' }}>+ Image</button>
          </div>
        </div>

        <div style={{ borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', padding: 24, minHeight: 500, position: 'relative' }}>
          {board.items.map(item => (
            <div key={item.id} style={{
              position: 'relative', display: 'inline-block', margin: 8, borderRadius: 12,
              overflow: 'hidden', verticalAlign: 'top',
            }}>
              {item.type === 'color' ? (
                <div onClick={() => copyHex(item.content, item.id)} style={{ width: item.width, height: item.height, background: item.content, borderRadius: 12, cursor: 'pointer', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{item.label || item.content}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{item.content} {copied === item.id ? '✓ Copied!' : ''}</div>
                  </div>
                </div>
              ) : item.type === 'note' ? (
                <div style={{ width: item.width, minHeight: item.height, background: item.bg || '#FFF9C4', borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 14, color: 'var(--ios-label)', lineHeight: 1.4 }}>{item.content}</div>
                </div>
              ) : (
                <div style={{ width: item.width, height: item.height, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.content} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {item.label && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 10px', background: 'rgba(0,0,0,0.4)', fontSize: 12, color: '#fff' }}>{item.label}</div>}
                </div>
              )}
              <button onClick={() => removeItem(item.id)} style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          ))}
          {board.items.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: 'var(--ios-label3)' }}>No items yet. Add colors, notes, or images!</div>}
        </div>
      </div>
    </div>
  );
}
