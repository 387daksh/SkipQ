import { View, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, GAME_UI } from '../../constants/theme';
import { useState } from 'react';
import { GameButton } from '../ui/GameButton';

const CATEGORIES = [
    { id: 'all', label: '🔥 Trending' },
    { id: 'healthy', label: '🥗 Healthy' },
    { id: 'comfort', label: '🍔 Comfort' },
    { id: 'sips', label: '🥤 Sips' },
    { id: 'dessert', label: '🍩 Sweet' },
];

type CategoryRailProps = {
    onSelect?: (id: string) => void;
};

export const CategoryRail = ({ onSelect }: CategoryRailProps = {}) => {
    const [selected, setSelected] = useState('all');

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {CATEGORIES.map((cat) => {
                const isSelected = selected === cat.id;

                return (
                    <View key={cat.id} style={{ marginRight: SPACING.s }}>
                        <GameButton
                            title={cat.label}
                            size="sm"
                            variant={isSelected ? 'primary' : 'outline'}
                            onPress={() => {
                                setSelected(cat.id);
                                if (onSelect) onSelect(cat.id);
                            }}
                        />
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: SPACING.m, paddingVertical: SPACING.s },
});
