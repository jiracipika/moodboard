import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBoards, getPalettes, ensureSeeded, type Board, type Palette } from '../../lib/store';

export default function DiscoverScreen() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [tab, setTab] = useState<'boards' | 'palettes'>('boards');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    await ensureSeeded();
    setBoards(await getBoards());
    setPalettes(await getPalettes());
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabRow}>
        <Pressable style={[styles.tab, tab === 'boards' && styles.tabActive]} onPress={() => setTab('boards')}>
          <Text style={[styles.tabText, tab === 'boards' && styles.tabTextActive]}>Boards</Text>
        </Pressable>
        <Pressable style={[styles.tab, tab === 'palettes' && styles.tabActive]} onPress={() => setTab('palettes')}>
          <Text style={[styles.tabText, tab === 'palettes' && styles.tabTextActive]}>Palettes</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
      >
        {tab === 'boards' ? (
          <View style={styles.grid}>
            {boards.map(board => {
              const colors = board.items.filter(i => i.type === 'color');
              return (
                <View key={board.id} style={styles.gridCard}>
                  <View style={styles.miniColors}>
                    {colors.slice(0, 4).map(c => (
                      <View key={c.id} style={{ flex: 1, backgroundColor: c.content }} />
                    ))}
                  </View>
                  <Text style={styles.gridTitle}>{board.title}</Text>
                  <Text style={styles.gridCount}>{colors.length} colors</Text>
                </View>
              );
            })}
          </View>
        ) : (
          palettes.map(pal => (
            <View key={pal.id} style={styles.paletteCard}>
              <Text style={styles.paletteTitle}>{pal.title}</Text>
              <Text style={styles.paletteDesc}>{pal.description}</Text>
              <View style={styles.paletteColors}>
                {pal.colors.map(c => (
                  <View key={c.id} style={[styles.paletteSwatch, { backgroundColor: c.hex }]}>
                    <Text style={styles.swatchName}>{c.name}</Text>
                    <Text style={styles.swatchHex}>{c.hex}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  tabRow: { flexDirection: 'row', padding: 16, gap: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#1c1c2e', alignItems: 'center' },
  tabActive: { backgroundColor: '#5E5CE6' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#888' },
  tabTextActive: { color: '#fff' },
  content: { padding: 16, paddingTop: 0 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridCard: { width: '47%', backgroundColor: '#1c1c2e', borderRadius: 16, padding: 12 },
  miniColors: { height: 40, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', marginBottom: 8 },
  gridTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  gridCount: { fontSize: 11, color: '#888', marginTop: 2 },
  paletteCard: { backgroundColor: '#1c1c2e', borderRadius: 16, padding: 16, marginBottom: 12 },
  paletteTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  paletteDesc: { fontSize: 13, color: '#aaa', marginTop: 2, marginBottom: 12 },
  paletteColors: { flexDirection: 'row', gap: 8 },
  paletteSwatch: { flex: 1, borderRadius: 12, padding: 10, minHeight: 60, justifyContent: 'flex-end' },
  swatchName: { fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: '700' },
  swatchHex: { fontSize: 9, color: 'rgba(255,255,255,0.6)' },
});
