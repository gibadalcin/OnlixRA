import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isFocused, setIsFocused] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setIsFocused(true);
            return () => {
                setIsFocused(false);
            };
        }, [])
    );

    const renderContent = () => {
        if (!permission) {
            return <View />;
        }

        if (!permission.granted) {
            return (
                <>
                    <Image
                        source={require('../../../assets/images/adaptive-icon.png')}
                        style={styles.logo}
                        contentFit='contain' />
                    <ThemedText style={styles.permissionText}>Precisamos de permissão para acessar a câmera.</ThemedText>
                    <Button onPress={requestPermission} title="Conceder Permissão" />
                </>
            );
        }

        return (
            isFocused && (
                <View style={styles.content}>
                    <View style={styles.cameraContainer}>
                        <CameraView
                            style={StyleSheet.absoluteFill}
                            facing="back"
                        />
                    </View>
                    <View style={styles.interactionBlock}>
                        <ThemedText style={styles.captureInfo}>Aponte a câmera para a logomarca e toque para capturar!</ThemedText>
                        <View style={styles.buttonRow}>
                            {/* Botão da Galeria */}
                            <Pressable onPress={() => console.log('Abrir Galeria')}>
                                <Ionicons name="images" size={32} color={Colors.light.tabIconDefault} />
                                <ThemedText style={styles.gallery}>Galeria</ThemedText>
                            </Pressable>

                            {/* Botão de Captura Principal */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.mainButton,
                                    { opacity: pressed ? 0.7 : 1 },
                                ]}
                                onPress={() => console.log('Botão de captura pressionado!')}
                            >
                                <View style={styles.outerCircle}>
                                    <View style={styles.innerCircle}>
                                        <Ionicons name="camera" size={32} color={Colors.light.background} />
                                    </View>
                                </View>
                            </Pressable>

                            {/* Botão de Histórico */}
                            <Pressable onPress={() => console.log('Abrir Histórico')}>
                                <Ionicons name="folder-open" size={32} color={Colors.light.tabIconDefault} />
                                <ThemedText style={styles.history}>Salvos</ThemedText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )
        );
    };

    return (
        <ThemedView style={styles.container}>
            {renderContent()}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        width: '90%',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: 'red',
        marginTop: '10%',
    },
    interactionBlock: {
        width: '90%',
        alignItems: 'center',
        marginBottom: '10%',
        marginTop: 32,
    },
    captureInfo: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 30,
        color: Colors.light.text,
    },
    history: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '800',
    },
    gallery: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '600',
    },
    permissionText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 30,
        width: '80%',
    },
    logo: {
        width: 200,
        height: 180,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'flex-end', // Alinha os botões na parte inferior da linha
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 32,
    },
    mainButton: {
        marginBottom: 20,
    },
    outerCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.dark.tint,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.dark.tint,
        borderColor: Colors.light.background,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});