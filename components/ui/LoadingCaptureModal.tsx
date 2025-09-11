import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

interface LoadingCaptureModalProps {
    visible: boolean;
    onFinish?: () => void;
    minDuration?: number; // em ms
}

export function LoadingCaptureModal({ visible, onFinish, minDuration = 3000 }: LoadingCaptureModalProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timer: number;
        if (visible) {
            setShow(true);
            timer = setTimeout(() => {
                if (onFinish) onFinish();
            }, minDuration);
        } else {
            setShow(false);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [visible, minDuration, onFinish]);

    return (
        <Modal visible={show} transparent animationType="fade">
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color={Colors.global.blueLight} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});