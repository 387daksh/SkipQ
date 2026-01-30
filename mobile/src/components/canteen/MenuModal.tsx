import { View, Text, StyleSheet, Pressable, ScrollView, Modal, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { X } from 'lucide-react-native';
import { COLORS, SPACING, GAME_UI } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface Category {
    id: string;
    name: string;
    count?: number; // Optional count if we have it
}

interface MenuModalProps {
    visible: boolean;
    onClose: () => void;
    categories: Category[];
    onSelectCategory: (id: string) => void;
}

export const MenuModal = ({ visible, onClose, categories, onSelectCategory }: MenuModalProps) => {

    const handleSelect = (id: string) => {
        Haptics.selectionAsync();
        onSelectCategory(id);
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
                   <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
                </Pressable>

                {/* Pop Up from Bottom Right */}
                <MotiView 
                    from={{ scale: 0.8, opacity: 0, translateY: 50 }}
                    animate={{ scale: 1, opacity: 1, translateY: 0 }}
                    exit={{ scale: 0.8, opacity: 0, translateY: 50 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    style={styles.popover}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Menu</Text>
                        <Text style={styles.subtitle}>{categories.length} Categories</Text>
                    </View>

                    <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
                        {categories.map((cat, index) => (
                            <Pressable 
                                key={cat.id} 
                                onPress={() => handleSelect(cat.id)}
                                style={({ pressed }) => [
                                    styles.item,
                                    pressed && styles.itemPressed
                                ]}
                            >
                                <Text style={styles.itemText}>{cat.name}</Text>
                                {/* <Text style={styles.itemCount}>{cat.count || 0}</Text> */} 
                            </Pressable>
                        ))}
                    </ScrollView>
                    
                    <Pressable onPress={onClose} style={styles.closeBtn}>
                         <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </MotiView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end', // Align to right
        padding: 20,
        paddingBottom: 90, // Above FAB
    },
    popover: {
        width: 260,
        backgroundColor: GAME_UI.ink, // Dark Theme as requested
        borderRadius: 20,
        borderWidth: 2,
        borderColor: GAME_UI.white, // White border on black
        overflow: 'hidden',
        // Hard Shadow
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        elevation: 10,
    },
    header: {
        padding: SPACING.m,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        backgroundColor: '#111',
    },
    title: {
        color: GAME_UI.primary, // Yellow
        fontSize: 20,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    subtitle: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    list: {
        maxHeight: 250,
    },
    listContent: {
        padding: SPACING.s,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 4,
    },
    itemPressed: {
        backgroundColor: '#333',
    },
    itemText: {
        color: GAME_UI.white,
        fontSize: 16,
        fontWeight: '700',
    },
    itemCount: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
    },
    closeBtn: {
        padding: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#333',
        backgroundColor: '#111',
    },
    closeText: {
        color: COLORS.error,
        fontWeight: '800',
    }
});
