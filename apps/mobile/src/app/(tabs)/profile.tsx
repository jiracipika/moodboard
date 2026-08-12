import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBoards, getPalettes, ensureSeeded, type Board, type Palette } from '../../lib/store';

export default function ProfileScreen() {
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

  const totalColors = boards.reduce((sum, b) => sum + b.items.filter(i => i.type === 'color').length, 0);
  const totalNotes = boards.reduce((sum, b) => sum + b.items.filter(i => i.type === 'note').length, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>🎨</Text>
          </View>
          <Text style={styles.name}>Your Studio</Text>
          <Text style={styles.joined}>Moodboard Creator</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{boards.length}</Text>
            <Text style={styles.statLabel}>Boards</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{palettes.length}</Text>
            <Text style={styles.statLabel}>Palettes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalColors}</Text>
            <Text style={styles.statLabel}>Colors</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalNotes}</Text>
            <Text style={styles.statLabel}>Notes</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>All Tags</Text>
        <View style={styles.tagCloud}>
          {Array.from(new Set(boards.flatMap(b => b.tags))).map(tag => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
          {Array.from(new Set(palettes.flatMap(p => p.tags))).map(tag => (
            <View key={`pal-${tag}`} style={styles.tagPill}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: 16 },
  profileCard: { alignItems: 'center', paddingVertical: 20 },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#1c1c2e',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarEmoji: { fontSize: 36 },
  name: { fontSize: 22, fontWeight: '800', color: '#fff' },
  joined: { fontSize: 14, color: '#888', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 10, marginVertical: 20 },
  statCard: { flex: 1, backgroundColor: '#1c1c2e', borderRadius: 14, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: '#5E5CE6' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 12 },
  tagCloud: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagPill: { backgroundColor: '#1c1c2e', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14 },
  tagText: { fontSize: 13, color: '#5E5CE6' },
});
