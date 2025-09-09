import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.dark.tint,      // cor do ícone ativo
          tabBarInactiveTintColor: Colors.light.tabIconDefault, // cor do ícone inativo menos opaca
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="recognizer"
          options={{
            title: 'Reconhecer',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="camera-alt" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="explorer"
          options={{
            title: 'Explorar',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="explore" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            title: 'Ajuda',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="help-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="options"
          options={{
            title: 'Opções',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}