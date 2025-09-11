import 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

// Importação dos componentes UI
import { CameraMarkers } from '@/components/ui/CameraMarkers';
import { CameraActions } from '@/components/ui/CameraActions';
import { PermissionRequest } from '@/components/ui/PermissionRequest';
import { ImageDecisionModal } from '@/components/ui/ImageDecisionModal';

// Importação dos hooks
import { useGallery } from '@/hooks/useGallery';
import { useHistory } from '@/hooks/useHistory';
import { useCapture } from '@/hooks/useCapture';
import { sendToGoogleVision } from '@/hooks/useVision';


export default function RecognizerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(0);

    const { openGallery } = useGallery();
    const { openHistory } = useHistory();

    // Novo hook para captura e processamento
    const { imageUri, captureAndProcess, setImageUri } = useCapture(cameraRef);

    // Estado para modal de decisão
    const [modalVisible, setModalVisible] = useState(false);

    const zoom = useSharedValue(0);
    const initialZoom = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            initialZoom.value = zoom.value;
        })
        .onUpdate((event) => {
            const newZoom = initialZoom.value + (event.scale - 1);
            const clampedZoom = Math.min(Math.max(newZoom, 0), 1);
            zoom.value = clampedZoom;
            runOnJS(setZoomLevel)(clampedZoom);
        });

    useFocusEffect(
        React.useCallback(() => {
            setIsFocused(true);
            return () => {
                setIsFocused(false);
            };
        }, [])
    );

    // Função para capturar e abrir modal
    async function handleTakePicture() {
        const uri = await captureAndProcess();
        if (uri) setModalVisible(true);
    }

    // Função para enviar ao Google Vision
    async function handleCompare() {
        if (imageUri) {
            await sendToGoogleVision(imageUri);
        }
        setModalVisible(false);
    }

    // Função para salvar no histórico
    function handleSave() {
        // Implemente a lógica de histórico aqui
        setModalVisible(false);
    }

    const renderContent = () => {
        if (!permission) {
            return <View />;
        }

        if (!permission.granted) {
            return (
                <PermissionRequest onRequestPermission={requestPermission} />
            );
        }

        return (
            isFocused && (
                <View style={styles.content}>
                    <View style={styles.cameraContainer}>
                        <GestureDetector gesture={pinchGesture}>
                            <CameraView
                                ref={cameraRef}
                                style={StyleSheet.absoluteFill}
                                facing="back"
                                zoom={zoomLevel}
                            />
                        </GestureDetector>
                        <CameraMarkers />
                    </View>
                    <View style={styles.interactionBlock}>
                        <ThemedText style={styles.captureInfo}>
                            Aponte a câmera para a logomarca e toque para capturar!
                        </ThemedText>
                        <CameraActions
                            onOpenGallery={openGallery}
                            onTakePicture={handleTakePicture}
                            onOpenHistory={openHistory}
                        />
                    </View>
                    <ImageDecisionModal
                        visible={modalVisible}
                        imageUri={imageUri ?? ''}
                        onCompare={handleCompare}
                        onSave={handleSave}
                        onCancel={() => { setModalVisible(false); setImageUri(null); }}
                    />
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
});