import { Icon, useTheme } from '@ui-kitten/components';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';


interface Props{
    name: string;
    color?: string;
    white?: boolean;
    style?: StyleProp<ViewStyle>; 
    isDisabled?: boolean; 
}

export const MyIcon = ({ name, color, white= false, style, isDisabled}: Props ) => {

    const theme = useTheme();
    
    if( white ){
        color = theme['color-info-100'];        
    } else if (!color){
        color = theme['text-basic-color']
    } else {
        color = theme[color] ?? theme['text-basic-color'];
    }
 
    return <Icon  style={[styles.icon, style, isDisabled ? styles.iconDisabled : {}]} /* style={styles.icon}  */fill={color} name={ name } />
  
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
    iconDisabled: {
        opacity: 0.2, // Reduce la opacidad para simular deshabilitado
    },
})