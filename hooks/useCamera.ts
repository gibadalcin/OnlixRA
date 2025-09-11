import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';
import { RefObject } from 'react';

export function useCamera(
    cameraRef: RefObject<any>,
    width: number,
    height: number,
    permission: { granted: boolean } | null,
    requestPermission: () => Promise<{ granted: boolean }>
) {
    async function takePictureAndSave() {
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
    }

    return { takePictureAndSave };
}