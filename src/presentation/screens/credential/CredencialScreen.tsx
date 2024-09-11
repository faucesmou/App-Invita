import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalStyles } from '../../theme/theme'

import { WebView } from 'react-native-webview';
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import CustomHeader from '../../components/CustomHeader'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const CredencialScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [credencial, setCredencial] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  useEffect(() => {
    const OrdenConsultaRequest = async () => {
      try {
        setIsConsulting(true);
        const response = await axios.get('https://andessalud.createch.com.ar/api/credencial?idAfiliado=EB0F3828-DB84-49CC-AE37-6987C1B750FC');
        console.log('este es el response', response);
        const vistaCredencial = response.data;
        console.log('este es el vistaCredencial e', vistaCredencial);
        setCredencial(vistaCredencial);
        setIsConsulting(false);
      } catch (error) {
        console.error('Error al obtener los datos de los afiliados:', error);
      }
    };
    OrdenConsultaRequest();
  }, []);

  const handleGoBack = () => {
    navigation.goBack(); // Retroceder a la pantalla anterior
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader titleSize={hp('4%')} />

      <HamburgerMenu />
      {/*     <BackButton onPress={() => navigation.navigate('home')} /> */}
      {
        isConsulting ? (<FullScreenLoader />)
          :

          <WebView
            originWhitelist={['*']}
            source={{ html: credencial }}
            style={{ flex: 1 }}
          />
      }
    </View>
  );
};
