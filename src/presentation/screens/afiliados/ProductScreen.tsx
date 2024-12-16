import React, { useEffect } from 'react'
import { Pressable, Text, View, Dimensions } from 'react-native'
import { RootStackParams } from '../../routes/StackNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { globalColors, globalStyles } from '../../theme/theme';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { BackButton } from '../../components/shared/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import Credencial from '../../components/shared/Credencial';
import { CredencialFamiliar } from '../../components/shared/CredencialFamiliar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const ProductScreen = () => {

  const { top } = useSafeAreaInsets();
 const heightWanted = top - 25;

const params = useRoute<RouteProp<RootStackParams, 'Product'>>().params;
console.log('ESTE ES EL PARAMS: ---->--->', params);

const idAfiliado = params.idAfiliado;
console.log('ESTE ES EL idAfiliado: ---->--->',idAfiliado);

const navigation = useNavigation();

/* 
useEffect(() => {
navigation.setOptions({
  title:params.name,
  headerStyle: {
    backgroundColor: '#57e312', 
  },
  
})
}, []); */

  // Función para manejar el retroceso
  const handleGoBack = () => {
    navigation.goBack(); // Retroceder a la pantalla anterior
  };

  function capitalizeWords(input: string | undefined): string {
    if (!input) {
      return "";
    }
    return input.replace(/\b\p{L}+/gu, function (word) {
      return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
    });
  }

  return (
    <View 
    style={{...globalStyles.productScreen, marginTop: 0 }}
    >
      <CustomHeader /* color={globalColors.black}  */titleSize={hp('4%')}   />
      
      <BackButton Size={hp('4%')}  /> 

      <View
      style={{ 
        justifyContent: 'center', 
        alignItems: 'center' ,
       /*  backgroundColor: 'yellow',  */ 
      }}
      >
       {/*  <Text
        style={{ 
          fontSize: 35, 
          marginBottom: 10 
        }}
        > Credencial</Text> */}

        <Text style={{
        marginBottom: wp('2%'),
        marginTop: wp('2%'),
        fontSize: hp('3%'),
        textAlign: 'center',
        color: globalColors.gray,
        fontWeight: 'bold'
      }}>
        {/*  { params.id } */}  
          {capitalizeWords(params.id)}
      </Text>

       {/*  <Text style={{
          fontSize:15,
          textAlign: 'center',
          marginTop: 25
        }}>
          id Afiliado: { params.idAfiliado }  
        </Text> */}

      </View>

      <View
        style={{
          /* marginBottom: 350, marginTop: 0, */   /*  backgroundColor: 'yellow', */ flex: 1,  justifyContent: 'top',
          alignItems: 'center', marginHorizontal:'10%', marginTop: -15,
        }}
      >

        <CredencialFamiliar idAfiliado={idAfiliado} />

      </View>

    </View>
  )
}