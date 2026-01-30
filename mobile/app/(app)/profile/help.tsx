import { View, Text, StyleSheet } from 'react-native';
import { GAME_UI, SPACING } from '@/constants/theme';

export default function HelpScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Help & Support</Text>
            </View>
            <View style={{ padding: SPACING.m }}>
                <Text style={{ color: GAME_UI.ink, fontSize: 16 }}>
                    For support, contact us at help@skipq.com
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: GAME_UI.background },
    header: { padding: SPACING.m, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: '900', color: GAME_UI.ink },
});
