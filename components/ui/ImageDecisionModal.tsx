import React from 'react';
import { Modal, View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSaveToGallery } from '@/hooks/useSaveToGallery';

interface Props {
    visible: boolean;
    imageUri: string;
    onCompare: () => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ImageDecisionModal({ visible, imageUri, onCompare, onSave, onCancel }: Props) {
    const { width } = useWindowDimensions();
    const imageWidth = width * 0.8;
    const { saveToGallery } = useSaveToGallery();

    return (
        <Modal visible={visible} transparent>
            <View style={styles.overlay}>
                <Image source={{ uri: imageUri }} style={{ width: imageWidth, height: imageWidth / 1.25, borderRadius: 12 }} />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonTopRow}>
                        <Pressable style={styles.fullButton} onPress={onCompare}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons name="search" color={Colors.global.light} size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Buscar</Text>
                            </View>
                        </Pressable>
                        <View style={styles.spacer} />
                        <Pressable style={styles.fullButton} onPress={() => saveToGallery(imageUri, onSave)}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons name="save" color={Colors.global.light} size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Salvar</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.buttonTopRow}>
                        <Pressable style={[styles.fullButton, styles.fullButtonLarge]} onPress={onCancel}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons name="cancel" color={Colors.global.light} size={24} style={styles.icon} />
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 24,
        width: '80%',
    },
    buttonTopRow: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    spacer: {
        width: 16, // Espaço horizontal entre os botões
    },
    fullButton: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: Colors.global.blueLight,
        shadowColor: Colors.global.dark,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullButtonLarge: {
        backgroundColor: Colors.global.blueDark,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        width: '100%',
    },
    icon: {
        marginRight: 8,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 12,
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },
});