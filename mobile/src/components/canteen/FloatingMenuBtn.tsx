import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Menu } from 'lucide-react-native'; // Menu icon
import { COLORS, GAME_UI } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface FloatingMenuBtnProps {
    onPress: () => void;
    hasCart: boolean;
}

export const FloatingMenuBtn = ({ onPress, hasCart }: FloatingMenuBtnProps) => {
    return (
        <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ 
                scale: 1, 
                opacity: 1,
                bottom: hasCart ? 110 : 40 
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={styles.wrapper}
        >
            <Pressable 
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    onPress();
                }}
                style={({ pressed }) => [
                    styles.container,
                    pressed && styles.pressed
                ]}
            >
                <Menu size={20} color={GAME_UI.white} strokeWidth={3} />
                <Text style={styles.text}>MENU</Text>
            </Pressable>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        // Bottom is animated
        right: 20,
        zIndex: 90,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GAME_UI.ink, // Black Background
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30, // Pill
        // borderWidth: 2, // No border needed if black
        // borderColor: GAME_UI.white, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        gap: 8,
    },
    pressed: {
        transform: [{ scale: 0.95 }],
    },
    text: {
        color: GAME_UI.white, // White Text
        fontSize: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
    }
});
