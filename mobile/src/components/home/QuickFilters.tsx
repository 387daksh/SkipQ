import { View, StyleSheet, ScrollView } from 'react-native';
import { GameButton } from '../ui/GameButton';
import { SPACING } from '../../constants/theme';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const FILTERS = [
    { id: 'open', label: 'Open Now' },
    { id: 'rated', label: 'Top Rated' },
    { id: 'budget', label: 'Budget Friendly' },
];

export const QuickFilters = ({ onSelect }: { onSelect?: (id: string) => void }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const { theme, isDark } = useTheme();

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {FILTERS.map((f) => {
                const isSelected = selected === f.id;
                return (
                    <View key={f.id} style={{ marginRight: SPACING.s }}>
                        <GameButton 
                            title={f.label} 
                            size="sm" 
                            variant={isSelected ? 'primary' : 'outline'}
                            style={isDark && !isSelected ? { 
                                backgroundColor: '#1E1E1E', 
                                borderColor: '#FFF' 
                            } : undefined}
                            textStyle={isDark && !isSelected ? { color: '#FFF' } : undefined}
                            onPress={() => {
                                const newState = isSelected ? null : f.id;
                                setSelected(newState);
                                onSelect?.(newState || '');
                            }}
                        />
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: SPACING.m, paddingBottom: SPACING.m }
});
