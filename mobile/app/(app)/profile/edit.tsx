import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { GameInput } from '@/components/ui/GameInput';
import { GameButton } from '@/components/ui/GameButton';
import { GAME_UI, SPACING, RADIUS, COLORS } from '@/constants/theme';
import { useRouter, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getProfile, updateProfile } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { User, Mail, Shield, Camera, ChevronLeft, Save } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user: authUser } = useAuth();
    const { theme, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    // Fetch fresh profile data
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });

    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (profile?.name) {
            setName(profile.name);
        } else if (authUser?.email) {
            setName(authUser.email.split('@')[0]);
        }
    }, [profile, authUser]);

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ['profile'] });
             Alert.alert("Success", "Character updated!");
             router.back();
        },
        onError: () => {
            Alert.alert("Error", "Failed to update profile.");
        },
        onSettled: () => {
            setIsSubmitting(false);
        }
    });

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert("Error", "Name cannot be empty");
            return;
        }
        setIsSubmitting(true);
        mutation.mutate({ name });
    };

    const BG_COLOR = isDark ? '#101010' : '#F4F4F5'; // Matches Profile
    const CARD_BG = isDark ? '#1E1E1E' : '#FFFFFF';
    const TEXT_COLOR = theme.ink;
    const MUTED_COLOR = isDark ? '#888' : '#666';
    const BORDER_COLOR = isDark ? '#333' : '#E5E5E5';

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: BG_COLOR, justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: BG_COLOR }]}>
            <Stack.Screen options={{ headerShown: false }} />
            
            {/* Custom Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: BG_COLOR }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={TEXT_COLOR} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: TEXT_COLOR }]}>CHARACTER SHEET</Text>
                <View style={{ width: 40 }} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* 1. Avatar Section (Initials) */}
                <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.avatarContainer}>
                     <View style={[styles.avatarCircle, { backgroundColor: theme.secondary, borderColor: CARD_BG }]}>
                        <Text style={{ fontSize: 40, fontWeight: '900', color: '#111' }}>
                            {name ? name.charAt(0).toUpperCase() : 'P'}
                        </Text>
                     </View>
                </Animated.View>

                {/* 2. Identity Card */}
                <Animated.View entering={FadeInDown.delay(200).springify()} style={[styles.card, { backgroundColor: CARD_BG, borderColor: BORDER_COLOR }]}>
                    <Text style={[styles.sectionTitle, { color: MUTED_COLOR }]}>IDENTITY</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: TEXT_COLOR }]}>IGN (Name)</Text>
                         <GameInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter Name"
                            placeholderTextColor={isDark ? '#666' : '#999'}
                            leftIcon={<User size={20} color={MUTED_COLOR} />}
                            style={{ backgroundColor: isDark ? '#111' : '#F9F9F9', borderWidth: 0 }}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                            <Text style={[styles.label, { color: TEXT_COLOR, marginBottom: 0 }]}>Email Scroll</Text>
                            <Shield size={12} color={theme.primary} />
                         </View>
                         <GameInput
                            value={profile?.email || authUser?.email || ''}
                            editable={false}
                            leftIcon={<Mail size={20} color={MUTED_COLOR} />}
                            style={{ backgroundColor: isDark ? '#111' : '#F9F9F9', borderWidth: 0, opacity: 0.7 }}
                        />
                    </View>
                </Animated.View>

                {/* 3. Mini Game: Quick Reflex */}
                <Animated.View entering={FadeInDown.delay(300).springify()} style={[styles.card, { backgroundColor: CARD_BG, borderColor: BORDER_COLOR }]}>
                     <Text style={[styles.sectionTitle, { color: MUTED_COLOR }]}>TRAINING</Text>
                     <Text style={{ color: TEXT_COLOR, marginBottom: 16 }}>
                        Hone your ordering skills! Test your reflexes to see if you can beat the queue.
                     </Text>
                     <GameButton 
                        title="PLAY REFLEX GAME"
                        onPress={() => router.push('/(app)/profile/reflex')}
                        variant="secondary"
                     />
                </Animated.View>

            </ScrollView>

            {/* Footer */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={[styles.footer, { backgroundColor: CARD_BG, borderTopColor: BORDER_COLOR, paddingBottom: insets.bottom + 16 }]}>
                    <GameButton 
                        title={isSubmitting ? "SAVING..." : "SAVE CHANGES"}
                        onPress={handleSave} 
                        disabled={isSubmitting}
                        variant="primary"
                        icon={<Save size={20} color="#FFF" />}
                        style={{ width: '100%' }}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.m, paddingBottom: SPACING.m },
    backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
    headerTitle: { fontSize: 16, fontWeight: '900', letterSpacing: 1 },
    
    scrollContent: { padding: SPACING.m, paddingBottom: 120 },
    
    avatarContainer: { alignItems: 'center', marginBottom: SPACING.l },
    avatarCircle: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 4, marginBottom: 16 },
    editBadge: { position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 3 },
    roleText: { fontSize: 14, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
    
    card: { padding: SPACING.m, borderRadius: RADIUS.l, borderWidth: 1, marginBottom: SPACING.m, gap: SPACING.m },
    sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 1, opacity: 0.8 },
    
    inputGroup: { gap: 8 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },

    statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 8 },
    statItem: { alignItems: 'center', flex: 1 },
    statValue: { fontSize: 24, fontWeight: '900' },
    statLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
    divider: { width: 1, height: 30 },

    footer: { padding: SPACING.m, paddingTop: SPACING.m, borderTopWidth: 1 }
});
