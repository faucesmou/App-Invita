import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet, Image, Pressable, Modal } from 'react-native';
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<[]>([]);


  useEffect(() => {
    setIsConsulting(true);
    const ProductsRequest = async () => {
      let camote = '301936D8-6482-4625-82DD-38A932A4FC5A'
      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENPRAC?idAfiliado=${idAfiliado}&IMEI=`);
        /*   console.log('EL RESPONSE DEL BUZON ES : ---------x-x-x-x-x-x->', response); */

        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });

        /*    console.log('Datos JSON convertidos:', result); */

        const notificacionesData = result.Resultado?.tablaDatos;

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
        /*   console.log('Notificaciones:', notificaciones); */
        setIsConsulting(false);

      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        setError('Error al obtener las notificaciones');
        setIsConsulting(false)
      }
    };

    ProductsRequest();

  }, [idAfiliado]);

  const PracticaResueltaRequest = async (idOrden: string) => {
    try {
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPDatosPracticaResuelta?IMEI=&idOrdenAPP=${idOrden}`)
      const xmlData = response.data;

      // Convertir XML a JSON
      const result = xml2js(xmlData, { compact: true });
     /*  const practicaResueltaData = result.root?.tablaEncabezado; */

      const practicaResueltaData = {
        tablaEncabezado: result?.root?.tablaEncabezado,
        tablaDetalle: result?.root?.tablaDetalle,
      };
      console.log('Datos JSON convertidos desde el PRACTICA RESUELTA REQUEST-->>>>>>>:', result);
      console.log('practicaResueltaData -->>>>>>>>:', practicaResueltaData);

      // Verificar si practicaResueltaData e idOrdenENC están definidos
/* if (practicaResueltaData && practicaResueltaData.idOrdenENC) {
      // Mapear los datos 
      const mappedPracticaResueltaData = practicaResueltaData.idOrdenENC.map((_: any, index: number) => ({
        idOrden: practicaResueltaData.idOrdenENC[index]._text,
        idOrdenParcial: practicaResueltaData.idOrdenParcialENC[index]._text,
        nombreConvenio: practicaResueltaData.nombreConvenioENC[index]._text,
        coseguroENC: practicaResueltaData.coseguroENC[index]._text,
        palabraClaveENC: practicaResueltaData.palabraClaveENC[index]._text,
        fecFinENC: practicaResueltaData.fecFinENC[index]._text,
        fecVencimientoENC: practicaResueltaData.fecVencimientoENC[index]._text,
        domRenglon1: practicaResueltaData.domRenglon1[index]._text,
        domRenglon2: practicaResueltaData.domRenglon2[index]._text
      })); */
      // Verificar si practicaResueltaData y sus atributos necesarios están definidos
if (practicaResueltaData && practicaResueltaData.tablaEncabezado && practicaResueltaData.tablaDetalle) {
  // Extraer datos de tablaEncabezado y tablaDetalle
 /*  const encabezados = practicaResueltaData.tablaEncabezado.idOrdenENC.map((item: any, index: number) => ({
    idOrden: item._text,
    idOrdenParcial: practicaResueltaData.tablaEncabezado.idOrdenParcialENC[index]._text,
    nombreConvenio: practicaResueltaData.tablaEncabezado.nombreConvenioENC[index]._text,
    coseguroENC: practicaResueltaData.tablaEncabezado.coseguroENC[index]._text,
    palabraClaveENC: practicaResueltaData.tablaEncabezado.palabraClaveENC[index]._text,
    fecFinENC: practicaResueltaData.tablaEncabezado.fecFinENC[index]._text,
    fecVencimientoENC: practicaResueltaData.tablaEncabezado.fecVencimientoENC[index]._text,
    domRenglon1: practicaResueltaData.tablaEncabezado.domRenglon1[index]._text,
    domRenglon2: practicaResueltaData.tablaEncabezado.domRenglon2[index]._text,
  }));

  const detalles = practicaResueltaData.tablaDetalle.idOrdenDET.map((item: any, index: number) => ({
    idOrdenDET: item._text,
    idOrdenDetalleDET: practicaResueltaData.tablaDetalle.idOrdenDetalleDET[index]._text,
    idOrdenParcialDET: practicaResueltaData.tablaDetalle.idOrdenParcialDET[index]._text,
    cantidadDET: practicaResueltaData.tablaDetalle.cantidadDET[index]._text,
    prestacionDET: practicaResueltaData.tablaDetalle.prestacionDET[index]._text,
    coseguroDET: practicaResueltaData.tablaDetalle.coseguroDET[index]._text,
  })); */

  const combinedData = practicaResueltaData.tablaEncabezado.idOrdenENC.map((item: any, index: number) => ({
    idOrden: item._text,
    idOrdenParcial: practicaResueltaData.tablaEncabezado.idOrdenParcialENC[index]._text,
    nombreConvenio: practicaResueltaData.tablaEncabezado.nombreConvenioENC[index]._text,
    coseguroENC: practicaResueltaData.tablaEncabezado.coseguroENC[index]._text,
    palabraClaveENC: practicaResueltaData.tablaEncabezado.palabraClaveENC[index]._text,
    fecFinENC: practicaResueltaData.tablaEncabezado.fecFinENC[index]._text,
    fecVencimientoENC: practicaResueltaData.tablaEncabezado.fecVencimientoENC[index]._text,
    domRenglon1: practicaResueltaData.tablaEncabezado.domRenglon1[index]._text,
    domRenglon2: practicaResueltaData.tablaEncabezado.domRenglon2[index]._text,
    idOrdenDET: practicaResueltaData.tablaDetalle.idOrdenDET[index]._text,
    idOrdenDetalleDET: practicaResueltaData.tablaDetalle.idOrdenDetalleDET[index]._text,
    idOrdenParcialDET: practicaResueltaData.tablaDetalle.idOrdenParcialDET[index]._text,
    cantidadDET: practicaResueltaData.tablaDetalle.cantidadDET[index]._text,
    prestacionDET: practicaResueltaData.tablaDetalle.prestacionDET[index]._text,
    coseguroDET: practicaResueltaData.tablaDetalle.coseguroDET[index]._text,
}));

setModalData(combinedData);


  console.log('combinedData -->>>>>>>>:', combinedData);

      setModalVisible(true);
    } else {
        console.error('practicaResueltaData or idOrdenENC is undefined');
      }

    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);

    }
  }


  const getButtonText = (notificacion: string) => {
    if (notificacion === 'PRACTAUT') {
      return 'Autorizada';
    }
    else if (notificacion === 'AUD') {
      return 'En revisión';
    }
    else if (notificacion === 'RECHAZOPRACTICA') {
      return 'Rechazada';
    }

    return 'Pendiente';
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalData([]); // Limpiar modalData al cerrar los modales
  };
  const color = globalColors.gray;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  /*  console.log('estas son las notificaciones:', notificaciones); */
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
      <CustomHeader color={globalColors.gray2} />

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
                          PracticaResueltaRequest(notificacion.idOrden)
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

                                  Estado:{
                                    getButtonText(notificacion.estado)
                                  }
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
                      <View style={styles.SinNotificacionesContainerBuzon} >
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
            <>
            {modalVisible && (
        <View style={styles.overlay} />
      )}

            {modalData.map((data, index) => (
            <Modal
            key={index}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
             <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                {/* <Text style={styles.textStyle}>Id: {data.idOrden}</Text> */}
                <Text style={styles.textStyle}>Codigo Autorización: {data.palabraClaveENC}</Text>
                <Text style={styles.textStyle}>Fec. Vencimiento:      {data.fecVencimientoENC}</Text>
                <Text style={styles.textStyle}>Prestador: {data.nombreConvenio}</Text>
                <Text style={styles.textStyle}>Dirección:{data.domRenglon1}{data.domRenglon2}</Text>
             {/*    <Text style={styles.textStyle}>{data.domRenglon2}</Text> */}
                <Text style={styles.textStyleCoseguro}>Coseguro: ${data.coseguroENC}</Text>
                <Text style={styles.textStylePractica}>Práctica: {data.prestacionDET}</Text>
             
              </View>
              <Pressable
                style={styles.button}
                onPress={closeModal}
              >
                <Text style={styles.textCloseStyle}>Cerrar</Text>
              </Pressable>
            </View>
            </View>
          </Modal>
            ))}
            </>
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
  //estilos para el MODAL :
  modalView: {
    margin: 20,
    marginTop: '20%',
    backgroundColor: 'white'/* globalColors.gray3 */,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2, // Asegúrate de que el modal esté por encima del overlay
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'justify',
    marginTop:7,
  /*   lineHeight: 10, */
  },
  textStylePractica: {
    color: 'black',
    fontWeight: 'normal',
   /*  textAlign: 'justify', */
    marginTop:7,
    marginBottom:15,
  /*   lineHeight: 10, */
  },
  textStyleCoseguro: {
    color: 'red',
    fontWeight: 'normal',
    textAlign: 'justify',
    marginTop:7,
  /*   lineHeight: 10, */
  },
  textCloseStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //estilos para lograr un background borroso cuando esta el modal:
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(196, 193, 193, 0.5)', // Fondo semitransparente
    zIndex: 1, // Asegúrate de que esté por debajo del modal
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

