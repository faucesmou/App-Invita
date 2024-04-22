import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParams } from '../../routes/StackNavigator'




export const MisDatosScreen = () => {


  const [afiliado, setAfiliado] = useState(null);

  useEffect(() => {

    const AfiliadosRequest = async () => {
      try {
        const response = await axios.get('https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/consultarAfiliadoJson?usuario=CHATBOT&password=DrtEchat%&administradora=F100376F-33F9-49FD-AFB9-EE53616E7F0C&datosAfiliado=33440385');
        console.log('este es el response', response);
        
        const mappedAfiliados = response.data.data.map((
          item: {
            apellidoYNombre: any;
            nroAfiliado: any;
            edad: any;
            estadoAfiliacion: any;
            planPrestacional: any
          }) => ({
            apellidoYNombre: item.apellidoYNombre,
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





  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  return (
    <View style={globalStyles.container}>
      <Text style={{ marginBottom: 5, fontSize: 25 }}>Mis Datos</Text>

      <FlatList
        data={afiliado}
        renderItem={({ item }) => (
      <View>
            <Text style={{ marginBottom: 5, fontSize: 25 }}>Mis Datos</Text>
            <Text style={{ marginBottom: 5, fontSize: 25 }}>{`Nombre; ${item.apellidoYNombre}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 25 }}>{`edad; ${item.edad}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 25 }}>{`edad; ${item.edad}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 25 }}>{`estado afiliacion; ${item.estadoAfiliacion}`}</Text>
            <Text style={{ marginBottom: 5, fontSize: 25 }}>{`plan prestacional; ${item.planPrestacional}`}</Text>
      </View>
            )
        }
        />
    </View>
  ) 
}