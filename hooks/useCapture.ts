import { useState } from 'react';

export function useCapture(cameraRef: React.RefObject<any>) {
    const [imageUri, setImageUri] = useState<string | null>(null);

    async function captureAndProcess() {
        if (!cameraRef.current) return null;
        const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        setImageUri(photo.uri);
        return photo.uri;
    }

    return { imageUri, captureAndProcess, setImageUri };
}