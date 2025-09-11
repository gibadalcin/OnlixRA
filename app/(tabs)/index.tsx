import { StyleSheet, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* O Stack.Screen é opcional aqui, mas pode ser útil
        para esconder a barra de título padrão se você não precisar dela.
      */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Conteúdo centralizado: Logo e Slogan */}
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          contentFit='contain' />
        <Text style={styles.slogan}>Reconheça. Localize. Explore.</Text>
      </View>

      {/* A barra de navegação (tab bar) é controlada
        pelo arquivo (tabs)/_layout.tsx, então não a adicionamos aqui.
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 200,
  },
  slogan: {
    position: 'absolute',
    bottom: 32,
    fontSize: 18,
    color: Colors.dark.tint, // azul exclusiva do slogan
    fontStyle: 'italic',
  },
});