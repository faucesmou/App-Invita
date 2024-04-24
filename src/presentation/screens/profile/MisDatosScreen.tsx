import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParams } from '../../routes/StackNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import { BackButton } from '../../components/shared/BackButton'




export const MisDatosScreen = () => {
  
  const { top } = useSafeAreaInsets();
const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const [afiliado, setAfiliado] = useState(null);

  useEffect(() => {

    const AfiliadosRequest = async () => {
      try {
        const response = await axios.get('https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/consultarAfiliadoJson?usuario=CHATBOT&password=DrtEchat%&administradora=F100376F-33F9-49FD-AFB9-EE53616E7F0C&datosAfiliado=33440385');
        console.log('este es el response', response);
        
        const mappedAfiliados = response.data.map((
          item: {
            apellNomb: any;
            nroAfiliado: any;
            edad: any;
            estadoAfiliacion: any;
            planPrestacional: any
          }) => ({
            apellidoYNombre: item.apellNomb,
            nroAfiliado: item.nroAfiliado,
            edad: item.edad,
            estadoAfiliacion: item.estadoAfiliacion,
            planPrestacional: item.planPrestacional

          }));

        setAfiliado(mappedAfiliados);
        console.log('este es el mappedAfiliados:', mappedAfiliados);

      } catch (error) {
        console.error('Error al obtener los datos de los afiliados:', error);
      }
    };
    AfiliadosRequest()

  }, [])





  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 20,
      marginTop:  top  ,
      backgroundColor: '#e9f6f8'
    }}>

       <HamburgerMenu/>
      <Text style={{ marginBottom: 5, fontSize: 25 }}>Mis Datos padre</Text>
   {/*    <BackButton goToPage="home" /> */}
   <BackButton onPress={() => navigation.navigate('home')} />
      <FlatList
        data={afiliado}
        renderItem={({ item }) => (
      <View>

            <Text style={{ marginBottom: 5, marginTop:15 ,fontSize: 15 }}>{`Nombre; ${item.apellidoYNombre}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{`edad; ${item.edad}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{`edad; ${item.edad}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{`estado afiliacion; ${item.estadoAfiliacion}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{`plan prestacional; ${item.planPrestacional}`}</Text>
      </View>
            )
        }
        />
    </View>
  ) 
}