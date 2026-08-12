import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBoards, getPalettes, ensureSeeded, type Board, type Palette } from '../../lib/store';

export default function HomeScreen() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [palettes, setPalettes] = useState<Palette[]>([]);
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
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
      >
        <Text style={styles.header}>Moodboard</Text>
        <Text style={styles.subtitle}>{boards.length} boards • {palettes.length} palettes</Text>

        <Text style={styles.sectionTitle}>Recent Boards</Text>
        {boards.map(board => (
          <View key={board.id} style={styles.boardCard}>
            <View style={[styles.boardCover, { backgroundImage: board.coverGradient }]}>
              <View style={styles.colorDots}>
                {board.items.filter(i => i.type === 'color').slice(0, 5).map((c, i) => (
                  <View key={c.id} style={[styles.colorDot, { backgroundColor: c.content, marginLeft: i > 0 ? -8 : 0 }]} />
                ))}
              </View>
            </View>
            <Text style={styles.boardTitle}>{board.title}</Text>
            <Text style={styles.boardDesc}>{board.description}</Text>
            <View style={styles.tagRow}>
              {board.tags.map(tag => (
                <Text key={tag} style={styles.tag}>#{tag}</Text>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Palettes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.paletteScroll}>
          {palettes.map(pal => (
            <View key={pal.id} style={styles.paletteCard}>
              <Text style={styles.paletteTitle}>{pal.title}</Text>
              <View style={styles.paletteColors}>
                {pal.colors.map(c => (
                  <View key={c.id} style={[styles.paletteColor, { backgroundColor: c.hex }]}>
                    <Text style={styles.paletteHex}>{c.hex}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: 16 },
  header: { fontSize: 28, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 12, marginTop: 8 },
  boardCard: { backgroundColor: '#1c1c2e', borderRadius: 18, padding: 16, marginBottom: 14 },
  boardCover: { height: 80, borderRadius: 14, marginBottom: 12, justifyContent: 'flex-end', padding: 12 },
  colorDots: { flexDirection: 'row' },
  colorDot: { width: 32, height: 32, borderRadius: 16, borderWidth: 3, borderColor: '#1c1c2e' },
  boardTitle: { fontSize: 17, fontWeight: '700', color: '#fff' },
  boardDesc: { fontSize: 13, color: '#aaa', marginTop: 4 },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
  tag: { fontSize: 12, color: '#5E5CE6' },
  paletteScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  paletteCard: { width: 220, backgroundColor: '#1c1c2e', borderRadius: 16, padding: 14, marginRight: 12 },
  paletteTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 10 },
  paletteColors: { flexDirection: 'row', borderRadius: 10, overflow: 'hidden' },
  paletteColor: { flex: 1, height: 60, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4 },
  paletteHex: { fontSize: 8, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
});
