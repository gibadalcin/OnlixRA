import { StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <Text>Tela de histórico de logomarcas</Text>
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