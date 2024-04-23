import React, { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParams } from '../../routes/StackNavigator'
import { WebView } from 'react-native-webview';


export const CredencialScreen = () => {
  const [credencial, setCredencial] = useState('');

  useEffect(() => {
    const OrdenConsultaRequest = async () => {
      try {
        const response = await axios.get('https://andessalud.createch.com.ar/api/credencial?idAfiliado=EB0F3828-DB84-49CC-AE37-6987C1B750FC');
        const vistaCredencial = response.data;
        setCredencial(vistaCredencial);
      } catch (error) {
        console.error('Error al obtener los datos de los afiliados:', error);
      }
    };
    OrdenConsultaRequest();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={{ marginBottom: 5, fontSize: 25 }}>Credencial</Text>
      <WebView
        originWhitelist={['*']}
        source={{ html: credencial }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

/* 
export const CredencialScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const [credencial, setCredencial] = useState(null);

  useEffect(() => {

    const OrdenConsultaRequest = async () => {
      try {
        const response = await axios.get('https://andessalud.createch.com.ar/api/ordenDeConsulta?idAfiliado=1E7DC71B-8D9F-47BF-86C8-2DBAB996AEB6&idAfiliadoTitular=1E7DC71B-8D9F-47BF-86C8-2DBAB996AEB6&idPrestacion=A2C83163-5CCA-40D8-B577-2FCC19E4FAF3&idPrestador=4C0EFE26-4562-488D-9D85-A086DC4A0FA4');
        const vistaCredencial = response.data;
        console.log('este es el Url', vistaCredencial);
        setCredencial(vistaCredencial);
        console.log('este es el afiliados:', credencial);

      } catch (error) {
        console.error('Error al obtener los datos de los afiliados:', error);
      }
    };
    OrdenConsultaRequest()

  }, []);

  const handleOpenURL = () => {
    if (credencial) {
      Linking.openURL(credencial);
    }
  }


  return (
    <View style={globalStyles.container}>

      <Text style={{ marginBottom: 5, fontSize: 25 }}>Credencial</Text>
      <TouchableOpacity onPress={handleOpenURL}>
        <Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15, color: 'blue' }}>
          Orden Link: {credencial}
        </Text>
      </TouchableOpacity>

    </View>
  )
} */