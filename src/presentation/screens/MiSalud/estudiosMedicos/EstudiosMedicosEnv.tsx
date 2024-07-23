import React, { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View, Modal, Image, Button, StyleSheet } from 'react-native'
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
import { globalColors, globalStyles } from '../../../theme/theme'
import { globalStylesCredentials } from '../../credential/css/themeCredentials'





export const EstudiosMedicosEnv = () => {

  const { idAfiliadoTitular, idPrestador, idAfiliadoSeleccionado, imagen1, GuardarIdFamiliarSeleccionado, GuardarIdPrestador, GuardarImagenes, imagenes } = useAuthStore();


  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const { top } = useSafeAreaInsets();

  const [ordenConsulta, setOrdenConsulta] = useState(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [verificacionMensaje, setVerificacionMensaje] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Nuevo estado
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Nuevo estado

  useEffect(() => {

    const EstudiosMedicosRequest = async () => {
      try {
        setIsConsulting(true);

        console.log('ENTRANDO A ESTUDIOS MEDICOS Y VIENDO EL ID AFILIADO TITULAR, ID AFILIADO SELECCIONADO ELEGIDO Y ID PRESTADOR(idConvenio) ----->>:', idAfiliadoTitular, idAfiliadoSeleccionado, idPrestador);

        const params = new URLSearchParams({
          idAfiliadoTitular: idAfiliadoTitular || '',
          idAfiliado: idAfiliadoSeleccionado || '',
          imagen1: imagenes[0] || '',
          imagen2: imagenes[1] || '',
          imagen3: imagenes[2] || '',
          imagen4: imagenes[3] || '',
          imagen5: imagenes[4] || '',
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
        
        
/*         console.log('resultado del envio de datos: result:', JSON.stringify(result));
        console.log('resultado del envio de datos: result.mensaje:', JSON.stringify(result.mensaje));
        console.log('resultado del envio de datos: result.idOrden:', JSON.stringify(result.idOrden));
        console.log('resultado del envio de datos: result.fecSolicitud', JSON.stringify(result.fecSolicitud));
        console.log('resultado del envio de datos: result.idEstado:', JSON.stringify(result.idEstado)); */

            
        
        // Verificar si el valor devuelto es "00"
        if (fila.valorDevuelto._text === "00") {
          setShowSuccessMessage(true);// Mostrar el mensaje de éxito
         
          
          setShowSuccessModal(true); // Mostrar el modal de éxito
          setError(null);
        } else {
          setShowErrorMessage(true);    // Mostrar el mensaje de error
        }
        

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
    console.log('el idOrden es el siguiente: ', result.idOrden);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 0,
        /*   backgroundColor: 'green' */
      }}
    >
      <HamburgerMenu />
      <CustomHeader color={globalColors.gray3} titleSize={32}/>
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

            {/* View para mostrar éxito */}
            {showSuccessMessage && (
              <View style={styles.successContainer}>
                <Text style={styles.successMessage}>Datos enviados con éxito!</Text>
                <Image source={require('../../../assets/images/MailSent-rafiki.png')} style={styles.successImage} />
              </View>
            )}

            {/* View para mostrar mensaje de mensaje no enviado con exito*/}
            {showErrorMessage && (
              <View style={styles.successContainer}>
                <Text style={styles.successMessage}>Problemas al enviar los datos</Text>
                <Image source={require('../../../assets/images/400ErrorBadRequest-bro.png')} style={styles.successImage} />
              </View>
            )}

            { !showErrorMessage && result && (


              <View>
                <Text style={globalStyles.titleEstudiosMedicosEnv}>Información de la solicitud</Text>
             
                {/* <Text style={globalStyles.resultText}>Valor Devuelto: {result.valorDevuelto}</Text> */}
            
                <Text style={globalStyles.resultText}>{result.mensaje}</Text>
                <Text style={globalStyles.resultText}>ID Orden: {result.idOrden}</Text>
               
                
                {/*  <Text style={globalStyles.resultText}>ID Estado: {result.idEstado}</Text> */}
                <Text style={globalStyles.resultText}>Fecha de Solicitud: {result.fecSolicitud}</Text>
                {verificacionMensaje && <Text>{verificacionMensaje}</Text>}
              </View>
            )}
            {showErrorMessage && (
              <View style={globalStyles.errorContainerEstudios}>
                <Text style={globalStyles.titleErrorEstMedicosEnv}>Problemas en la solicitud</Text>
                <Text style={{...globalStyles.resultText, textAlign:'center'}}>Intente nuevamente más tarde</Text>
                <Text style={globalStyles.errorTextEstudios}>Datos incompletos{/* {result.mensaje} */}</Text>
              </View>
            )}

          </View>

      }
    </View>
  )
}




const styles = StyleSheet.create({
  successContainer: {
    marginTop: 20,
    marginBottom: 20,
   
    /*     padding: 20, */
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  successMessage: {
    fontSize: 25,
    marginTop:10,
    marginBottom: 10,
  },
  successImage: {
    width: 220,
    height: 220,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
})
/* ALTERNATIVA DE MODAL PARA MOSTRAR DATOS ENVIADOS CON EXITO:  */
{/*  <Modal
   transparent={true}
   visible={showSuccessModal}
   onRequestClose={() => setShowSuccessModal(false)}
 >
   <View style={styles.modalContainer}>
     <View style={styles.modalContent}>
       <Text style={styles.successMessage}>Datos enviados con éxito</Text>
       <Image  source={require('path-to-your-image.png')}  style={styles.successImage} />
       <Button title="Cerrar" onPress={() => setShowSuccessModal(false)} />
     </View>
   </View>
 </Modal> */}