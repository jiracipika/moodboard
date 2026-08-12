'use client';
import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { saveBoard, generateId, type Board, type BoardItem } from '../../../lib/data';

export default function UploadPage() {
  const [previews, setPreviews] = useState<{ url: string; name: string; w: number; h: number }[]>([]);
  const [boardName, setBoardName] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    imageFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const maxW = 300;
        const scale = img.width > maxW ? maxW / img.width : 1;
        setPreviews(prev => [...prev, {
          url,
          name: file.name,
          w: Math.round(img.width * scale),
          h: Math.round(img.height * scale),
        }]);
      };
      img.src = url;
    });
  }, []);

  const removePreview = (idx: number) => {
    setPreviews(prev => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const createBoard = () => {
    const name = boardName.trim() || 'Uploaded Images';
    const items: BoardItem[] = previews.map((p, i) => ({
      id: generateId(),
      type: 'image' as const,
      content: p.url,
      x: 40 + (i % 4) * 160,
      y: 40 + Math.floor(i / 4) * 180,
      width: p.w > 150 ? 150 : p.w,
      height: p.w > 150 ? Math.round(p.h * (150 / p.w)) : p.h,
      label: p.name.replace(/\.[^.]+$/, ''),
    }));
    const board: Board = {
      id: generateId(),
      title: name,
      description: `${items.length} image${items.length !== 1 ? 's' : ''} uploaded`,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['upload'],
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
    saveBoard(board);
    setSavedId(board.id);
    setSaved(true);
  };

  if (saved && savedId) {
    return (
      <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 16px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--ios-label)', marginBottom: 8 }}>Board Created!</h1>
          <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>Your uploaded images are saved to a new board.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href={`/boards/${savedId}`} style={{
              padding: '12px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600,
              background: 'var(--ios-blue)', color: '#fff', textDecoration: 'none',
            }}>View Board</Link>
            <button onClick={() => { setSaved(false); setSavedId(null); setPreviews([]); setBoardName(''); }} style={{
              padding: '12px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600,
              background: 'var(--ios-bg2)', color: 'var(--ios-label)', border: '1px solid var(--ios-sep)', cursor: 'pointer',
            }}>Upload More</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--ios-bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 16px 40px' }}>
        <Link href="/" style={{ fontSize: 14, color: 'var(--ios-blue)', marginBottom: 16, display: 'inline-block' }}>← Back</Link>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--ios-label)', marginBottom: 8 }}>Upload Images</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>
          Select images to create a new moodboard. Files stay on your device.
        </p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          style={{
            padding: 48, borderRadius: 20, textAlign: 'center', cursor: 'pointer',
            background: dragOver ? 'rgba(0,122,255,0.06)' : 'var(--ios-bg2)',
            border: `2px dashed ${dragOver ? 'var(--ios-blue)' : 'var(--ios-sep)'}`,
            transition: 'all 0.2s',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ios-label)', marginBottom: 4 }}>
            Drop images here or click to browse
          </div>
          <div style={{ fontSize: 13, color: 'var(--ios-label3)' }}>
            PNG, JPG, WEBP, GIF supported
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Previews */}
        {previews.length > 0 && (
          <>
            <div style={{ marginTop: 24, marginBottom: 8, fontSize: 15, fontWeight: 600, color: 'var(--ios-label)' }}>
              {previews.length} image{previews.length !== 1 ? 's' : ''} selected
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
              {previews.map((p, i) => (
                <div key={i} style={{
                  borderRadius: 14, overflow: 'hidden', background: 'var(--ios-bg2)',
                  boxShadow: 'var(--ios-shadow)', position: 'relative',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ios-label)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ios-label3)' }}>{p.w}×{p.h}px</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removePreview(i); }}
                    aria-label={`Remove ${p.name}`}
                    style={{
                      position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%',
                      border: 'none', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 13,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >×</button>
                </div>
              ))}
            </div>

            {/* Board name + create */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={boardName}
                onChange={e => setBoardName(e.target.value)}
                placeholder="Board name (optional)"
                onKeyDown={e => { if (e.key === 'Enter') createBoard(); }}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 12, fontSize: 15,
                  border: '1px solid var(--ios-sep)', background: 'var(--ios-bg)', color: 'var(--ios-label)',
                }}
                aria-label="Board name"
              />
              <button
                onClick={createBoard}
                style={{
                  padding: '12px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                  border: 'none', cursor: 'pointer', background: 'var(--ios-blue)', color: '#fff',
                }}
              >Create Board</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
