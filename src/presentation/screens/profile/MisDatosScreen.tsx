import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { globalColors, globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParams } from '../../routes/StackNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import { BackButton } from '../../components/shared/BackButton'
import CustomHeader from '../../components/CustomHeader'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { useAuthStore } from '../../store/auth/useAuthStore'




export const MisDatosScreen = () => {

  const { idAfiliadoTitular, idAfiliado } = useAuthStore();

  const [isConsulting, setIsConsulting] = useState(false);
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const [afiliado, setAfiliado] = useState(null);

  useEffect(() => {
    setIsConsulting(true);

    const AfiliadosRequest = async () => {
      try {
        console.log('is posting en true! daled man ere');

        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/consultarAfiliadoJson?usuario=CHATBOT&password=DrtEchat%&administradora=F100376F-33F9-49FD-AFB9-EE53616E7F0C&datosAfiliado=${idAfiliado}`);
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
        setIsConsulting(false);

      } catch (error) {
        console.error('Error al obtener los datos de los afiliados:', error);
      }
    };
    AfiliadosRequest()

  }, [])
  const colorNaranja = globalColors.orange
  return (
    <View style={{
      /*  flex: 1,
       paddingHorizontal: 20,
       marginTop: top, */
      marginTop: 0,
      /*  backgroundColor: 'yellow' */
    }}

    >


      <Text style={{ marginBottom: 5, fontSize: 25, textAlign: 'center' }}>Mis Datos</Text>

      {/*    <BackButton onPress={() => navigation.navigate('home')} /> */}
      {
        isConsulting ? (

          <View
            style={{
              flex: 0.5,
              marginTop: top - 10,
              marginBottom: 40,
            }}
          >
            <FullScreenLoader />
          </View>

        )
          :
          <FlatList
            data={afiliado}
            renderItem={({ item }) => (
              <View>
                <View>
                  <View style={styles.container}>
                    <Text style={styles.text}>{`${item.apellidoYNombre}`}</Text>
                    <Text style={styles.text}>{`Numero de Afiliado: ${item.nroAfiliado}`}</Text>
                 {/*    <Text style={styles.text}>{`Edad: ${item.edad}`}</Text> */}
                    <Text style={styles.text}>{`Estado: ${item.estadoAfiliacion}`}</Text>
                    <Text style={styles.text}>{`Plan: ${item.planPrestacional}`}</Text>

                  </View>

                </View>


              </View>
            )
            }
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 18,
    textAlign: 'left',
   
  },
  container: {
    marginHorizontal:20,
   marginTop: 10,
   marginBottom:20,
  }

})