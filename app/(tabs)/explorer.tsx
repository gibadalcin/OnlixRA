import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text>Tela de exploração do ambiente</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Cor de fundo padrão
    },
});