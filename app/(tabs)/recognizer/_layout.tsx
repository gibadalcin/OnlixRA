import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { setVisibilityAsync } from 'expo-navigation-bar';
import { getHeaderOptions } from '../../../components/ui/HeaderOptions'; // Importe a função

export default function RecognizerLayout() {
    useEffect(() => {
        setVisibilityAsync('hidden');
    }, []);

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={getHeaderOptions('Captura de Imagem', require('../../../assets/images/icon.png'))}
            />
            <Stack.Screen
                name="history"
                options={getHeaderOptions('Histórico de favoritos')}
            />
        </Stack>
    );
};