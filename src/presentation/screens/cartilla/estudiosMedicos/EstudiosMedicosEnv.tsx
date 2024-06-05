import React, { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackParams } from '../../../routes/StackNavigator'
import { HamburgerMenu } from '../../../components/shared/HamburgerMenu'
import CustomHeader from '../../../components/CustomHeader'
import { BackButton } from '../../../components/shared/BackButton'
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { xml2js } from 'xml-js';
import { globalStyles } from '../../../theme/theme'





export const EstudiosMedicosEnv = () => {

  const { idAfiliadoTitular, idPrestacion, idPrestador, idAfiliadoSeleccionado, imagen1 } = useAuthStore();
  /*   console.log('id idAfiliadoSeleccionado: ', idAfiliadoSeleccionado);
    console.log(' titular orden de consulta: ',  idAfiliadoTitular );
    console.log('prestacion: ',  idPrestacion ); */

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const { top } = useSafeAreaInsets();

  const [ordenConsulta, setOrdenConsulta] = useState(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {

    const EstudiosMedicosRequest = async () => {
      try {
        setIsConsulting(true);
        console.log('Datos idAfiliadoTitular----->>:', idAfiliadoTitular);
        console.log('Datos idAfiliadoSeleccionado----->>:', idAfiliadoSeleccionado);
        console.log('Datos idPrestador----->>:', idPrestador);
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPSolicitarPractica?idAfiliadoTitular=${idAfiliadoTitular}&idAfiliado=${idAfiliadoSeleccionado}&imagen1=&imagen2=&imagen3=&imagen4=&imagen5=&IMEI=&idConvenio=${idPrestador}`);

        // Convertir la respuesta XML a JSON
        const result = xml2js(response.data, { compact: true });
        console.log('Datos JSON convertidos ----->>:', result);

        // Verificación de la estructura del resultado
        if (!result || !result.Resultado || !result.Resultado.fila) {
          console.log('La respuesta XML no contiene los datos esperados');
         
          return;
        }
        const fila = result.Resultado.fila;
        setResult({
          valorDevuelto: fila.valorDevuelto._text,
          mensaje: fila.mensaje._text,
          idOrden: fila.idOrden._text,
          fecSolicitud: fila.fecSolicitud._text,
          idEstado: fila.idEstado._text,
        });
        setIsConsulting(false);
      } catch (error) {
        console.error('Error al realizar la solicitud desde el useEffect--->', error);
        setIsConsulting(false);
      }
    }

    EstudiosMedicosRequest()

  }, []);

  return (
    <View
    style={{
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 0,
      backgroundColor: 'green'
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
          <View style={ globalStyles.containerEstudiosMedicosEnv }>


            <Text style={globalStyles.titleEstudiosMedicosEnv }>Estudios Medicos Solicitados:</Text>
            {result && (
              <View>
                <Text style={globalStyles.resultText}>Valor Devuelto: {result.valorDevuelto}</Text>
                <Text style={globalStyles.resultText}>Mensaje: {result.mensaje}</Text>
                <Text style={globalStyles.resultText}>ID Orden: {result.idOrden}</Text>
                <Text style={globalStyles.resultText}>Fecha de Solicitud: {result.fecSolicitud}</Text>
                <Text style={globalStyles.resultText}>ID Estado: {result.idEstado}</Text>
              </View>
            )}
          </View>
      }
    </View>
  )
}


{/*  <Text style={{ marginBottom: 5, fontSize: 25 }}>Orden de Consulta Link:</Text> */ }
{/*       <Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15 }}>{`Orden Link: ${ordenConsulta}`}</Text>
<Text style={{ marginBottom: 25, marginTop: 15, fontSize: 15 }}>{`Orden Link: ${ordenConsulta}`}</Text> */}