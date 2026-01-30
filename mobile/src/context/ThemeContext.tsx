import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { LIGHT_THEME, DARK_THEME, ThemeType } from '../constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceScheme = useDeviceColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');
  const [activeTheme, setActiveTheme] = useState<ThemeType>(LIGHT_THEME);

  // Load saved preference
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('theme_mode');
        if (saved) setMode(saved as ThemeMode);
      } catch (e) {
        console.error('Failed to load theme', e);
      }
    })();
  }, []);

  // Sync theme with mode/device
  useEffect(() => {
    const isDark = mode === 'dark' || (mode === 'system' && deviceScheme === 'dark');
    setActiveTheme(isDark ? DARK_THEME : LIGHT_THEME);
    
    // Persist
    AsyncStorage.setItem('theme_mode', mode).catch(() => {});
  }, [mode, deviceScheme]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    theme: activeTheme,
    mode,
    setMode,
    isDark: activeTheme === DARK_THEME,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
