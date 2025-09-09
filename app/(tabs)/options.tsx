import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { version } from 'react';

export default function OptionsScreen() {
    return (
        <View style={styles.container}>
            <Text>Tela de opções.</Text>
            <Text style={styles.copy}>© 2025 olinx.digital</Text>
            <Text style={styles.version}>V. 1.0.0</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background, // Cor de fundo padrão
    },
    copy: {
        color: Colors.light.text,
        fontSize: 14,
        textAlign: 'center',
        position: 'absolute',
        bottom: 30,
    },
    version: {
        color: Colors.light.text,
        fontSize: 12,
        position: 'absolute',
        bottom: 10,
    },
});