import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveBoard, type Board, type BoardItem } from '../../lib/store';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState('#');
  const [note, setNote] = useState('');

  const addColor = () => {
    const hex = colorInput.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setColors(prev => [...prev, hex]);
      setColorInput('#');
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    const items: BoardItem[] = colors.map((hex, i) => ({
      id: `item-${Date.now()}-${i}`,
      type: 'color' as const,
      content: hex,
      x: 0, y: 0, width: 100, height: 100,
      label: hex,
    }));
    if (note.trim()) {
      items.push({
        id: `item-note-${Date.now()}`,
        type: 'note' as const,
        content: note.trim(),
        x: 0, y: 0, width: 200, height: 80,
        label: '',
        bg: '#FFF9C4',
      });
    }
    const board: Board = {
      id: `board-${Date.now()}`,
      title: title.trim(),
      description: note.trim() || 'Custom moodboard',
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['custom'],
      coverGradient: `linear-gradient(135deg, ${colors[0] || '#333'} 0%, ${colors[1] || '#666'} 100%)`,
    };
    await saveBoard(board);
    setTitle('');
    setColors([]);
    setNote('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Create Board</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Board name..."
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Add Color</Text>
        <View style={styles.colorRow}>
          <TextInput
            style={[styles.input, styles.colorInput]}
            value={colorInput}
            onChangeText={setColorInput}
            placeholder="#FF6B6B"
            placeholderTextColor="#666"
            autoCapitalize="characters"
          />
          <Pressable style={styles.addBtn} onPress={addColor}>
            <Text style={styles.addBtnText}>Add</Text>
          </Pressable>
        </View>

        {colors.length > 0 && (
          <View style={styles.colorGrid}>
            {colors.map((hex, i) => (
              <View key={i} style={[styles.colorSwatch, { backgroundColor: hex }]}>
                <Text style={styles.colorHex}>{hex}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, styles.noteInput]}
          value={note}
          onChangeText={setNote}
          placeholder="Describe the mood..."
          placeholderTextColor="#666"
          multiline
        />

        <Pressable style={[styles.saveBtn, !title.trim() && styles.saveBtnDisabled]} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Board</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: 16 },
  header: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#aaa', marginBottom: 8 },
  input: {
    backgroundColor: '#1c1c2e', borderRadius: 12, padding: 14,
    fontSize: 15, color: '#fff', marginBottom: 16,
  },
  colorRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  colorInput: { flex: 1, marginBottom: 0 },
  addBtn: { backgroundColor: '#5E5CE6', borderRadius: 12, paddingHorizontal: 20, justifyContent: 'center' },
  addBtnText: { color: '#fff', fontWeight: '700' },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  colorSwatch: { width: 80, height: 80, borderRadius: 14, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 6 },
  colorHex: { fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: '700' },
  noteInput: { minHeight: 80, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#5E5CE6', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  saveBtnDisabled: { opacity: 0.4 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
