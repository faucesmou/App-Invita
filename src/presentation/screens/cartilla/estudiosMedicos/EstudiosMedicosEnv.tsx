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

  const { idAfiliadoTitular, idPrestador, idAfiliadoSeleccionado, imagen1, GuardarIdFamiliarSeleccionado, GuardarIdPrestador, GuardarImagenes, imagenes } = useAuthStore();
 

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const { top } = useSafeAreaInsets();

  const [ordenConsulta, setOrdenConsulta] = useState(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [verificacionMensaje, setVerificacionMensaje] = useState<string | null>(null);

  useEffect(() => {

    const EstudiosMedicosRequest = async () => {
      try {
        setIsConsulting(true);

      console.log('ENTRANDO A ESTUDIOS MEDICOS Y VIENDO EL ID AFILIADO TITULAR, ID AFILIADO SELECCIONADO ELEGIDO Y ID PRESTADOR(idConvenio) ----->>:',  idAfiliadoTitular, idAfiliadoSeleccionado, idPrestador); 

        const params = new URLSearchParams({
          idAfiliadoTitular: idAfiliadoTitular || '',
          idAfiliado: idAfiliadoSeleccionado || '',
          imagen1: imagenes[0] || '',
          imagen2: imagenes[1] ||  '',
          imagen3: imagenes[2] ||  '',
          imagen4: imagenes[3] ||  '',
          imagen5: imagenes[4] ||  '',
          IMEI: '',
          idConvenio: idPrestador || '',
        });
        
        const response = await axios.post(
          'https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPSolicitarPractica',
          params.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
     
        // Convertir la respuesta XML a JSON
        const result = xml2js(response.data, { compact: true });
      
        // Verificación de la estructura del resultado
        if (!result || !result.Resultado || !result.Resultado.fila) {
          console.log('La respuesta XML no contiene los datos esperados');
          setError('La respuesta no contiene los datos esperados');
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
        setError(null);
        // Restablecer los valores en el contexto después de la solicitud exitosa
      /*   await GuardarImagenes([null, null, null, null, null]);
        await GuardarIdPrestador('');
        await GuardarIdFamiliarSeleccionado('');
 
        
        if (useAuthStore.getState().imagenes === ([null, null, null, null, null]) && useAuthStore.getState().idPrestador === '' && useAuthStore.getState().idAfiliadoSeleccionado === '') {
          console.log('Todos los valores: imagenes, idPrestador y idAfiliadoSeleccionado fueron borrados del contexto.');
        } else {
          console.log('Algunos valores NO fueron borrados del contexto idPrestador: ', idPrestador);
        }
        if (idPrestador === '') {
          console.log('idPrestador fue borrado correctamente');
        } else {
          console.log('idPrestador NO fue borrado');
        } */

      } catch (error: any) {
        console.error('Error al realizar la solicitud desde el useEffect--->', error);
        const errorMessage = error.response?.data || 'Hubo un problema al realizar la solicitud';
        setError(errorMessage);
        setIsConsulting(errorMessage);
      } finally {
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
          <View style={globalStyles.containerEstudiosMedicosEnv}>


            {result && (


              <View>
                <Text style={globalStyles.titleEstudiosMedicosEnv}>Estudios Medicos Solicitados</Text>

                <Text style={globalStyles.resultText}>Valor Devuelto: {result.valorDevuelto}</Text>
                <Text style={globalStyles.resultText}>Mensaje: {result.mensaje}</Text>
                <Text style={globalStyles.resultText}>ID Orden: {result.idOrden}</Text>
                <Text style={globalStyles.resultText}>Fecha de Solicitud: {result.fecSolicitud}</Text>
                <Text style={globalStyles.resultText}>ID Estado: {result.idEstado}</Text>
                {verificacionMensaje && <Text>{verificacionMensaje}</Text>}
              </View>
            )}
            {error && (
              <View style={globalStyles.errorContainerEstudios}>
                <Text style={globalStyles.titleErrorEstMedicosEnv}>Problemas en la solicitud</Text>
                <Text style={globalStyles.errorTextEstudios}>Error: {error}</Text>
              </View>
            )}
          </View>
      }
    </View>
  )
}


