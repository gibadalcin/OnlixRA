import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export function useGallery() {
    async function openGallery() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão', 'A permissão da galeria é necessária.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: false,
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            Alert.alert('Imagem selecionada', result.assets[0].uri);
        }
    }

    return { openGallery };
}