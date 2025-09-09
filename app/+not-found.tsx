import { router, Stack } from 'expo-router';
import { StyleSheet, Button, View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '../constants/Colors';

export default function NotFoundScreen() {

  return (
    <>
      <Stack.Screen options={{
        title: 'Ops!',
        headerTintColor: Colors.dark.tint,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 24 },
      }} />

      <ThemedView style={styles.container}>
        <Image
          source={require('../assets/images/adaptive-icon.png')}
          style={styles.logo}
          contentFit='contain' />

        <ThemedText type="title" style={styles.title}>Não foi possível exibir o conteúdo.</ThemedText>
        <ThemedText type="default" style={styles.default}>Por favor, siga os passos abaixo para resolver o problema:</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.defaultSemiBold}>1. Verifique sua conexão com a internet.</ThemedText>
        <ThemedText type='defaultSemiBold' style={styles.defaultSemiBold}>2. Tente recarregar a página.</ThemedText>
        <ThemedText type='defaultSemiBold' style={styles.defaultSemiBold}>3. Entre em contato com o suporte.</ThemedText>

        <View style={{ marginTop: 20 }}>
          <Button onPress={() => router.replace('/')} title="Ir para a tela inicial!" />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    color: Colors.dark.tint,
  },
  default: {
    textAlign: 'left',
    width: '100%',
  },
  defaultSemiBold: {
    textAlign: 'left',
    paddingLeft: 10,
    width: '100%',
  },
  logo: {
    width: 150,
    height: 140,
    marginBottom: 8
  }
});
