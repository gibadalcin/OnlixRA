import { router, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Image } from 'expo-image';
import { initLogoCache } from '@/hooks/useLogoCache';

export default function SplashScreen() {
    const loadProgress = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Inicia a animação da barra de progresso
        Animated.timing(loadProgress, {
            toValue: 1, // Anima de 0 a 1
            duration: 3000, // Duração de 2 segundos
            useNativeDriver: false,
        }).start(() => {
            // Adiciona um pequeno delay para suavizar a transição
            setTimeout(() => {
                router.replace('/(tabs)');
            }, 300);
        });
    }, []);

    useEffect(() => {
        initLogoCache();
    }, []);

    const progressBarWidth = loadProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                        animation: 'fade', // Transição de esmaecimento (fade)
                    }}
                />
                <Image
                    source={require('../assets/images/splash-icon.png')}
                    style={styles.logo}
                    contentFit='contain' />

                <View style={styles.progressBarContainer}>
                    <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0047AB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 240,
        height: 200,
    },
    progressBarContainer: {
        height: 4,
        width: '60%',
        backgroundColor: '#B3CDE0',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 40,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 20,

    },
    progressBar: {
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
});