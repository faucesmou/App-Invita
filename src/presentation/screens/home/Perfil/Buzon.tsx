import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { xml2js } from 'xml-js';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { globalColors } from '../../../theme/theme';
import { RootStackParams } from '../../../routes/StackNavigator';
import CustomHeader from '../../../components/CustomHeader';
import { BackButton } from '../../../components/shared/BackButton';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
import { IonIcon } from '../../../components/shared/IonIcon';



interface Notificacion {
  idOrden: string;
  afiliado: string;
  fecSolicitud: string;
  estado: string;
  fecFinalizacion: string;
  comentarioRechazo: string;
}

export const Buzon = () => {
  const { idAfiliado } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [isConsulting, setIsConsulting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsConsulting(true);
    const ProductsRequest = async () => {
      let camote = '301936D8-6482-4625-82DD-38A932A4FC5A'
      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENPRAC?idAfiliado=${idAfiliado}&IMEI=`);
        /*         console.log('EL RESPONSE DEL BUZON ES : ---------x-x-x-x-x-x->', response); */

        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });

        console.log('Datos JSON convertidos:', result);

        const notificacionesData = result.Resultado?.tablaDatos;
        console.log('notificacionesData-------------->>---->->>>---->><<<<---->>:', notificacionesData);
        if (notificacionesData === undefined) {
          console.log('notificacionesData es undefined: No hay notificaciones para este usuario.');
          setIsConsulting(false);
          return;
        }
        if (!notificacionesData) {
          setError('El formato de los datos recibidos no es el esperado.');
        }

        // Mapear los datos 
        const mappedNotificaciones = Array.isArray(notificacionesData.idOrden) ? notificacionesData.idOrden.map((_: any, index: number) => ({
          idOrden: notificacionesData.idOrden[index]._text,
          afiliado: notificacionesData.afiliado[index]._text,
          fecSolicitud: notificacionesData.fecSolicitud[index]._text,
          estado: notificacionesData.estado[index]._text,
          fecFinalizacion: notificacionesData.fecFinalizacion[index]._text,
          comentarioRechazo: notificacionesData.comentarioRechazo[index]._text,
        })) : [];

        setNotificaciones(mappedNotificaciones);
        console.log('Mapped notificaciones:', mappedNotificaciones);
        console.log('Notificaciones:', notificaciones);
        setIsConsulting(false);

      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        setError('Error al obtener las notificaciones');
        setIsConsulting(false)
      }
    };

    ProductsRequest();

  }, [idAfiliado]);

  const color = globalColors.gray;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  console.log('estas son las notificaciones:', notificaciones);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
        /*      backgroundColor: 'green',  */
        marginBottom: 0,
      }}
    >
      <CustomHeader color={globalColors.gray3} />

      <BackButton />

      <View
        style={{
          marginBottom: 10, marginTop: 0,
          alignItems: 'center',
          /*    backgroundColor: 'green', */
        }}>

        <View style={{ marginBottom: 30, marginTop: 10 }}>
          <ScrollView>

            {isConsulting ?
              (
                <View style={styles.TertiaryButton}>
                  <FullScreenLoader />
                </View>
              )
              :
              error ? (
                <>
                <View style={styles.errorContainerBuzon} >
                  <Text style={styles.titleErrorBuzon} >No se encontraron notificaciones</Text>
                  <Text style={styles.titleErrorBuzon} >Intente nuevamente más tarde</Text>

                </View>
                
                <View style={styles.imageContainer}>

                  <View
                    style={styles.innerContainer}
                  >
                  <Image source={require('../../../assets/images/logogris.png')}
                      style={styles.image}
                      resizeMode="contain"
                    /> 
                  </View>

                  </View>
                
                </>
              ) :
                notificaciones.length > 0 ?
                  (
                    notificaciones.map((notificacion, index) => (
                      <Pressable
                        onPress={() => {
                          console.log('se toco en la notificacion')
                        }}

                      >
                        <View key={index} style={styles.TertiaryButton}>
                          {/*  <Text style={{ fontSize: 16, textAlign: 'center' }}>{notificacion.afiliado}</Text> */}
                          <View style={styles.contentWrapper2}>
                            <View style={styles.textWrapper}>
                              {notificacion.afiliado && (
                                <Text style={styles.buttonText}>
                                  {notificacion.afiliado}
                                </Text>
                              )}
                              {notificacion.estado && (
                                <Text style={styles.descriptionText}>
                                  Estado:{notificacion.estado}
                                </Text>
                              )}
                              {notificacion.fecSolicitud && (
                                <Text style={styles.descriptionText}>
                                  Solicitud: {notificacion.fecSolicitud}
                                </Text>
                              )}
                            </View>

                          </View>

                        </View>
                      </Pressable>
                    )
                    )
                  ) :
                  (
                    <>
                    <View  style={ styles.SinNotificacionesContainerBuzon } >
                    <Text style={styles.SinNotificacionesTitleBuzon} >No tienes notificaciones!</Text>
                  </View>

                    <View style={styles.imageContainer}>

                    <View
                      style={styles.innerContainer}
                    >
                     <Image source={require('../../../assets/images/logogris.png')}
                        style={styles.image}
                        resizeMode="contain"
                      /> 
                    </View>

                    </View>
                    </>
        )
            }

      </ScrollView>
    </View>



      </View >

  <View style={styles.imageContainer}>

    <View
      style={styles.innerContainer}
    >
      <Text style={{
        fontSize: 25,
        textAlign: 'center',
      }} >
        Andes Salud
      </Text>

      <Image source={require('../../../assets/images/logogris.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>

  </View>

    </View >
  );
};


const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 30,
    marginHorizontal: 35,
    marginTop: 85,
    /*    zIndex: 1.5, */
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%',
    minWidth: '30%',
  },
  innerContainer: {
    marginBottom: 15,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
   /*  backgroundColor: 'blue', */
  },
  image: {
  /*   flex: 1, */
    width: '100%',
    height: '100%',
    margin: 10,
  },

  //ESTILOS PARA LAS NOTIFICACIONES (COPIADOS DE TERTIARY BUTTON):
  TertiaryButton: {
    backgroundColor: 'white',
    minWidth: '80%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    padding: 10,
    margin: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 5,
  },
  iconWrapper: {
    justifyContent: 'flex-end',
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'normal',
  },
  descriptionText: {
    color: 'gray',
    fontSize: 18,
  },
  errorContainerBuzon: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d7e5f8',
    borderRadius: 5,
  },
  titleErrorBuzon: {
    marginBottom: 5,
    fontSize: 25,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
  },
  SinNotificacionesContainerBuzon: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#d7e5f8' /*  'green' */,
    borderRadius: 5,
  },
  SinNotificacionesTitleBuzon: {
    marginBottom: 5,
    fontSize: 25,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
  },

});

