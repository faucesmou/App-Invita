import React, { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalColors, globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import { BackButton } from '../../components/shared/BackButton'
import CustomHeader from '../../components/CustomHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { useAuthStore } from '../../store/auth/useAuthStore'



export const MiOrdenConsultaScreen = () => {

  const {  idAfiliadoTitular, idPrestacion, idPrestador, idAfiliadoSeleccionado } = useAuthStore();
/*   console.log('id idAfiliadoSeleccionado: ', idAfiliadoSeleccionado);
  console.log(' titular orden de consulta: ',  idAfiliadoTitular );
  console.log('prestacion: ',  idPrestacion ); */
  
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const { top } = useSafeAreaInsets();

  const [ordenConsulta, setOrdenConsulta] = useState(null);
  const [isConsulting, setIsConsulting] = useState(false);
  useEffect(() => {

    const OrdenConsultaRequest = async () => {
      try {
        setIsConsulting(true);
        const response = await axios.get(`https://andessalud.createch.com.ar/api/ordenDeConsulta?idAfiliado=${idAfiliadoSeleccionado}&idAfiliadoTitular=${idAfiliadoTitular}&idPrestacion=${idPrestacion}&idPrestador=${idPrestador}`);
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
        marginTop: 0,
         backgroundColor: 'white' 
      }}
      >
      <HamburgerMenu />
      <CustomHeader color={globalColors.gray2} />
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
          <View 
          style={{
             marginTop:10,
             backgroundColor: 'white' 
          }}
          >
           

            <Text style={{ marginBottom: 5, fontSize: 25, }}>Orden generada</Text>
            <Text style={{ marginBottom: 5, fontSize: 20, }}>Ingrese al siguiente link para su descarga:</Text>
            <TouchableOpacity onPress={handleOpenURL}>
              <Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15, color: 'blue' }}>
                {ordenConsulta}
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