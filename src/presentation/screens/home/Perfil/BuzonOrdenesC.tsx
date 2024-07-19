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
  nombrePrestacion:string;
}
interface AutorizadasData {

  idOrden: string;
  estado: string;
  codAutorizacion: string;
  nombrePrestacion: string;
  comentarioRechazo: string;
  fecVencimiento: string;
  prestador: string;
  dom1Prestador: string;
  dom2Prestador: string;
  afiliado: string;
  coseguro: string;


  /*  idOrden: idOrden,
        estado: estado,
        nombrePrestacion: nombrePrestacion,
        comentarioRechazo: '',
        fecVencimiento: fecVencimiento,
        prestador: prestador, 
        dom1Prestador: dom1Prestador,
        dom2Prestador: dom2Prestador,
        coseguro: coseguro, */
}


interface NotificacionData {
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
  nombrePrestacion: string;
  cantidad: string;
  coseguroPrestacion: string;
}

export const BuzonOrdenesC = () => {
  console.log('Ingresando en  BuzonOrdenesC -->>>>>>>', );


  const { idAfiliado } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
/*   const [notificaciones2, setNotificaciones2] = useState([]); */
  const [notificacionesOrdenConsulta, setNotificacionesOrdenConsulta] = useState<NotificacionData[]>([]);

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

    const CombinedData2 = async () => {
      console.log('Ingresando en ProductsRequest de BuzonOrdenesC -->>>>>>>');
      try {
        setIsConsulting(true);
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENAMB?idAfiliado=${idAfiliado}&IMEI=`);
        console.log('Convirtiendo el response xmlData a result de BuzonOrdenesC -->>>>>>>>>>>>>>>');
    
        const xmlData = response.data;
        const result = xml2js(xmlData, { compact: true });
    
        // Extraer datos de tablaDatos y tablaDetalle
        const tablaDatos = result.Resultado?.tablaDatos;
        const tablaDetalle = result.Resultado?.tablaDetalle;
    
        if (!tablaDatos || !tablaDetalle) {
          console.log('En CombinedData tablaDatos o tablaDetalle es undefined: No hay datos disponibles.');
          setIsConsulting(false);
          setModalVisible2(true);
          return;
        }
    
        // Definir y verificar los datos extraídos
        const idOrden = tablaDatos.idOrden ? tablaDatos.idOrden.map((item: any) => (item._text || '').trim()) : [];
        const prestador = tablaDatos.prestador ? tablaDatos.prestador.map((item: any) => (item._text || '').trim()) : [];
        const dom1Prestador = tablaDatos.dom1Prestador ? tablaDatos.dom1Prestador.map((item: any) => (item._text || '').trim()) : [];
        const dom2Prestador = tablaDatos.dom2Prestador ? tablaDatos.dom2Prestador.map((item: any) => (item._text || '').trim()) : [];
        const codAutorizacion = tablaDatos.codAutorizacion ? tablaDatos.codAutorizacion.map((item: any) => (item._text || '').trim()) : [];
        const fecSolicitud = tablaDatos.fecSolicitud ? tablaDatos.fecSolicitud.map((item: any) => (item._text || '').trim()) : [];
        const fecVencimiento = tablaDatos.fecVencimiento ? tablaDatos.fecVencimiento.map((item: any) => (item._text || '').trim()) : [];
        const afiliado = tablaDatos.afiliado ? tablaDatos.afiliado.map((item: any) => (item._text || '').trim()) : [];
        const codEstado = tablaDatos.codEstado ? tablaDatos.codEstado.map((item: any) => (item._text || '').trim()) : [];
        const coseguro = tablaDatos.coseguro ? tablaDatos.coseguro.map((item: any) => (item._text || '').trim()) : [];
    
        const idOrdenDetalle = tablaDetalle.idOrdenDetalle ? tablaDetalle.idOrdenDetalle.map((item: any) => (item._text || '').trim()) : [];
        const nombrePrestacion = tablaDetalle.nombrePrestacion ? tablaDetalle.nombrePrestacion.map((item: any) => (item._text || '').trim()) : [];
        const descripcionPrestacion = tablaDetalle.descripcionPrestacion ? tablaDetalle.descripcionPrestacion.map((item: any) => (item._text || '').trim()) : [];
        const montoPrestacion = tablaDetalle.montoPrestacion ? tablaDetalle.montoPrestacion.map((item: any) => (item._text || '').trim()) : [];
        const codPrestacion = tablaDetalle.codPrestacion ? tablaDetalle.codPrestacion.map((item: any) => (item._text || '').trim()) : [];
    
        // Crear un array combinado
        const combinedData = idOrden.map((id, index) => ({
          idOrden: id,
          prestador: prestador[index] || '',
          dom1Prestador: dom1Prestador[index] || '',
          dom2Prestador: dom2Prestador[index] || '',
          codAutorizacion: codAutorizacion[index] || '',
          fecSolicitud: fecSolicitud[index] || '',
          fecVencimiento: fecVencimiento[index] || '',
          afiliado: afiliado[index] || '',
          codEstado: codEstado[index] || '',
          coseguro: coseguro[index] || '',
          // Agregar datos de tablaDetalle
          idOrdenDetalle: idOrdenDetalle[index] || '',
          nombrePrestacion: nombrePrestacion[index] || '',
          descripcionPrestacion: descripcionPrestacion[index] || '',
          montoPrestacion: montoPrestacion[index] || '',
          codPrestacion: codPrestacion[index] || ''
        }));
    
       /*  console.log('Datos combinados:', combinedData); */
    
        setNotificacionesOrdenConsulta(combinedData);
     
        setIsConsulting(false);
    
      } catch (error) {
        console.error('Error al obtener combinar y guardar los datos de ordenes de consulta:', error);
        setIsConsulting(false);
        setModalVisible2(true);
      }
    };
    
    /* 
; */

    const ProductsRequest = async () => {
   
      console.log('Ingresando en ProductsRequest de BuzonOrdenesC -->>>>>>>', );
      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENAMB?idAfiliado=${idAfiliado}&IMEI=` );
      

        console.log('Convirtiendo el response xmlData a result de BuzonOrdenesC -->>>>>>>>>>>>>>>');

        const xmlData = response.data;

/* console.log('Datos xmlData-------->>>>>>:', xmlData); */
        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });

          /*  console.log('Datos JSON convertidos y guardados. result es lo siguiente:', JSON.stringify(result)); */

        // @ts-ignore
        const notificacionesData = result.Resultado?.tablaDatos;
        console.log('Datos JSON convertidos y guardados. notificacionesData es lo siguiente:', notificacionesData);

/* -------LO SIGUIENTE ES ORIGINAL COMO ESTABA----------------------------------------------------------------------------- */
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
   
        })) : [];

        setNotificaciones(mappedNotificaciones);
   /*      console.log('las mappedNotificaciones de Ordenes de consulta son: ----------------------->', mappedNotificaciones); */
        

        setIsConsulting(false);

      } catch (error) {
        console.error('Error al obtener las notificaciones de ordenes de consulta:', error);
        setError('Error al obtener las notificaciones de ordenes de consulta');
        setIsConsulting(false)
      }
    };

 /*    ProductsRequest(); */
 CombinedData2()

  }, [idAfiliado, listadoEstMedicosVisible]);

  const PracticaResueltaRequest = async (
    afiliado: string,
    idOrden: string,
    estado: string,
    codAutorizacion:string,
    fecVencimiento: string,
    nombrePrestacion: string,
    prestador: string,
    dom1Prestador: string,
    dom2Prestador: string,
    coseguro: string,
    ) => {
    
    console.log('Ingresando en  PRACTICA RESUELTA REQUEST de Ordenes de Consulta Seleccionada-->>>>>>>idOrden:', idOrden);
   try {
    if (estado === 'RECHAZOPRACTICA' ) {
      console.log('En PracticaResueltaRequest de orden de consulta el estado === RECHAZOPRACTICA ');
      setIsConsulting(false);
      const rechazoInfo = [{
        idOrden: idOrden,
        estado: 'Esta practica fue rechazada',
        nombrePrestacion: nombrePrestacion,
        comentarioRechazo: '',
      }];
      setRechazoData(rechazoInfo)
      setModalVisible3(true);
      return;
    }
    const ordenInfo = [{
      afiliado: afiliado,
      idOrden: idOrden,
      estado: estado,
      codAutorizacion: codAutorizacion,
      fecVencimiento: fecVencimiento,
      nombrePrestacion: nombrePrestacion,
      comentarioRechazo: '',
      prestador: prestador,
      dom1Prestador: dom1Prestador,
      dom2Prestador: dom2Prestador,
      coseguro: coseguro,
    }];
   
    setModalData(ordenInfo);
    setModalVisible(true);
  } catch(error){
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
          <View style={{ marginBottom: 40, marginTop: 5, /* backgroundColor: 'blue', */ maxHeight: '90%', minHeight: '40%', width: '100%', marginHorizontal: 30, }}>

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
              notificacionesOrdenConsulta.length > 0 ?
                  (
                    <>
                     

                      {notificacionesOrdenConsulta.map((notificacion, index) => (
                      <Pressable
                        onPress={() => {
                          console.log('se toco en la notificacion');
                         PracticaResueltaRequest(
                          notificacion.afiliado,
                          notificacion.idOrden, 
                          notificacion.codEstado,
                          notificacion.codAutorizacion, 
                          notificacion.fecVencimiento,
                          notificacion.nombrePrestacion,
                          notificacion.prestador,
                          notificacion.dom1Prestador,
                           notificacion.dom2Prestador,
                          notificacion.coseguro,
                           ) 
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
                            <Text style={styles.textStyleOrdenConsulta}>idOrden: {data.idOrden}</Text>
                            <Text style={styles.textStyle}>afiliado: {data.afiliado}</Text>
                            <Text style={styles.textStyle}>
                              <Text style={styles.textStyle}>Codigo Autorización: </Text>
                              <Text style={styles.valueCodAutorizado}>{data.codAutorizacion}</Text>
                            </Text>         
                            <Text style={styles.textStyle}>Fec. Vencimiento: {data.fecVencimiento}</Text>
                            <Text style={styles.textStyle}>Prestador: {data.prestador}</Text>
                            <Text style={styles.textStyle}>Dirección:{data.dom1Prestador}{data.dom2Prestador}</Text>
                            <Text style={styles.textStyle}>
                              <Text style={styles.textStyle}>Coseguro: </Text>
                              <Text style={styles.valueCoseguro}>${data.coseguro}</Text>
                            </Text> 
                            <Text style={styles.textStylePractica}>Práctica: {data.nombrePrestacion}</Text>
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
                            {/* <Text style={styles.textStyleOrdenRechazada}>Detalle: {data.comentarioRechazo}</Text> */}
                          
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
   /*  textAlign: 'justify', */
    marginTop: 7,
  },
  valueCodAutorizado: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 7,
  },
  valueCoseguro: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 7,
  },
  textStyleOrdenConsulta: {
    color: 'black',
    fontWeight: 'normal',
 /*    textAlign: 'justify', */
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

