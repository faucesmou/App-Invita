import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet, Image, Pressable, Modal, } from 'react-native';
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
import Divider from '../../../components/shared/Divider';



interface Notificacion {
  idOrden: string;
  prestador: string;
  dom1Prestador: string;
  dom2Prestador: string;
  codAutorizacion: string;
  fecSolicitud: string;
  fecVencimiento: string;
  afiliado: string;
  codEstado: string;
  coseguro: string;

}
interface Rechazo {
  idOrden: string,
  estado: string;
  comentarioRechazo: string;
}
interface AutorizadasData {
  palabraClaveENC: string,
  fecVencimientoENC: string;
  nombreConvenio: string;
  domRenglon1: string,
  domRenglon2: string;
  coseguroENC: string;
  prestacionDET: string;
}

export const BuzonOrdenesC = () => {
  console.log('Ingresando en  BuzonOrdenesC -->>>>>>>', );


  const { idAfiliado } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [isConsulting, setIsConsulting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [listadoEstMedicosVisible, setListadoEstMedicosVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const [modalData, setModalData] = useState<AutorizadasData[]>([]);
  const [rechazoData, setRechazoData] = useState<Rechazo[]>([]);


  useEffect(() => {
    setIsConsulting(true);
    const ProductsRequest = async () => {
      let camote = '301936D8-6482-4625-82DD-38A932A4FC5A'
      console.log('Ingresando en ProductsRequest de BuzonOrdenesC -->>>>>>>', );
      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENAMB?idAfiliado=${idAfiliado}&IMEI=` );
        /*   console.log('EL RESPONSE DEL BUZON ES : ---------x-x-x-x-x-x->', response); */
        /* console.log('Este es el response de BuzonOrdenesC -->>>>>>>', response ); */

        console.log('Convirtiendo el response xmlData a result de BuzonOrdenesC -->>>>>>>>>>>>>>>');

        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });

        /*    console.log('Datos JSON convertidos:', result); */

        // @ts-ignore
        const notificacionesData = result.Resultado?.tablaDatos;
     /*    console.log('Este es el notificacionesData de BuzonOrdenesC -->>>>>>>', notificacionesData ); */

        if (notificacionesData === undefined) {
          console.log('En ProductsRequest notificacionesData es undefined: No hay notificaciones para este usuario.');
          setIsConsulting(false);
         
          return;
        }
        if (!notificacionesData) {
          setError('El formato de los datos recibidos no es el esperado.');
          console.log('En ProductsRequest el formato de los datos recibidos no es el esperado.');
        }

        // Mapear los datos 
        const mappedNotificaciones = Array.isArray(notificacionesData.idOrden) ? notificacionesData.idOrden.map((_: any, index: number) => ({
          idOrden: notificacionesData.idOrden[index]._text,
          prestador: notificacionesData.prestador[index]._text,
          dom1Prestador: notificacionesData.dom1Prestador[index]._text,
          dom2Prestador: notificacionesData.dom2Prestador[index]._text,
          codAutorizacion: notificacionesData.codAutorizacion[index]._text,
          fecSolicitud: notificacionesData.fecSolicitud[index]._text,
          fecVencimiento: notificacionesData.fecVencimiento[index]._text,
          afiliado: notificacionesData.afiliado[index]._text,
          codEstado: notificacionesData.codEstado[index]._text,
          coseguro: notificacionesData.coseguro[index]._text,
        /*   afiliado: notificacionesData.afiliado[index]._text,
          fecSolicitud: notificacionesData.fecSolicitud[index]._text,
          estado: notificacionesData.estado[index]._text,
          fecFinalizacion: notificacionesData.fecFinalizacion[index]._text,
          comentarioRechazo: notificacionesData.comentarioRechazo[index]._text, */
        })) : [];

        setNotificaciones(mappedNotificaciones);
        /*  console.log('Mapped notificaciones:', mappedNotificaciones); */
        /*   console.log('Notificaciones:', notificaciones); */
        setIsConsulting(false);

      } catch (error) {
        console.error('Error al obtener las notificaciones de ordenes de consulta:', error);
        setError('Error al obtener las notificaciones de ordenes de consulta');
        setIsConsulting(false)
      }
    };

    ProductsRequest();

  }, [idAfiliado, listadoEstMedicosVisible]);

  const PracticaResueltaRequest = async (idOrden: string, estado: string, comentarioRechazo: string) => {
    
    console.log('Ingresando en  PRACTICA RESUELTA REQUEST-->>>>>>>idOrden:', idOrden);
   
    if (estado === 'RECHAZOPRACTICA' ) {
      console.log('En PracticaResueltaRequest estado === RECHAZOPRACTICA ');
      setIsConsulting(false);
      const rechazoInfo = [{
        idOrden: idOrden,
        estado: 'Esta práctica fue rechazada',
        comentarioRechazo: comentarioRechazo,
      }];
      setRechazoData(rechazoInfo)
      setModalVisible3(true);
      return;
    }


   
    try {
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPDatosPracticaResuelta?IMEI=&idOrdenAPP=${idOrden}`)
      const xmlData = response.data;

      // Convertir XML a JSON
      const result = xml2js(xmlData, { compact: true });
      /*  const practicaResueltaData = result.root?.tablaEncabezado; */

      const practicaResueltaData = {
        // @ts-ignore
        tablaEncabezado: result?.root?.tablaEncabezado,
        // @ts-ignore
        tablaDetalle: result?.root?.tablaDetalle,
      };
   /*    console.log('Datos JSON convertidos desde el PRACTICA RESUELTA REQUEST-->>>>>>>:', result);
      console.log('practicaResueltaData -->>>>>>>>:', practicaResueltaData); */

      if (practicaResueltaData.tablaEncabezado === undefined || practicaResueltaData.tablaDetalle === undefined ) {
        console.log('En PracticaResueltaRequest practicaResueltaData tabla encabezado o tabla detalle es undefined: No hay notificaciones para este usuario.');
        setIsConsulting(false);
        setModalVisible2(true);
        return;
      }
      if (!practicaResueltaData) {
        setError('El formato de los datos recibidos no es el esperado.');
        console.log('En PracticaResueltaRequest el formato de los datos recibidos no es el esperado.');
      }

      // Verificar si practicaResueltaData y sus atributos necesarios están definidos
      if (practicaResueltaData && practicaResueltaData.tablaEncabezado && practicaResueltaData.tablaDetalle) {


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

        setModalVisible(true);
      } else {
        console.error('practicaResueltaData or idOrdenENC is undefined');
        setModalVisible2(true);
      }

    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
      setModalVisible2(true);

    }
  }


  const getButtonText = (notificacion: string) => {
    if (notificacion === 'AUT') {
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
  //este es el original :
  const closeModal = () => {
    setModalVisible(false);
    setModalVisible2(false);
    setModalVisible3(false);
    setModalData([]);
  };
  const modifyEstMedicVisible = () => {
    setListadoEstMedicosVisible(prevState => !prevState);
  };

  const color = globalColors.gray;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  /*  console.log('estas son las notificaciones:', notificaciones); */
  return (
    <>
     <View style={styles.ContainerEstudiosMedicosTitleAfuera} >
        <Pressable
          onPress={() => {
            console.log('se toco el titulo Ordenes de Consulta');
            modifyEstMedicVisible()
          }
          }
        >
          <Text style={styles.titleEstudiosMedicosAfuera} >Ordenes de Consulta:</Text>
        </Pressable>
      </View>
      {listadoEstMedicosVisible ?
        (
          <View style={{ marginBottom: 40, marginTop: 5, /* backgroundColor: 'blue', */ maxHeight: '50%', minHeight: '40%', width: '100%', marginHorizontal: 30, }}>

          {/* <View style={styles.ContainerEstudiosMedicosTitle} >
          <Pressable
          onPress={()=>{
            console.log('se toco el titulo ordenes de consulta');
            modifyEstMedicVisible()
          }
          }
          >
            <Text style={styles.titleEstudiosMedicos} >Ordenes de Consulta:</Text>
          </Pressable>
          </View> */}

          <ScrollView>
            
            {isConsulting ?
              (
                <View style={styles.LoaderContainer}>
                  <FullScreenLoader />
                </View>
              )
              :
              error ? (
                <>
                  <View style={styles.errorContainerBuzon} >
                     <Text style={styles.titleErrorBuzon} >Sin notificaciones</Text>  

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
                  </View>


                </>
              ) :
                notificaciones.length > 0 ?
                  (
                    <>
                     

                      {notificaciones.map((notificacion, index) => (
                      <Pressable
                        onPress={() => {
                          console.log('se toco en la notificacion')
                        /*   PracticaResueltaRequest(notificacion.idOrden, notificacion.estado, notificacion.comentarioRechazo) */
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
                              {notificacion.codEstado && (
                                <Text style={styles.descriptionText}>

                                  Estado:{
                                    getButtonText(notificacion.codEstado)
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
                      ) }  
                    </>
                  ) :
                  (
                    <>
                     <View style={styles.SinNotificacionesContainerBuzon} >
                        <Text style={styles.SinNotificacionesTitleBuzon} >No tienes notificaciones</Text>
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

              <Modal
                /*    key={index} */
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
              >
              
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.textStyletTitle}>Órdenes autorizadas: </Text>
                  <ScrollView contentContainerStyle={styles.scrollViewContent}>
                      {modalData.map((data, index) => (
                        <>
                          <View style={{ marginTop: 10 }}>
                            <Text style={styles.textStyle}>Codigo Autorización: {data.palabraClaveENC}</Text>
                            <Text style={styles.textStyle}>Fec. Vencimiento:      {data.fecVencimientoENC}</Text>
                            <Text style={styles.textStyle}>Prestador: {data.nombreConvenio}</Text>
                            <Text style={styles.textStyle}>Dirección:{data.domRenglon1}{data.domRenglon2}</Text>
                            <Text style={styles.textStyleCoseguro}>Coseguro: ${data.coseguroENC}</Text>
                            <Text style={styles.textStylePractica}>Práctica: {data.prestacionDET}</Text>
                          </View>

                          <Divider />
                        </>
                      ))}
                    </ScrollView>
                    <Pressable
                      style={styles.button}
                      onPress={closeModal}
                    >
                      <Text style={styles.textCloseStyle}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </>
            <>
              {modalVisible3 && (
                <View style={styles.overlay} />
              )}

              <Modal
                /*    key={index} */
                animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={closeModal}
              >
              
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.textStyletTitle}>Órden rechazada: </Text>
                  <ScrollView contentContainerStyle={styles.scrollViewContent}>
                      {rechazoData.map((data, index) => (
                        <>
                          <View style={{ marginTop: 10, marginBottom: 20 }}>

                            <Text style={styles.textStyleOrdenRechazada}>idOrden: {data.idOrden}</Text>
                            <Text style={styles.textStyleOrdenRechazada}>Estado: {data.estado}</Text>
                            <Text style={styles.textStyleOrdenRechazada}>Detalle: {data.comentarioRechazo}</Text>
                          
                          </View>

                          <Divider />
                        </>
                      ))}
                    </ScrollView>
                    <Pressable
                      style={styles.button}
                      onPress={closeModal}
                    >
                      <Text style={styles.textCloseStyle}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </>
            <>
              {modalVisible2 && (
                <View style={styles.overlay} />
              )}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={closeModal}
              >
              
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.textStyletTitlePracticaNoEncontrada}>No se encontró la solicitud de práctica indicada</Text>
                    <Text style={styles.textStyletTitlePracticaNoEncontrada}>Por favor intente nuevamente más tarde</Text>
                    <Pressable
                      style={styles.button}
                      onPress={closeModal}
                    >
                      <Text style={styles.textCloseStyle}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              </>
            </ScrollView>

      </View>
          ) :
          (
            <></>
         
          )
        }
    </>
  );
};
 {/* <Pressable
            style={styles.button}
           
          >
            <Text style={styles.textCloseStyle}>hola</Text>
          </Pressable> */}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 30,
    marginHorizontal: 20,
    marginTop: 10,
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
  LoaderContainer: {
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
    marginTop: 90,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
/*     backgroundColor: 'violet', */
    borderRadius: 5,
    marginHorizontal:35,
  },
  ContainerEstudiosMedicosTitleAfuera: {
    marginTop: 10,
    marginBottom:5,
    padding: 5,
    backgroundColor: '#9dcaf1'/* '#d7e5f8' */,
    borderRadius: 5,
    marginHorizontal:10,
    minWidth:'80%',
    maxWidth:'80%',
  },
  titleEstudiosMedicosAfuera: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
    minWidth:'100%',
  },
  ContainerEstudiosMedicosTitle: {
    marginTop: 10,
    marginBottom:5,
    padding: 5,
    backgroundColor: '#9dcaf1'/* '#d7e5f8' */,
    borderRadius: 5,
    marginHorizontal:35,
  },
  titleErrorBuzon: {
    marginBottom: 5,
    fontSize: 18,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
    marginHorizontal:20,
  },
  titleEstudiosMedicos: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
  },
  SinNotificacionesContainerBuzon: {
    marginTop: 20,
    padding: 30,
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
    width: '80%', // Ajusta el ancho según sea necesario
    maxHeight: '60%', // Ajusta la altura según sea necesario
  },
  // altura del scrollView: 
   scrollViewContent: {
    flexGrow: 0,
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
    marginTop: 7,
  },
  textStyleOrdenRechazada: {
    color: 'black',
    fontWeight: 'normal',
/*     textAlign: 'justify', */
    marginTop: 7,
  },
  textStyletTitle: {
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'justify',
    marginTop: 4,
    fontSize: 19,
  },
  textStyletTitlePracticaNoEncontrada: {
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 4,
    fontSize: 18,
    marginBottom:5,
  },
  textStylePractica: {
    color: 'black',
    fontWeight: 'bold',
    /*  textAlign: 'justify', */
    marginTop: 7,
    marginBottom: 15,
    fontSize: 12,
    /*   lineHeight: 10, */
  },
  textStyleCoseguro: {
    color: 'red',
    fontWeight: 'normal',
    textAlign: 'justify',
    marginTop: 7,
    /*   lineHeight: 10, */
  },
  textCloseStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  //estilos para lograr un background borroso cuando esta el modal:
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(196, 193, 193, 0.27)', // Fondo semitransparente
    zIndex: 1, // Asegúrate de que esté por debajo del modal
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

