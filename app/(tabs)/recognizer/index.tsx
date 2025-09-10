import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { useFocusEffect, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Button,
    Pressable,
    StyleSheet,
    View,
    useWindowDimensions,
    Alert
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';


export default function RecognizerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const { width, height } = useWindowDimensions();
    const [isFocused, setIsFocused] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(0); // Adicione este estado

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
            runOnJS(setZoomLevel)(clampedZoom); // Atualiza o estado React
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
                        <GestureDetector gesture={pinchGesture}>
                            <CameraView
                                ref={cameraRef}
                                style={StyleSheet.absoluteFill}
                                facing="back"
                                zoom={zoomLevel}
                            />
                        </GestureDetector>
                        {/* Marcadores nos cantos do quadrado central */}
                        <View
                            pointerEvents="none"
                            style={[
                                styles.markerContainer,
                                {
                                    width: 250,
                                    height: 200,
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: -125,
                                    marginTop: -100,
                                },
                            ]}
                        >
                            <View style={styles.markerTopLeft} />
                            <View style={styles.markerTopRight} />
                            <View style={styles.markerBottomLeft} />
                            <View style={styles.markerBottomRight} />
                        </View>
                    </View>
                    <View style={styles.interactionBlock}>
                        <ThemedText style={styles.captureInfo}>Aponte a câmera para a logomarca e toque para capturar!</ThemedText>
                        <View style={styles.buttonRow}>
                            <Pressable onPress={() => router.push('/(tabs)/recognizer/gallery')}>
                                <Ionicons name="images" size={32} color={Colors.light.tabIconDefault} />
                                <ThemedText style={styles.gallery}>Galeria</ThemedText>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.mainButton,
                                    { opacity: pressed ? 0.7 : 1 },
                                ]}
                                onPress={takePictureAndSave}
                            >
                                <View style={styles.outerCircle}>
                                    <View style={styles.innerCircle}>
                                        <Ionicons name="camera" size={32} color={Colors.light.background} />
                                    </View>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => router.push('/(tabs)/recognizer/history')}>
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
        alignItems: 'flex-end',
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
    /*inicio - estilos dos marcadores */
    markerContainer: {
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    markerTopLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: Colors.global.marker,
        borderRadius: 8,
    },
    markerTopRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: Colors.global.marker,
        borderRadius: 8,
    },
    markerBottomLeft: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: Colors.global.marker,
        borderRadius: 8,
    },
    markerBottomRight: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: Colors.global.marker,
        borderRadius: 8,
    },
});