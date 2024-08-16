import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
    setIsConsulting(true);
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
      <CustomHeader color={globalColors.gray2}  titleSize={28} />
      <BackButton onPress={() => navigation.navigate('home')} />
      {
        isConsulting ? (
          <>
         
          <View
          
          style={styles.waitingContainer }
          >
            <View style={styles.containerMessage}>
           
              <Text style={styles.epigrafeMessage}>Aguardá un momento </Text>
              <Text style={styles.epigrafeMessage}>Estamos procesando tu orden</Text>

                <Text style={styles.epigrafeMessage} >Esto puede tomar algunos unos minutos</Text>

              </View>

            </View>
            <FullScreenLoader
              layoutStyle={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 35 }} 
              spinnerSize="giant" 
              spinnerStatus="info" 
            
            />
          </>
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

const styles = StyleSheet.create({
  waitingContainer: {
    marginTop: 20,
    marginBottom: 20,
    /*     padding: 20, */
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5, 
  },
  informationContainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5, 
   
  },
  containerMessage: {
    marginTop: 15, 
    marginBottom:20, 
    marginHorizontal: 5,
  }, 
  containerLoader: {
    marginTop: 0, 
    marginBottom:35,  
    marginHorizontal: 5,
    backgroundColor:'green'
  }, 
  successMessage: {
    fontSize: 25,
    marginTop:10,
    marginBottom:5,
  },
  epigrafeMessage: {
    fontSize: 20,
    marginTop:5,
    marginBottom:5,
    alignSelf: 'center'
  },
  successImage: {
    width: 150,
    height: 150,
    marginBottom:5,
  },
  errorImage: {
    width: 220,
    height: 220,
    marginBottom:5,
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