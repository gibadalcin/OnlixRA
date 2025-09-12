import { getLogoFromCache, saveLogoToCache } from './useLogoCache';
import { sendToGoogleVision } from './useVision';
import * as FileSystem from 'expo-file-system/legacy';

export async function compareLogo(imageUri: string) {
    try {
        // Garante base64
        let imageBase64 = imageUri;
        if (!imageUri.startsWith('data:image')) {
            const fileBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
            imageBase64 = `data:image/jpeg;base64,${fileBase64}`;
        }

        // Consulta cache
        const cached: any = await getLogoFromCache(imageBase64);
        if (cached != null && typeof cached === 'object' && cached.name) {
            return { status: 'cached', data: cached };
        } else {
            const apiResponse: any = await sendToGoogleVision(imageBase64);
            if (apiResponse && apiResponse.logoRecognized && apiResponse.name) {
                await saveLogoToCache(imageBase64, apiResponse);
                return { status: 'recognized', data: apiResponse };
            } else {
                return { status: 'not_found' };
            }
        }
    } catch (error) {
        return { status: 'error', error };
    }
}