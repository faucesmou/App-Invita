import React, { useEffect, useState } from 'react'
import { ImageBackground, View, Image } from 'react-native'
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
import LinearGradient from 'react-native-linear-gradient';
//prueba para poder mostrar el isotipo de andes salud (la carita amarilla)
import { SvgXml } from 'react-native-svg';
const isotipo = require('./CredentialsData/images/Isotipo.png');//pareciera que lo lee pero no lo muestra
import { USUARIO, PASSWORD, ADMINISTRADORA, STAGE } from '@env';
//otra prueba para lo mismo: 



import { credencialStyles, credentialsColors, globalStylesCredentials } from '../credential/css/themeCredentials'

// Definir un tipo para los nombres de los planes
type PlanName = 'titanium' | 'platinum' | 'black' | 'gold' | 'green';
// Definir un tipo para el objeto de paletas de colores
interface PlanPalettes {
  [key: string]: string[];
}
const PlanPalettes: PlanPalettes = {
  titanium: ['#8a6fa2', '#452a64', '#452a64', '#452a64'],
  platinum: ['#939095', '#8c9292', '#8c9292', '#8c9292'],
  black: ['#474648', '#161516', '#161516', '#161516'],
  gold: ['#98671e', '#8d7249', '#8d7249', '#8d7249'],
  green: ['#29bd0f', '#47ac34', '#47ac34', '#47ac34'],
};


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

  //consulto el plan del afiliado para mostrar el color de la credencial:
  // Obtener los colores del plan actual
  const planColors: string[] = PlanPalettes[datosCredencial.plan] || [];

   const {idAfiliado} = useAuthStore();

  //momentaneamente vamos a definir el queryIdAfiliado nosotros aqui: pero en el caso real desde el login se hace la consulta a la funcion correspondiente:
  /*     const consultaDatosCredencial = async (queryIdAfiliado: string| undefined) => {  */
  /* const consultaDatosCredencial = async () => { */

  useEffect(() => {

    const consultaDatosCredencial = async (idAfiliado: string| undefined) => {
     /*  let queryIdAfiliado = 'EB0F3828-DB84-49CC-AE37-6987C1B750FC' */
      console.log('esta es el idAfiliado desde CredencialScreenPrueba', idAfiliado);
      console.log('estos son VARIABLES DE .ENV ADMINISTRADORA:', STAGE, ADMINISTRADORA)
      try {

        setIsConsulting(true);
        let response = await axios({
          method: 'get',
          url: `https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscaDatoCredencial?IMEI=ADMCE09D187-8D2C-4592-AE43-87B0D657299C&idAfiliado=${idAfiliado}`,
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
          nombreAfiliado: nombreAfiliado,
          numAfiliado: numAfiliado,
          fecVencimiento: fecVencimiento,
        });
        /*  setDatosCredencial(prevState => ({
               ...prevState,
               plan: 'green'
             }));  */
        /* titanium platinum black gold green*/
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
    consultaDatosCredencial(idAfiliado);
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
            <View style={{ flex: 1 }} >
              <Text style={{ textAlign: 'center', fontSize: 24 }}>Tu Credencial</Text>
              <View  >

                <LinearGradient
                  colors={planColors}
                  style={globalStylesCredentials.frenteCard}
                >

                  <ImageBackground
                    source={require('./CredentialsData/images/logogris4.png')}
                    imageStyle={{
                      resizeMode: "cover",
                      flex: 1,
                      justifyContent: 'flex-end',
                      width: '80%',
                      height: '90%',
                      transform: [{ translateX: 250 }],
                    }}

                  >
                    <View  >
                      <View style={{ alignItems: 'flex-start', width: 50, height: 50, padding: 12, }}>
                        <Image
                          source={isotipo}
                          style={{ width: 50, height: 50, marginBottom: 10, alignItems: 'center', }}
                        />
                        <View style={globalStylesCredentials.contenedorTituloAndes}>
                          <Text style={globalStylesCredentials.tituloAndes} >andes</Text>
                          <Text style={globalStylesCredentials.tituloAndes}>salud</Text>
                        </View>
                      </View>

                      <View style={[globalStylesCredentials.frenteCard2, { alignItems: 'flex-end', justifyContent: 'flex-end', }]}>
                        <View >
                          <Text style={globalStylesCredentials.planTitle}> Plan {datosCredencial.plan}</Text>
                        </View>
                        <View >
                          <View style={globalStylesCredentials.fuente}>
                            <Text style={{ color: 'white' }}>{datosCredencial.nombreAfiliado}</Text>
                            <Text style={{ color: 'white' }}>{datosCredencial.numAfiliado}</Text>
                            <Text style={{ color: 'white' }}>{datosCredencial.fecVencimiento}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </LinearGradient>

              </View>



              {/* dorso de la tarjeta: */}

              <View  >

                <LinearGradient
                  colors={planColors}
                  style={globalStylesCredentials.frenteCard}
                >

                  <View  >
                    <View style={{ alignItems: 'flex-end', width: '95%', height: 50, padding: 10, }}>
                      <Image
                        source={isotipo}
                        style={{ width: 50, height: 50, marginBottom: 10, alignItems: 'center', }}
                      />
                      <View style={globalStylesCredentials.contenedorTituloAndesDorso}>
                        <Text style={globalStylesCredentials.tituloAndes} >andes</Text>
                        <Text style={[globalStylesCredentials.tituloAndes, { fontWeight: 'normal' }]}>salud</Text>
                      </View>
                    </View>

                    <View style={globalStylesCredentials.dorsoCard}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 5 }}>
                          <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                            Esta credencial es personal e intransferible para uso exclusivo del titular. Debe presentarse acompañado de DNI o Cédula de Identidad
                          </Text>
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 10 }}>
                          <Text style={{ color: 'blue', textAlign: 'center', fontWeight: 'bold' }}>
                            www.andessalud.com.ar
                          </Text>
                        </View>
                        <View style={{ padding: 5 }}>
                          <Text style={{ color: 'white', textAlign: 'center', fontSize: 13, }}>
                            Superintendencia de Servicio de Salud
                          </Text>
                          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }}>
                            Órgano de Control 0800 222 SALUD (72583) www.sssalud.gov.ar
                          </Text>
                        </View>
                      </View>
                      {/*  <View >
                        <Text style={{ color: 'white', alignItems: 'center',  }}> Esta credencial es personal e intransferible para uso exclusivo del titular. Debe presentarse acompañado de DNI o Cédula de Identidad</Text>
                      <Text style={{ color: 'white', alignItems: 'center', }}>www.andessalud.com.ar</Text>
                      </View>
                      <View >
                      </View>
                      <View >
                        <View >
                          <Text style={{ color: 'white' }}>Superintendencia de Servicio de Salud</Text>
                          <Text style={{ color: 'white' }}>Órgano de Control 0800 222 SALUD (72583) www.sssalud.gov.ar</Text>
                        </View>
                      </View> */}
                    </View>
                  </View>

                </LinearGradient>

              </View>

            </View>
          )
      }

      {/* 15064289120/0000 CreaTech2023 */}
      {/*   <Layout style={{ height: 10 }} /> */}
    </View>
  );
};





{/*   este es el dorso: <View style={{ flex: 1, backgroundColor: credentialsColors.green }}>
     <View >
       <Text>Esta credencial es personal e intransferible para uso exclusivo del titular. Debe presentarse acompañado de DNI o Cédula de Identidad</Text>
       <Text>www.andessalud.com.ar</Text>
       <Text>Superintendencia de Servicio de Salud</Text>
       <Text>Órgano de Control 0800 222 SALUD (72583) www.sssalud.gov.ar</Text>
     </View>
   </View> */}