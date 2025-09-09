import { StyleSheet, Text, View } from 'react-native';

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <Text>Tela da galeria de fotos</Text>
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