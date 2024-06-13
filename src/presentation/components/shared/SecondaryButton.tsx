import { useNavigation } from '@react-navigation/native'; //supuestamente esto generaba anidacion( revisar )
import React from 'react'
import { Pressable, Text, View  } from 'react-native';
import { globalColors, globalStyles } from '../../theme/theme';
import { IonIcon } from './IonIcon';

interface Props {
    onPress: () => void;
    label?: string;
    id?: any;
    color?: string;
    disabled?: boolean;
    iconName?: string;
}


export const SecondaryButton = ( { onPress, label, color, disabled, iconName }: Props) => {
  const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.yellow);
  console.log('backColor', backColor)  
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
      globalStyles.secondaryButton2
    ]}
  >
    <View style={globalStyles.contentWrapper}>
    {iconName && (
          <View style={globalStyles.iconWrapper}>
            <IonIcon name={iconName} size={30} color="black" /* style={styles.icon}  *//>
          </View>
        )}
        {label && (
          <Text style={globalStyles.buttonText3}>
            {label}
          </Text>
        )}
    </View>
{/*       <Text style={ globalStyles.buttonText3 }>
        {label}
      </Text> */}
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