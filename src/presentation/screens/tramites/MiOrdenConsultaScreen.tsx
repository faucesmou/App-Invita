import React, { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import { BackButton } from '../../components/shared/BackButton'
import CustomHeader from '../../components/CustomHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'





export const MiOrdenConsultaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const { top } = useSafeAreaInsets();

  const [ordenConsulta, setOrdenConsulta] = useState(null);
  const [isConsulting, setIsConsulting] = useState(false);
  useEffect(() => {

    const OrdenConsultaRequest = async () => {
      try {
        setIsConsulting(true);
        const response = await axios.get('https://andessalud.createch.com.ar/api/ordenDeConsulta?idAfiliado=1E7DC71B-8D9F-47BF-86C8-2DBAB996AEB6&idAfiliadoTitular=1E7DC71B-8D9F-47BF-86C8-2DBAB996AEB6&idPrestacion=A2C83163-5CCA-40D8-B577-2FCC19E4FAF3&idPrestador=4C0EFE26-4562-488D-9D85-A086DC4A0FA4');
        const Url = response.data;
        console.log('este es el Url', Url);
        setOrdenConsulta(Url);
        console.log('este es el afiliados:', ordenConsulta);
        setIsConsulting(false);

      } catch (error) {
        console.error('Error al obtener los datos de los afiliados:', error);
      }
    };
    OrdenConsultaRequest()

  }, []);

  const handleOpenURL = () => {
    if (ordenConsulta) {
      Linking.openURL(ordenConsulta);
    }
  }


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: top,
        /*  backgroundColor: '#e9f6f8' */
      }}
      >
      <HamburgerMenu />
      <CustomHeader />
      <BackButton onPress={() => navigation.navigate('home')} />
      {
        isConsulting ? (
          <View
          style={{
            flex: 0.5,
            marginTop: top - 10,
          }}
          >
            <FullScreenLoader />       
          </View>
        )
          :
          <View>
           

            <Text style={{ marginBottom: 5, fontSize: 25 }}>Orden de Consulta Link:</Text>
            <TouchableOpacity onPress={handleOpenURL}>
              <Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15, color: 'blue' }}>
                Orden Link: {ordenConsulta}
              </Text>
            </TouchableOpacity>

            
            </View>
          
      }
           {/*  <Text style={{ marginBottom: 5, fontSize: 25 }}>Orden de Consulta Link:</Text> */}
            {/*       <Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15 }}>{`Orden Link: ${ordenConsulta}`}</Text>
          <Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15 }}>{`Orden Link: ${ordenConsulta}`}</Text> */}

          </View>
  )
}