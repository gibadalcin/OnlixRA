import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { useFocusEffect } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useWindowDimensions, Alert, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

// Importação dos componentes UI
import { CameraMarkers } from '@/components/ui/CameraMarkers';
import { CameraActions } from '@/components/ui/CameraActions';
import { PermissionRequest } from '@/components/ui/PermissionRequest';

// Importação dos hooks
import { useGallery } from '@/hooks/useGallery';
import { useHistory } from '@/hooks/useHistory';

export default function RecognizerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const { width, height } = useWindowDimensions();
    const [isFocused, setIsFocused] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(0);

    const zoom = useSharedValue(0);
    const initialZoom = useSharedValue(0);

    const { openGallery } = useGallery();
    const { openHistory } = useHistory();

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

    const takePictureAndSave = async () => {
        if (!permission?.granted) {
            const { granted } = await requestPermission();
            if (!granted) {
                Alert.alert('Permissão', 'A permissão da câmera é necessária para capturar fotos.');
                return;
            }
        }
        const { granted: mediaLibraryGranted } = await MediaLibrary.requestPermissionsAsync();
        if (!mediaLibraryGranted) {
            Alert.alert('Permissão', 'A permissão da galeria é necessária para salvar a foto.');
            return;
        }

        if (cameraRef.current) {
            try {
                const fullPhoto = await cameraRef.current.takePictureAsync();

                const cameraViewWidth = width * 0.9;
                const cameraViewHeight = height * 0.8;
                const scaleX = fullPhoto.width / cameraViewWidth;
                const scaleY = fullPhoto.height / cameraViewHeight;
                const focalAreaWidth = 250;
                const focalAreaHeight = 250;
                const cropOriginX_screen = (cameraViewWidth - focalAreaWidth) / 2;
                const cropOriginY_screen = ((height * 0.8) - focalAreaHeight) / 2;
                const finalCropOriginX = cropOriginX_screen * scaleX;
                const finalCropOriginY = cropOriginY_screen * scaleY;
                const finalCropWidth = focalAreaWidth * scaleX;
                const finalCropHeight = focalAreaHeight * scaleY;

                const croppedPhoto = await ImageManipulator.manipulateAsync(
                    fullPhoto.uri,
                    [
                        {
                            crop: {
                                originX: finalCropOriginX,
                                originY: finalCropOriginY,
                                width: finalCropWidth,
                                height: finalCropHeight,
                            },
                        },
                    ],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );

                await MediaLibrary.saveToLibraryAsync(croppedPhoto.uri);
                Alert.alert('Sucesso', 'Foto salva na galeria do app!');
            } catch (error) {
                console.error('Erro ao capturar, recortar ou salvar a foto:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao salvar a foto.');
            }
        }
    };

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
                            onTakePicture={takePictureAndSave}
                            onOpenHistory={openHistory}
                        />
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
});