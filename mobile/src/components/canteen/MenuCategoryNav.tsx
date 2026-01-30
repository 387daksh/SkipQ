import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { SPACING, RADIUS, GAME_UI } from '../../constants/theme';

interface Category {
    id: string;
    name: string;
}

interface MenuCategoryNavProps {
    categories: Category[];
    selectedCategory: string;
    onSelect: (id: string) => void;
}

export const MenuCategoryNav = ({ categories, selectedCategory, onSelect }: MenuCategoryNavProps) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                        <Pressable
                            key={cat.id}
                            onPress={() => {
                                Haptics.selectionAsync();
                                onSelect(cat.id);
                            }}
                            style={{ marginRight: SPACING.s }}
                        >
                            <MotiView
                                animate={{
                                    backgroundColor: isSelected ? GAME_UI.primary : GAME_UI.white, // Yellow vs White
                                    scale: isSelected ? 1 : 0.95,
                                }}
                                transition={{ type: 'spring', damping: 12 }}
                                style={[
                                    styles.pill,
                                    // Active state gets the shadow
                                    isSelected && GAME_UI.shadows.sm
                                ]}
                            >
                                <Text style={[
                                    styles.text, 
                                    isSelected && styles.textSelected
                                ]}>
                                    {cat.name}
                                </Text>
                            </MotiView>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: GAME_UI.background,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: GAME_UI.ink,
    },
    scrollContent: {
        paddingHorizontal: SPACING.m,
    },
    pill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12, // Blocky radius
        borderWidth: 2,
        borderColor: GAME_UI.ink,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: GAME_UI.ink, // Always black
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    textSelected: {
        fontWeight: '900',
    },
});
