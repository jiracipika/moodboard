import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BoardItemType = 'color' | 'note' | 'image';

export interface BoardItem {
  id: string;
  type: BoardItemType;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  bg?: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  items: BoardItem[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  coverGradient: string;
}

export interface PaletteColor {
  id: string;
  hex: string;
  name: string;
}

export interface Palette {
  id: string;
  title: string;
  description: string;
  colors: PaletteColor[];
  createdAt: string;
  tags: string[];
}

// ─── Seed Boards ──────────────────────────────────────────────────────────────

const SEED_BOARDS: Board[] = [
  {
    id: 'board-1',
    title: 'Summer Vibes',
    description: 'Warm, tropical, joyful aesthetic',
    tags: ['summer', 'warm', 'tropical'],
    coverGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    items: [
      { id: 'b1i1', type: 'color', content: '#F6D365', x: 0, y: 0, width: 100, height: 100, label: 'Sunny Yellow' },
      { id: 'b1i2', type: 'color', content: '#FDA085', x: 0, y: 0, width: 100, height: 100, label: 'Peach Coral' },
      { id: 'b1i3', type: 'color', content: '#FF6B6B', x: 0, y: 0, width: 100, height: 100, label: 'Watermelon' },
      { id: 'b1i4', type: 'color', content: '#4ECDC4', x: 0, y: 0, width: 100, height: 100, label: 'Ocean Teal' },
      { id: 'b1i5', type: 'note', content: 'Warm, tropical vibes', x: 0, y: 0, width: 200, height: 80, label: '', bg: '#FFF9C4' },
    ],
  },
  {
    id: 'board-2',
    title: 'Tokyo Nights',
    description: 'Dark neon-lit urban aesthetic',
    tags: ['dark', 'neon', 'japan'],
    coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
    createdAt: '2024-01-05T20:00:00Z',
    updatedAt: '2024-01-17T22:00:00Z',
    items: [
      { id: 'b2i1', type: 'color', content: '#1A1A2E', x: 0, y: 0, width: 100, height: 100, label: 'Midnight' },
      { id: 'b2i2', type: 'color', content: '#E94560', x: 0, y: 0, width: 100, height: 100, label: 'Neon Red' },
      { id: 'b2i3', type: 'color', content: '#0F3460', x: 0, y: 0, width: 100, height: 100, label: 'Electric Blue' },
      { id: 'b2i4', type: 'color', content: '#533483', x: 0, y: 0, width: 100, height: 100, label: 'Purple Haze' },
    ],
  },
  {
    id: 'board-3',
    title: 'Botanical Garden',
    description: 'Lush, organic greens and earthy tones',
    tags: ['nature', 'green', 'organic'],
    coverGradient: 'linear-gradient(135deg, #52b788 0%, #2d6a4f 100%)',
    createdAt: '2024-01-03T14:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    items: [
      { id: 'b4i1', type: 'color', content: '#2D6A4F', x: 0, y: 0, width: 100, height: 100, label: 'Forest Deep' },
      { id: 'b4i2', type: 'color', content: '#52B788', x: 0, y: 0, width: 100, height: 100, label: 'Sage Green' },
      { id: 'b4i3', type: 'color', content: '#B7E4C7', x: 0, y: 0, width: 100, height: 100, label: 'Mint Mist' },
      { id: 'b4i4', type: 'color', content: '#8B5E3C', x: 0, y: 0, width: 100, height: 100, label: 'Rich Earth' },
    ],
  },
];

const SEED_PALETTES: Palette[] = [
  { id: 'pal-1', title: 'Sunset', description: 'Warm dusk colors', colors: [
    { id: 'c1', hex: '#FF6B6B', name: 'Coral' },
    { id: 'c2', hex: '#FFE66D', name: 'Golden' },
    { id: 'c3', hex: '#F6D365', name: 'Amber' },
    { id: 'c4', hex: '#FDA085', name: 'Peach' },
  ], createdAt: new Date().toISOString(), tags: ['warm', 'sunset'] },
  { id: 'pal-2', title: 'Ocean', description: 'Cool blue-teal tones', colors: [
    { id: 'c1', hex: '#0A84FF', name: 'Deep Blue' },
    { id: 'c2', hex: '#4ECDC4', name: 'Teal' },
    { id: 'c3', hex: '#00C7BE', name: 'Aqua' },
    { id: 'c4', hex: '#5AC8FA', name: 'Sky' },
  ], createdAt: new Date().toISOString(), tags: ['cool', 'blue'] },
  { id: 'pal-3', title: 'Forest', description: 'Earthy greens', colors: [
    { id: 'c1', hex: '#2D6A4F', name: 'Forest' },
    { id: 'c2', hex: '#52B788', name: 'Sage' },
    { id: 'c3', hex: '#B7E4C7', name: 'Mint' },
    { id: 'c4', hex: '#D8F3DC', name: 'Dew' },
  ], createdAt: new Date().toISOString(), tags: ['green', 'nature'] },
];

// ─── Storage ──────────────────────────────────────────────────────────────────

const KEYS = {
  seeded: 'moodboard_seeded',
  boards: 'moodboard_boards',
  palettes: 'moodboard_palettes',
};

async function load<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

async function save<T>(key: string, value: T): Promise<void> {
  try { await AsyncStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export async function ensureSeeded(): Promise<void> {
  const seeded = await AsyncStorage.getItem(KEYS.seeded);
  if (seeded) return;
  await save(KEYS.boards, SEED_BOARDS);
  await save(KEYS.palettes, SEED_PALETTES);
  await AsyncStorage.setItem(KEYS.seeded, '1');
}

export async function getBoards(): Promise<Board[]> {
  return load<Board[]>(KEYS.boards, SEED_BOARDS);
}

export async function getBoard(id: string): Promise<Board | undefined> {
  const boards = await getBoards();
  return boards.find(b => b.id === id);
}

export async function getPalettes(): Promise<Palette[]> {
  return load<Palette[]>(KEYS.palettes, SEED_PALETTES);
}

export async function saveBoard(board: Board): Promise<void> {
  const boards = await getBoards();
  const idx = boards.findIndex(b => b.id === board.id);
  if (idx >= 0) boards[idx] = board;
  else boards.unshift(board);
  await save(KEYS.boards, boards);
}
