import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { IonIcon } from './IonIcon';

interface BackButtonProps {
  goToPage?: string;
  onPress?: () => void;
}

export const BackButton = ({ goToPage, onPress }: BackButtonProps) => {

    const navigation = useNavigation();


    // Función para manejar el retroceso
const handleGoBack = () => {
 navigation.goBack(); // Retroceder a la pantalla anterior
};

const handlePress = () => {
  if (onPress) {
    onPress(); // Llama a la función de callback proporcionada
 } else {
   navigation.goBack(); // Retroceder a la pantalla anterior
 }
};

    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Pressable onPress={handlePress}
            style={{marginLeft:20}}
            >
           <IonIcon name='arrow-back' color= { 'blue' } size = {35}/> 
            </Pressable>
            
          )
        })
        
      }, [navigation, goToPage])


      return (<></>);
}
