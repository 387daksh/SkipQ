import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GAME_UI, SPACING } from '@/constants/theme';

export default function OrdersScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
            </View>
            <View style={styles.center}>
                <Text style={styles.empty}>No past orders found.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: GAME_UI.background },
    header: { padding: SPACING.m, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: '900', color: GAME_UI.ink },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    empty: { color: GAME_UI.ink, opacity: 0.5, fontWeight: '700' }
});
