import { useNavigation } from '@react-navigation/native'; //supuestamente esto generaba anidacion( revisar )
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../../theme/theme';
import { IonIcon } from './IonIcon';

interface Props {
  onPress: () => void;
  label?: string;
  id?: any;
  color?: string;
  disabled?: boolean;
  iconName?: string;
  description?: string;
}


export const SecondaryButton = ({ onPress, label, color, disabled, iconName, description }: Props) => {
  const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.background);
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
          backgroundColor: pressed && !disabled ? 'lightgray' : backColor,
          opacity: disabled ? 0.5 : 1, // Cambia la opacidad si está deshabilitado
        },
        styles.secondaryButton
      ]}
    >
      {/* Icono y texto */}
      <View style={styles.contentWrapper}>
        <IonIcon name={iconName} size={35} color="#505050" style={styles.icon} />
        <Text style={styles.buttonText}>{label}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

    </Pressable>
  )
}
const styles = StyleSheet.create({
  secondaryButton: {
    /*     backgroundColor: 'orange', */
    minWidth: '30%',   // Esto asegura que los botones ocupen al menos la mitad del ancho disponible
    maxHeight: '90%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    margin: 5,
    marginTop: 5,
    padding: 15,
    alignItems: 'flex-start',
    textAlign: 'center',
  },
  contentWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    /*  justifyContent: 'space-between', */
    maxWidth: '50%',
    minWidth: '100%',
    minHeight: '80%',
    /*     backgroundColor: 'green', */
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 5, // Espacio entre el texto y la descripción
    marginTop: 5,
    /*  backgroundColor: 'yellow', */
    justifyContent: 'flex-start',
  },
  icon: {
    alignItems: 'flex-start',
    /*     backgroundColor: 'yellow', */
    marginBottom: 0,
  },
  descriptionText: {
    color: '#505050',
    fontSize: 19,
    flexWrap: 'wrap',
    /*    backgroundColor: 'blue',  */
    minWidth: '100%',
    maxHeight: '50%',
    overflow: 'hidden',
  },
});

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

{/*  {iconName && (
          <View style={globalStyles.iconWrapper}>
            <IonIcon name={iconName} size={30} color="black"   />
          </View>
        )}
        {label && (
          <Text style={globalStyles.buttonText3}>
            {label}
          </Text>
        )}
            {description && (
            <Text style={globalStyles.descriptionText}>
              {description}
            </Text>
          )}  */}

{/*       <Text style={ globalStyles.buttonText3 }>
        {label}
      </Text> */}