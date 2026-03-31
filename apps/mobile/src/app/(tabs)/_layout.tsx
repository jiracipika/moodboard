import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: '#0a0a0f' },
      headerTintColor: '#fff',
      tabBarStyle: { backgroundColor: '#0a0a0f', borderTopColor: '#1a1a2e' },
      tabBarActiveTintColor: '#a78bfa',
    }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="boards" options={{ title: "Boards" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
