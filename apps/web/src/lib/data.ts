// ─── Types ─────────────────────────────────────────────────────────────────

export type BoardItemType = 'color' | 'note' | 'image';

export interface BoardItem {
  id: string;
  type: BoardItemType;
  content: string;   // hex for color, text for note, URL for image
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  bg?: string;       // bg color for notes
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

// ─── Mock Data ──────────────────────────────────────────────────────────────

export const MOCK_BOARDS: Board[] = [
  {
    id: 'board-1',
    title: 'Summer Vibes',
    description: 'Warm, tropical, joyful aesthetic for a summer campaign',
    tags: ['summer', 'warm', 'tropical'],
    coverGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    items: [
      { id: 'b1i1', type: 'color', content: '#F6D365', x: 40, y: 40, width: 130, height: 130, label: 'Sunny Yellow' },
      { id: 'b1i2', type: 'color', content: '#FDA085', x: 200, y: 40, width: 130, height: 130, label: 'Peach Coral' },
      { id: 'b1i3', type: 'color', content: '#FF6B6B', x: 360, y: 40, width: 130, height: 130, label: 'Watermelon' },
      { id: 'b1i4', type: 'color', content: '#4ECDC4', x: 520, y: 40, width: 130, height: 130, label: 'Ocean Teal' },
      { id: 'b1i5', type: 'note', content: 'Warm, tropical vibes. Think: sunset beaches, fresh fruit, sea breeze.', x: 40, y: 220, width: 260, height: 100, label: '', bg: '#FFF9C4' },
      { id: 'b1i6', type: 'image', content: 'https://picsum.photos/seed/summer1/300/200', x: 360, y: 220, width: 290, height: 200, label: 'Beach Sunset' },
      { id: 'b1i7', type: 'color', content: '#FFE66D', x: 40, y: 370, width: 130, height: 130, label: 'Lemon Zest' },
      { id: 'b1i8', type: 'image', content: 'https://picsum.photos/seed/summer2/250/180', x: 200, y: 370, width: 130, height: 130, label: 'Tropical Flowers' },
    ],
  },
  {
    id: 'board-2',
    title: 'Minimal Office',
    description: 'Clean, focused workspace aesthetic with monochromatic palette',
    tags: ['minimal', 'office', 'clean'],
    coverGradient: 'linear-gradient(135deg, #e8e8e8 0%, #b8b8b8 100%)',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
    items: [
      { id: 'b2i1', type: 'color', content: '#F5F5F5', x: 40, y: 40, width: 130, height: 130, label: 'Paper White' },
      { id: 'b2i2', type: 'color', content: '#E0E0E0', x: 200, y: 40, width: 130, height: 130, label: 'Light Gray' },
      { id: 'b2i3', type: 'color', content: '#9E9E9E', x: 360, y: 40, width: 130, height: 130, label: 'Mid Gray' },
      { id: 'b2i4', type: 'color', content: '#212121', x: 520, y: 40, width: 130, height: 130, label: 'Near Black' },
      { id: 'b2i5', type: 'image', content: 'https://picsum.photos/seed/office1/300/220', x: 40, y: 220, width: 300, height: 220, label: 'Minimal Desk' },
      { id: 'b2i6', type: 'note', content: 'Less is more. Every element must earn its place.', x: 370, y: 220, width: 280, height: 90, label: '', bg: '#F5F5F5' },
      { id: 'b2i7', type: 'color', content: '#1565C0', x: 370, y: 330, width: 130, height: 130, label: 'Focus Blue' },
    ],
  },
  {
    id: 'board-3',
    title: 'Tokyo Nights',
    description: 'Dark, neon-lit urban aesthetic inspired by Japanese cyberpunk',
    tags: ['dark', 'neon', 'japan', 'cyberpunk'],
    coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
    createdAt: '2024-01-05T20:00:00Z',
    updatedAt: '2024-01-17T22:00:00Z',
    items: [
      { id: 'b3i1', type: 'color', content: '#1A1A2E', x: 40, y: 40, width: 130, height: 130, label: 'Midnight' },
      { id: 'b3i2', type: 'color', content: '#16213E', x: 200, y: 40, width: 130, height: 130, label: 'Deep Navy' },
      { id: 'b3i3', type: 'color', content: '#E94560', x: 360, y: 40, width: 130, height: 130, label: 'Neon Red' },
      { id: 'b3i4', type: 'color', content: '#0F3460', x: 520, y: 40, width: 130, height: 130, label: 'Electric Blue' },
      { id: 'b3i5', type: 'image', content: 'https://picsum.photos/seed/tokyo1/300/200', x: 40, y: 220, width: 290, height: 200, label: 'Night Streets' },
      { id: 'b3i6', type: 'note', content: 'Neon glows on wet pavement. The city never sleeps.', x: 360, y: 220, width: 290, height: 90, label: '', bg: '#1A1A2E' },
      { id: 'b3i7', type: 'color', content: '#533483', x: 360, y: 330, width: 130, height: 130, label: 'Purple Haze' },
    ],
  },
  {
    id: 'board-4',
    title: 'Botanical Garden',
    description: 'Lush, organic greens and earthy tones from the natural world',
    tags: ['nature', 'green', 'botanical', 'organic'],
    coverGradient: 'linear-gradient(135deg, #52b788 0%, #2d6a4f 100%)',
    createdAt: '2024-01-03T14:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    items: [
      { id: 'b4i1', type: 'color', content: '#2D6A4F', x: 40, y: 40, width: 130, height: 130, label: 'Forest Deep' },
      { id: 'b4i2', type: 'color', content: '#52B788', x: 200, y: 40, width: 130, height: 130, label: 'Sage Green' },
      { id: 'b4i3', type: 'color', content: '#B7E4C7', x: 360, y: 40, width: 130, height: 130, label: 'Mint Mist' },
      { id: 'b4i4', type: 'color', content: '#8B5E3C', x: 520, y: 40, width: 130, height: 130, label: 'Rich Earth' },
      { id: 'b4i5', type: 'image', content: 'https://picsum.photos/seed/botanical1/300/220', x: 40, y: 220, width: 300, height: 220, label: 'Lush Ferns' },
      { id: 'b4i6', type: 'note', content: 'Nature&apos;s palette: never wrong, always harmonious.', x: 370, y: 220, width: 280, height: 90, label: '', bg: '#D8F3DC' },
      { id: 'b4i7', type: 'color', content: '#D8F3DC', x: 370, y: 330, width: 130, height: 130, label: 'Dew Drop' },
    ],
  },
  {
    id: 'board-5',
    title: 'Retro Futurism',
    description: '80s inspired synth-wave neon aesthetic meets space-age design',
    tags: ['retro', '80s', 'neon', 'synthwave'],
    coverGradient: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T19:00:00Z',
    items: [
      { id: 'b5i1', type: 'color', content: '#FF00FF', x: 40, y: 40, width: 130, height: 130, label: 'Hot Magenta' },
      { id: 'b5i2', type: 'color', content: '#00FFFF', x: 200, y: 40, width: 130, height: 130, label: 'Cyan Flash' },
      { id: 'b5i3', type: 'color', content: '#FF6600', x: 360, y: 40, width: 130, height: 130, label: 'Sunset Orange' },
      { id: 'b5i4', type: 'color', content: '#0D0D0D', x: 520, y: 40, width: 130, height: 130, label: 'Void Black' },
      { id: 'b5i5', type: 'note', content: 'The future as imagined in 1984. Chrome, neon, and infinite possibility.', x: 40, y: 220, width: 260, height: 100, label: '', bg: '#1A0030' },
      { id: 'b5i6', type: 'image', content: 'https://picsum.photos/seed/retro1/300/200', x: 330, y: 220, width: 320, height: 200, label: 'Synthwave Sky' },
    ],
  },
  {
    id: 'board-6',
    title: 'Nordic Hygge',
    description: 'Cozy Scandinavian warmth with muted natural tones',
    tags: ['nordic', 'cozy', 'minimal', 'warm'],
    coverGradient: 'linear-gradient(135deg, #e8d5c4 0%, #a8c5da 100%)',
    createdAt: '2023-12-28T08:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z',
    items: [
      { id: 'b6i1', type: 'color', content: '#F5ECD7', x: 40, y: 40, width: 130, height: 130, label: 'Oat Cream' },
      { id: 'b6i2', type: 'color', content: '#C9B99A', x: 200, y: 40, width: 130, height: 130, label: 'Warm Sand' },
      { id: 'b6i3', type: 'color', content: '#8AACB8', x: 360, y: 40, width: 130, height: 130, label: 'Dusty Blue' },
      { id: 'b6i4', type: 'color', content: '#5C4033', x: 520, y: 40, width: 130, height: 130, label: 'Dark Wood' },
      { id: 'b6i5', type: 'image', content: 'https://picsum.photos/seed/nordic1/300/220', x: 40, y: 220, width: 300, height: 220, label: 'Cozy Corner' },
      { id: 'b6i6', type: 'note', content: 'Hygge: the art of coziness, togetherness, and well-being.', x: 370, y: 220, width: 280, height: 90, label: '', bg: '#F5ECD7' },
      { id: 'b6i7', type: 'color', content: '#D4A5A5', x: 370, y: 330, width: 130, height: 130, label: 'Blush Rose' },
    ],
  },
];

export const MOCK_PALETTES: Palette[] = [
  {
    id: 'pal-1',
    title: 'Ocean Breeze',
    description: 'Deep blues and teals inspired by the open sea',
    tags: ['blue', 'teal', 'ocean', 'cool'],
    createdAt: '2024-01-18T10:00:00Z',
    colors: [
      { id: 'c1', hex: '#0F3460', name: 'Deep Abyss' },
      { id: 'c2', hex: '#16213E', name: 'Midnight Ocean' },
      { id: 'c3', hex: '#0B5FA5', name: 'Azure Wave' },
      { id: 'c4', hex: '#4CC9F0', name: 'Sky Lagoon' },
      { id: 'c5', hex: '#90E0EF', name: 'Sea Foam' },
    ],
  },
  {
    id: 'pal-2',
    title: 'Sunset Gradient',
    description: 'Warm amber and coral tones of golden hour',
    tags: ['warm', 'sunset', 'orange', 'pink'],
    createdAt: '2024-01-17T12:00:00Z',
    colors: [
      { id: 'c1', hex: '#FF6B6B', name: 'Coral Blaze' },
      { id: 'c2', hex: '#FF8E53', name: 'Tangerine' },
      { id: 'c3', hex: '#FFA94D', name: 'Amber Glow' },
      { id: 'c4', hex: '#FFD93D', name: 'Golden Hour' },
      { id: 'c5', hex: '#F6D365', name: 'Pale Sun' },
    ],
  },
  {
    id: 'pal-3',
    title: 'Forest Floor',
    description: 'Earthy greens and browns from ancient woodland',
    tags: ['green', 'nature', 'earth', 'forest'],
    createdAt: '2024-01-16T09:00:00Z',
    colors: [
      { id: 'c1', hex: '#1B4332', name: 'Ancient Grove' },
      { id: 'c2', hex: '#2D6A4F', name: 'Forest Deep' },
      { id: 'c3', hex: '#40916C', name: 'Mossy Stone' },
      { id: 'c4', hex: '#74C69D', name: 'Fern Green' },
      { id: 'c5', hex: '#B7E4C7', name: 'Morning Dew' },
    ],
  },
  {
    id: 'pal-4',
    title: 'Neon Dreams',
    description: 'Electric, vibrant hues for bold digital experiences',
    tags: ['neon', 'bright', 'electric', 'digital'],
    createdAt: '2024-01-15T20:00:00Z',
    colors: [
      { id: 'c1', hex: '#FF00FF', name: 'Hot Magenta' },
      { id: 'c2', hex: '#00FFFF', name: 'Electric Cyan' },
      { id: 'c3', hex: '#FF6600', name: 'Neon Orange' },
      { id: 'c4', hex: '#00FF41', name: 'Matrix Green' },
      { id: 'c5', hex: '#FF0066', name: 'Laser Pink' },
    ],
  },
  {
    id: 'pal-5',
    title: 'Muted Clay',
    description: 'Warm terracotta and sand tones from arid landscapes',
    tags: ['earthy', 'terracotta', 'warm', 'muted'],
    createdAt: '2024-01-14T14:00:00Z',
    colors: [
      { id: 'c1', hex: '#8C6D3F', name: 'Dark Sienna' },
      { id: 'c2', hex: '#A68B5B', name: 'Warm Leather' },
      { id: 'c3', hex: '#C9B99A', name: 'Raw Sand' },
      { id: 'c4', hex: '#D4B896', name: 'Pale Adobe' },
      { id: 'c5', hex: '#F5E6D3', name: 'Desert Dust' },
    ],
  },
  {
    id: 'pal-6',
    title: 'Arctic Night',
    description: 'Cool deep blues and crisp whites of the northern sky',
    tags: ['cool', 'dark', 'blue', 'arctic'],
    createdAt: '2024-01-13T22:00:00Z',
    colors: [
      { id: 'c1', hex: '#1A1A2E', name: 'Polar Dark' },
      { id: 'c2', hex: '#16213E', name: 'Icebreaker' },
      { id: 'c3', hex: '#533483', name: 'Aurora Purple' },
      { id: 'c4', hex: '#E94560', name: 'Northern Fire' },
      { id: 'c5', hex: '#F0F4F8', name: 'Glacier White' },
    ],
  },
];

// ─── Community / Explore Data ──────────────────────────────────────────────

export interface CommunityBoard {
  id: string;
  title: string;
  author: string;
  avatar: string;
  likes: number;
  views: number;
  coverGradient: string;
  tags: string[];
  itemCount: number;
}

export interface CommunityPalette {
  id: string;
  title: string;
  author: string;
  avatar: string;
  likes: number;
  colors: string[];
  tags: string[];
}

export const COMMUNITY_BOARDS: CommunityBoard[] = [
  { id: 'cb1', title: 'Coastal Living', author: 'Anna K.', avatar: 'AK', likes: 342, views: 1820, coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', tags: ['coastal', 'interior'], itemCount: 12 },
  { id: 'cb2', title: 'Wabi-Sabi', author: 'Takeshi M.', avatar: 'TM', likes: 289, views: 1543, coverGradient: 'linear-gradient(135deg, #c9b99a 0%, #8b6d3f 100%)', tags: ['japanese', 'minimal'], itemCount: 9 },
  { id: 'cb3', title: 'Brutalist UI', author: 'Lena V.', avatar: 'LV', likes: 567, views: 3210, coverGradient: 'linear-gradient(135deg, #2c2c2c 0%, #ff6600 100%)', tags: ['brutalist', 'digital'], itemCount: 15 },
  { id: 'cb4', title: 'Rose Garden', author: 'Sophie B.', avatar: 'SB', likes: 421, views: 2100, coverGradient: 'linear-gradient(135deg, #f8a5c2 0%, #c56cd6 100%)', tags: ['floral', 'feminine'], itemCount: 11 },
  { id: 'cb5', title: 'Deep Space', author: 'Marcus R.', avatar: 'MR', likes: 198, views: 987, coverGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', tags: ['space', 'dark'], itemCount: 8 },
  { id: 'cb6', title: 'Film Noir', author: 'Clara D.', avatar: 'CD', likes: 445, views: 2345, coverGradient: 'linear-gradient(135deg, #1c1c1c 0%, #868686 100%)', tags: ['film', 'mono'], itemCount: 13 },
  { id: 'cb7', title: 'Pastel Pop', author: 'Mia C.', avatar: 'MC', likes: 612, views: 3890, coverGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', tags: ['pastel', 'kawaii'], itemCount: 17 },
  { id: 'cb8', title: 'Industrial', author: 'Dev P.', avatar: 'DP', likes: 278, views: 1456, coverGradient: 'linear-gradient(135deg, #4a4a4a 0%, #8b8b8b 100%)', tags: ['industrial', 'urban'], itemCount: 10 },
];

export const COMMUNITY_PALETTES: CommunityPalette[] = [
  { id: 'cp1', title: 'Lavender Fields', author: 'Anna K.', avatar: 'AK', likes: 231, colors: ['#E8D5E8', '#C4A8C4', '#9B6B9B', '#7B4F8E', '#4A2468'], tags: ['purple', 'soft'] },
  { id: 'cp2', title: 'Matcha Latte', author: 'Yuki S.', avatar: 'YS', likes: 189, colors: ['#F5F0E8', '#D4C9A8', '#8FA068', '#5A7A3A', '#2D4A1E'], tags: ['green', 'muted'] },
  { id: 'cp3', title: 'Wildfire', author: 'Marco A.', avatar: 'MA', likes: 445, colors: ['#FFF3E0', '#FFB74D', '#FF7043', '#E53935', '#880E4F'], tags: ['red', 'warm'] },
  { id: 'cp4', title: 'Slate Modern', author: 'Lena V.', avatar: 'LV', likes: 312, colors: ['#F8FAFC', '#CBD5E1', '#64748B', '#334155', '#0F172A'], tags: ['gray', 'neutral'] },
  { id: 'cp5', title: 'Candy Shop', author: 'Mia C.', avatar: 'MC', likes: 567, colors: ['#FF6B9D', '#FF8CC8', '#FFB3E8', '#C8B3FF', '#A855F7'], tags: ['pink', 'fun'] },
  { id: 'cp6', title: 'Desert Bloom', author: 'Ray T.', avatar: 'RT', likes: 298, colors: ['#FDF6EC', '#F4C27C', '#E8904A', '#C17B3C', '#8A5C28'], tags: ['desert', 'warm'] },
];

export const EXPLORE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'nature', label: 'Nature' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'dark', label: 'Dark' },
  { id: 'colorful', label: 'Colorful' },
  { id: 'interior', label: 'Interior' },
  { id: 'digital', label: 'Digital' },
  { id: 'warm', label: 'Warm' },
];

// ─── Storage ────────────────────────────────────────────────────────────────

const BOARDS_KEY = 'moodboard_boards_v2';
const PALETTES_KEY = 'moodboard_palettes_v2';

export function getBoards(): Board[] {
  if (typeof window === 'undefined') return MOCK_BOARDS;
  try {
    const stored = localStorage.getItem(BOARDS_KEY);
    if (!stored) {
      localStorage.setItem(BOARDS_KEY, JSON.stringify(MOCK_BOARDS));
      return MOCK_BOARDS;
    }
    return JSON.parse(stored);
  } catch {
    return MOCK_BOARDS;
  }
}

export function saveBoards(boards: Board[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
}

export function getBoard(id: string): Board | null {
  return getBoards().find(b => b.id === id) ?? null;
}

export function saveBoard(board: Board): void {
  const boards = getBoards();
  const idx = boards.findIndex(b => b.id === board.id);
  if (idx >= 0) boards[idx] = { ...board, updatedAt: new Date().toISOString() };
  else boards.unshift(board);
  saveBoards(boards);
}

export function deleteBoard(id: string): void {
  saveBoards(getBoards().filter(b => b.id !== id));
}

export function getPalettes(): Palette[] {
  if (typeof window === 'undefined') return MOCK_PALETTES;
  try {
    const stored = localStorage.getItem(PALETTES_KEY);
    if (!stored) {
      localStorage.setItem(PALETTES_KEY, JSON.stringify(MOCK_PALETTES));
      return MOCK_PALETTES;
    }
    return JSON.parse(stored);
  } catch {
    return MOCK_PALETTES;
  }
}

export function savePalettes(palettes: Palette[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PALETTES_KEY, JSON.stringify(palettes));
}

export function getPalette(id: string): Palette | null {
  return getPalettes().find(p => p.id === id) ?? null;
}

export function savePalette(palette: Palette): void {
  const palettes = getPalettes();
  const idx = palettes.findIndex(p => p.id === palette.id);
  if (idx >= 0) palettes[idx] = palette;
  else palettes.unshift(palette);
  savePalettes(palettes);
}

export function deletePalette(id: string): void {
  savePalettes(getPalettes().filter(p => p.id !== id));
}

// ─── Utilities ──────────────────────────────────────────────────────────────

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Color Utilities ────────────────────────────────────────────────────────

export function hexToRGB(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

export function hexToHSL(hex: string): [number, number, number] {
  let [r, g, b] = hexToRGB(hex).map(v => v / 255) as [number, number, number];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

export function hslToHex(h: number, s: number, l: number): string {
  h /= 360; s /= 100; l /= 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r: number, g: number, bl: number;
  if (s === 0) {
    r = g = bl = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    bl = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

export function generateTints(hex: string, steps = 5): string[] {
  const [h, s, l] = hexToHSL(hex);
  return Array.from({ length: steps }, (_, i) => {
    const t = (i + 1) / (steps + 1);
    return hslToHex(h, s * (1 - t * 0.3), l + (100 - l) * t);
  });
}

export function generateShades(hex: string, steps = 5): string[] {
  const [h, s, l] = hexToHSL(hex);
  return Array.from({ length: steps }, (_, i) => {
    const t = (i + 1) / (steps + 1);
    return hslToHex(h, s, l * (1 - t));
  });
}

export function generateComplementary(hex: string): string {
  const [h, s, l] = hexToHSL(hex);
  return hslToHex((h + 180) % 360, s, l);
}

export function generateAnalogous(hex: string): string[] {
  const [h, s, l] = hexToHSL(hex);
  return [
    hslToHex((h - 30 + 360) % 360, s, l),
    hslToHex((h + 30) % 360, s, l),
  ];
}

export function generateTriadic(hex: string): string[] {
  const [h, s, l] = hexToHSL(hex);
  return [hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
}

export function generateSplitComplementary(hex: string): string[] {
  const [h, s, l] = hexToHSL(hex);
  return [hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
}

export function isLightColor(hex: string): boolean {
  const [r, g, b] = hexToRGB(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export function getContrastColor(hex: string): string {
  return isLightColor(hex) ? '#000000' : '#ffffff';
}
