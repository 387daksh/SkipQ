import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { COLORS, SPACING } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Section {
    title: string;
    body: string[];
}

interface LegalPageProps {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: Section[];
    footerText?: string;
}

export const LegalPageLayout: React.FC<LegalPageProps> = ({ 
    title, 
    lastUpdated, 
    intro, 
    sections, 
    footerText 
}) => {
    const { theme, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    const TEXT_COLOR = theme.ink;
    const MUTED_COLOR = isDark ? '#888' : '#666';
    const HEADING_COLOR = theme.ink;
    const BG_COLOR = theme.background;

    return (
        <View style={[styles.container, { backgroundColor: BG_COLOR }]}>
            <Stack.Screen options={{ title: '', headerBackTitle: 'Back', headerTintColor: theme.primary }} />
            
            <ScrollView 
                contentContainerStyle={{ 
                    padding: SPACING.l, 
                    paddingBottom: insets.bottom + 40 
                }}
            >
                <Text style={[styles.title, { color: HEADING_COLOR }]}>{title}</Text>
                <Text style={[styles.meta, { color: MUTED_COLOR }]}>Last updated: {lastUpdated}</Text>
                
                <Text style={[styles.intro, { color: TEXT_COLOR }]}>{intro}</Text>

                <View style={styles.divider} />

                {sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: HEADING_COLOR }]}>{section.title}</Text>
                        <View style={styles.list}>
                            {section.body.map((item, i) => (
                                <View key={i} style={styles.listItem}>
                                    <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
                                    <Text style={[styles.bodyText, { color: TEXT_COLOR }]}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {footerText && (
                    <Text style={[styles.footer, { color: MUTED_COLOR }]}>{footerText}</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
    meta: { fontSize: 13, marginBottom: 24, fontStyle: 'italic' },
    intro: { fontSize: 16, lineHeight: 24, marginBottom: 24 },
    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: 24 },
    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
    list: { gap: 12 },
    listItem: { flexDirection: 'row', gap: 12 },
    bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
    bodyText: { flex: 1, fontSize: 15, lineHeight: 22 },
    footer: { fontSize: 13, textAlign: 'center', marginTop: 20, opacity: 0.8 }
});
