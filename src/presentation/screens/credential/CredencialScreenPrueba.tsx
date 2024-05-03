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
import { Text, Layout } from '@ui-kitten/components'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { xml2json } from 'xml-js';
const convert = { xml2json };

import { credencialStyles, credentialsColors, globalStylesCredentials } from '../credential/css/themeCredentials'

export const CredencialScreenPrueba = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [credencial, setCredencial] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [datosCredencial, setDatosCredencial] = useState<any>({
    plan: '',
    nombreAfiliado: '',
    numAfiliado: '',
    fecVencimiento: ''
  });
  //const {queryIdAfiliado} = useAuthStore();
  //momentaneamente vamos a definir el queryIdAfiliado nosotros aqui: pero en el caso real desde el login se hace la consulta a la funcion correspondiente:
  /*     const consultaDatosCredencial = async (queryIdAfiliado: string| undefined) => {  */
  
  useEffect(() => {
    
    const consultaDatosCredencial = async () => { 
      
        let queryIdAfiliado = 'EB0F3828-DB84-49CC-AE37-6987C1B750FC'
        console.log('esta es la queryId desde LoginScreen', queryIdAfiliado );
        try {

          setIsConsulting(true);
      let response = await axios({
          method: 'get',
          url: `https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscaDatoCredencial?IMEI=ADMCE09D187-8D2C-4592-AE43-87B0D657299C&idAfiliado=${queryIdAfiliado}`,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      console.log(' este es el response de la peticion de datos de credencial desde credencial Screen antes de convertir', response);
      
      let data = await response.data
          let resultado = convert.xml2json(data, { compact: true, spaces: 4 })
          let parseado = JSON.parse(resultado)

          let nombreAfiliado = parseado.Resultado.fila.tablaEncabezado.nombreAfiliado._text
          let numAfiliado = parseado.Resultado.fila.tablaEncabezado.numAfiliado._text
          let fecVencimiento = parseado.Resultado.fila.tablaEncabezado.fecVencimiento._text
          let tipoTarjeta = parseado.Resultado.fila.tablaEncabezado.tipoTarjeta._text

          tipoTarjeta = tipoTarjeta.substring(tipoTarjeta.lastIndexOf(' ') + 1).toLowerCase()
          
          setIsConsulting(false);
           // Almacenar los datos de la credencial en el estado
        setDatosCredencial({
          plan: tipoTarjeta,
          nombreAfiliado:nombreAfiliado,
          numAfiliado: numAfiliado,
          fecVencimiento:fecVencimiento,
        });
      } catch (error) {
          console.log(error);
          return null
      }
    }



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
        setIsConsulting(false);
      }
      
    };
 /*    OrdenConsultaRequest(); */
    consultaDatosCredencial(/* queryIdAfiliado */);
  }, []);

  const handleGoBack = () => {
    navigation.goBack(); // Retroceder a la pantalla anterior
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader />

      <HamburgerMenu />
      {/*     <BackButton onPress={() => navigation.navigate('home')} /> */}
      {
        isConsulting ? (<FullScreenLoader />)
          :

          (
            <View style={ { flex:1 }}/* style={ {...credencialStyles.container, flex:1}} */>
              <Text style={{ textAlign: 'center', fontSize: 24 }}>Tu Credencial</Text>
              <View style={globalStylesCredentials.frenteCard}>
                <View >
                  <View style={ {backgroundColor: credentialsColors.yellow}/* backgroundColor: credentialsColors.green */ /* padding: 10 */ }>
                    <Text>Plan {datosCredencial.plan}</Text>
                    <Text>{datosCredencial.nombreAfiliado}</Text>
                    <Text>{datosCredencial.numAfiliado}</Text>
                    <Text>{datosCredencial.fecVencimiento}</Text>
                  </View>
                </View>
                <Layout style={{ height: 10 }} />
                <View style={{ flex: 1, backgroundColor: credentialsColors.green }}>
                  <View >
                    <Text>Esta credencial es personal e intransferible para uso exclusivo del titular. Debe presentarse acompañado de DNI o Cédula de Identidad</Text>
                    <Text>www.andessalud.com.ar</Text>
                    <Text>Superintendencia de Servicio de Salud</Text>
                    <Text>Órgano de Control 0800 222 SALUD (72583) www.sssalud.gov.ar</Text>
                  </View>
                </View>
              </View>
            </View>
          )
          }

         {/*  <View
          style={{ flex: 1 }}
          >
          <Text style={{ marginBottom: 5, marginTop:15 }}> Nombre Afiliado:{ datosCredencial.nombreAfiliado }</Text>
        <Text style={{ marginBottom: 15 }}> Plan:{ datosCredencial.plan } </Text>
        <Text style={{ marginBottom: 5 }}> numAfiliado: { datosCredencial.numAfiliado } </Text>
        <Text style={{ marginBottom: 5 }}> fecVencimiento: { datosCredencial.fecVencimiento } </Text>
          </View> 
      }*/}
    </View>
  );
};
