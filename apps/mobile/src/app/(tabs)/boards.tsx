import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBoards, ensureSeeded, type Board } from '../../lib/store';

export default function BoardsScreen() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    await ensureSeeded();
    setBoards(await getBoards());
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
        <Text style={styles.header}>My Boards</Text>
        {boards.map(board => {
          const colors = board.items.filter(i => i.type === 'color');
          const notes = board.items.filter(i => i.type === 'note');
          return (
            <View key={board.id} style={styles.boardCard}>
              <View style={styles.colorStrip}>
                {colors.slice(0, 6).map(c => (
                  <View key={c.id} style={{ flex: 1, backgroundColor: c.content, height: '100%' }} />
                ))}
              </View>
              <Text style={styles.boardTitle}>{board.title}</Text>
              <Text style={styles.boardDesc}>{board.description}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaItem}>{colors.length} colors</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaItem}>{notes.length} notes</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaItem}>{board.items.length} items</Text>
              </View>
              <View style={styles.tagRow}>
                {board.tags.map(tag => (
                  <Text key={tag} style={styles.tag}>#{tag}</Text>
                ))}
              </View>
            </View>
          );
        })}
        {boards.length === 0 && (
          <Text style={styles.emptyText}>No boards yet. Create one!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: 16 },
  header: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 16 },
  boardCard: { backgroundColor: '#1c1c2e', borderRadius: 18, marginBottom: 14, overflow: 'hidden' },
  colorStrip: { height: 50, flexDirection: 'row' },
  boardTitle: { fontSize: 17, fontWeight: '700', color: '#fff', padding: 14, paddingBottom: 4 },
  boardDesc: { fontSize: 13, color: '#aaa', paddingHorizontal: 14 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingTop: 8 },
  metaItem: { fontSize: 12, color: '#666' },
  metaDot: { fontSize: 12, color: '#333' },
  tagRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 14, paddingBottom: 14, paddingTop: 6 },
  tag: { fontSize: 12, color: '#5E5CE6' },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 40 },
});
