import { useNavigation } from '@react-navigation/native'; //supuestamente esto generaba anidacion( revisar )
import React from 'react'
import { Pressable, Text } from 'react-native';
import { globalColors, globalStyles } from '../../theme/theme';

interface Props {
    onPress: () => void;
    label?: string;
    id?: any;
    color?: string;
    disabled?: boolean;
}


export const PrimaryButton = ( { onPress, label, color, disabled }: Props) => {
  const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.profile2);
    const navigation = useNavigation();
   /*  const backColor = color? color : globalColors.profile2; */
  return (
  
    <Pressable
   /*  onPress={ () => onPress() }
    style={ {...globalStyles.primaryButton, backgroundColor: backColor} }> */
    onPress={disabled ? undefined : onPress}
    style={({ pressed }) => [
      {
        backgroundColor: pressed && !disabled ? globalColors.pressed : backColor,
        opacity: disabled ? 0.5 : 1, // Cambia la opacidad si está deshabilitado
      },
      globalStyles.primaryButton
    ]}
  >
      <Text style={ globalStyles.buttonText }>
        {label}
      </Text>
    </Pressable>
  )
}


/* import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {

const navigation = useNavigation();

  return (
    <View style={ globalStyles.container}>
      <Text>Home Screen Perrako</Text>

      <Pressable 
      onPress={ () => navigation.navigate('Products' as never) }
      style={ globalStyles.primaryButton }>
        <Text style={ globalStyles.buttonText }>
          Productos
        </Text>
      </Pressable>
      <Pressable style={ globalStyles.primaryButton }>
        <Text style={ globalStyles.buttonText }>
          Productos
        </Text>
      </Pressable>
      <Pressable style={ globalStyles.primaryButton }>
        <Text style={ globalStyles.buttonText }>
          Productos
        </Text>
      </Pressable>
    </View>
  )
} */