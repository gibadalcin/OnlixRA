import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { StyleSheet } from 'react-native';
// 1. Adicione esta importação
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    // 2. Envolva toda a sua navegação com este componente
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.dark.tint,
            tabBarInactiveTintColor: Colors.light.tabIconDefault,
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});