import * as MediaLibrary from 'expo-media-library';

export function useSaveToGallery() {
    async function saveToGallery(imageUri: string, onSuccess?: () => void, onError?: () => void) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão para acessar a galeria negada.');
            if (onError) onError();
            return;
        }
        try {
            await MediaLibrary.saveToLibraryAsync(imageUri);
            alert('Imagem salva na galeria!');
            if (onSuccess) onSuccess();
        } catch (e) {
            alert('Erro ao salvar imagem.');
            if (onError) onError();
        }
    }
    return { saveToGallery };
}