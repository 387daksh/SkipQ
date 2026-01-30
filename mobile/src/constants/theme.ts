import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#00C48C',
    secondary: '#00E0A1',
    accent: '#D9FFF1',
    primaryGradient: ['#00C48C', '#00E0A1'] as const,
    softGlowGradient: ['#D9FFF1', '#E3FFF6'] as const,
    darkGradient: ['#F8FAFC', '#F1F5F9'] as const,
    glassGradient: ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)'] as const,
    lightBg: '#FAFAFA',
    darkBg: '#121212',
    textLight: '#475569',
    textDark: '#FFFFFF',
    textMutedLight: '#94A3B8',
    textMutedDark: '#A0A0A0',
    textMuted: '#94A3B8', // Added alias for compatibility
    cardDark: '#1E1E1E', // Added
    success: '#00C48C',
    error: '#FF3B30',
    warning: '#FFC107',
    white: '#FFFFFF',
    black: '#111214',
    transparent: 'transparent',
};

// Define Theme Interface
export interface ThemeType {
    background: string;
    primary: string;
    primaryBtn: string;
    secondary: string;
    tertiary: string;
    accent: string;
    ink: string;
    card: string;
    white: string;
    danger: string; // Added
    shadows: typeof LIGHT_THEME.shadows;
}

export const LIGHT_THEME = {
    background: '#F9F4EF',
    primary: '#FFD700',
    primaryBtn: '#FFBD59',
    secondary: '#A8DADC',
    tertiary: '#00C48C',
    accent: '#FF6B6B',
    ink: '#000000',
    card: '#FFFFFF',
    white: '#FFFFFF',
    danger: '#EF4444',
    
    shadows: {
        sm: {
            borderWidth: 2,
            borderColor: '#000000',
            shadowColor: '#000000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 4,
        },
        md: {
            borderWidth: 2.5,
            borderColor: '#000000',
            shadowColor: '#000000',
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 6,
        },
        button: {
            borderWidth: 2,
            borderColor: '#000000',
            shadowColor: '#000000',
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 8,
        }
    }
};

export const DARK_THEME: ThemeType = {
    background: '#121212', // Deep Dark Grey
    primary: '#FFD700', // Yellow pops on dark
    primaryBtn: '#FFBD59', // Orange/Apricot
    secondary: '#A8DADC', // Soft Blue
    tertiary: '#00C48C', // Mint
    accent: '#FF6B6B', // Red/Pink
    ink: '#FFFFFF', // Inverted Ink (White)
    card: '#1E1E1E', // Dark Card
    white: '#1E1E1E', // Re-mapped white to card/surface color
    danger: '#EF4444', // Red pops on dark

    
    shadows: {
        sm: {
            borderWidth: 2,
            borderColor: '#FFFFFF', // White Border
            shadowColor: '#000000', // Black Shadow still? Or White?
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 4,
        },
        md: {
            borderWidth: 2.5,
            borderColor: '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 6,
        },
        button: {
            borderWidth: 2,
            borderColor: '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 8,
        }
    }
};

// Legacy Export (Aliases to Light Theme initially, but we want dynamic behavior eventually)
export const GAME_UI = LIGHT_THEME;

export const SPACING = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
};

export const RADIUS = {
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    full: 9999,
};

export const SHADOWS = {
    // Legacy shadows... omit or keep basic
    light: {
        shadowColor: '#111214',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
};

export const FONTS = {
    bold: Platform.select({ ios: 'System', android: 'Roboto' }), 
    medium: Platform.select({ ios: 'System', android: 'Roboto' }),
    regular: Platform.select({ ios: 'System', android: 'Roboto' }),
};
