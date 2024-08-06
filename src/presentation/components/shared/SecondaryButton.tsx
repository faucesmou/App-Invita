import { useNavigation } from '@react-navigation/native'; //supuestamente esto generaba anidacion( revisar )
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../../theme/theme';
import { IonIcon } from './IonIcon';
import { useWindowDimensions } from 'react-native'; 
/* import { scale } from 'react-native-size-matters'; INVESTIGAR */

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
  const { width, height } = useWindowDimensions();
  
  const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.background);
  console.log('backColor', backColor)
  const navigation = useNavigation();
  /*  const backColor = color? color : globalColors.profile2; */

  return (
    <View style={[styles.contentWrapper22, { width: width, height: height / 6 }]}>{/* prueba temporal del responsive */}

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
          <IonIcon name={iconName} size={30} color="#505050" style={styles.icon} />
          <Text style={styles.buttonText}>{label}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  secondaryButton: {
    flex:1, //agregado prueba
    /*     backgroundColor: 'orange', */
    minWidth: '30%',   // Esto asegura que los botones ocupen al menos la mitad del ancho disponible
    maxHeight: '90%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    margin: 5,
    marginTop: 0,
    padding: 10,
    alignItems: 'flex-start',
    textAlign: 'center',
  },
  contentWrapper2: {
    flex: 1, // Ocupa todo el espacio disponible en el botón
    flexDirection: 'column',
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'space-between', // Distribuye verticalmente
    padding: 10, // Espacio interno
  },
  contentWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    /*  justifyContent: 'space-between', */
    maxWidth: '50%',
    maxHeight:'95%',
    minWidth: '100%',
    minHeight: '80%',
    marginTop: '0%',
    padding: 0,
 /*   backgroundColor: 'blue',   */
  },
  contentWrapper22: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    /*  justifyContent: 'space-between', */
    maxWidth: '50%',
    minWidth: '100%',
    minHeight: '80%',
    marginTop: '2%',
/*     backgroundColor: 'yellow', */
   /*     backgroundColor: 'blue',  */
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 5, // Espacio entre el texto y la descripción
    marginTop: 5,
   /*   backgroundColor: 'yellow', */
    justifyContent: 'flex-start',
  },
  icon: {
    alignItems: 'flex-start',
    /*     backgroundColor: 'yellow', */
    marginBottom: 0,
  },
  descriptionText: {
    color: '#505050',
    fontSize: 18,
    flexWrap: 'wrap',
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