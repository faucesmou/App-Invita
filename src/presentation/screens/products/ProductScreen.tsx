import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { RootStackParams } from '../../routes/StackNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../theme/theme';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { BackButton } from '../../components/shared/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProductScreen = () => {

  const { top } = useSafeAreaInsets();

const params = useRoute<RouteProp<RootStackParams, 'Product'>>().params;
const navigation = useNavigation();


useEffect(() => {
navigation.setOptions({
  title:params.name
})
}, []);

  // Función para manejar el retroceso
  const handleGoBack = () => {
    navigation.goBack(); // Retroceder a la pantalla anterior
  };

  return (
    <View 
    style={{
      flex: 1,
      paddingHorizontal: 20,
      marginTop:  top  ,
      backgroundColor: '#e9f6f8'
    }}
    >
      
      <BackButton /> 

      <View
      style={{ 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
      >
        <Text
        style={{ 
          fontSize: 35, 
          marginBottom: 10 
        }}
        > Product Screen</Text>

        <Text style={{
          fontSize:25,
          textAlign: 'center',
          marginTop: 25
        }}>
          { params.id } - { params.name }
        </Text>

      </View>

    </View>
  )
}