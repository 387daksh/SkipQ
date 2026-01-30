import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { GAME_UI } from '../../constants/theme';

export const DotPattern = ({ 
    children, 
    style 
}: { 
    children?: React.ReactNode, 
    style?: any 
}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={StyleSheet.absoluteFill}>
                 <Svg height="100%" width="100%">
                    <Defs>
                        <Pattern
                            id="dot-pattern"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <Circle cx="2" cy="2" r="1.5" fill={GAME_UI.ink} opacity="0.08" />
                        </Pattern>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="transparent" />
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
                </Svg>
            </View>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: GAME_UI.background }
});
