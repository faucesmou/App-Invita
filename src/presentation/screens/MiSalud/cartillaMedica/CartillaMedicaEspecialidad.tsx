import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert, Platform, FlatList, Modal, Dimensions } from 'react-native';

import axios from 'axios';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { xml2js, ElementCompact } from 'xml-js';

import { useAuthStore } from '../../../store/auth/useAuthStore';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
  idCartilla?: string;
  nombreEspecialidad44?: string;
}

interface Prestador {
  idConvenio: string;
  nombre: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  lat: string;
  long: string;
  telefonos: string[];
}

export const CartillaMedicaEspecialidad = ({ idCartilla, nombreEspecialidad44 }: Props) => {
  
  console.log('Entrando a CartillaMedicaEspecialidad--------------------->');

  const screenWidth = Dimensions.get('window').width;
  const dynamicGap = screenWidth * 0.00;

  const dynamicMargin = screenWidth * 0.01;

  const [isConsulting, setIsConsulting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalData, setModalData] = useState([]);
  
  const [selectedValue, setSelectedValue] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);

  const [cartillas, setCartillas] = useState<{ nombre: string; /* descripcion: string; */ idConvenio: string }[]>([]);
  const [cartillas2, setCartillas2] = useState<{ nombre: string; idConvenio: string }[]>([]);
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [prestadoresCordoba, setPrestadoresCordoba] = useState<Prestador[]>([]);
  const [prestadoresSanJuan, setPrestadoresSanJuan] = useState<Prestador[]>([]);
  const [prestadoresMendoza, setPrestadoresMendoza] = useState<Prestador[]>([]);
  const [prestadoresSanLuis, setPrestadoresSanLuis] = useState<Prestador[]>([]);
  const [prestadoresTodos, setPrestadoresTodos] = useState<Prestador[]>([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string | null>(null); 


  const [mostrarFiltrados, setMostrarFiltrados] = useState(false);
  const [pressedButton, setPressedButton] = useState(null);
  
  const { idAfiliadoTitular, idAfiliado, idCartillaSeleccionada, nombreEspecialidadSeleccionada } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  

  useEffect(() => {

    const CartillaRequest = async () => {

      if (idCartillaSeleccionada === undefined ) {
        let sinCartilas = [{
          nombre: 'No se encontraron prestadores para esta especialidad',
          idConvenio: 'sin convenio'
        }]
        setCartillas(sinCartilas);
        return
      }
      try {
        setIsConsulting(true);
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscarPrestadoresCartilla?IMEI=&idAfiliado=${idAfiliado}&idCartilla=${idCartillaSeleccionada}`)
        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });
        const result2 = xml2js(xmlData, { compact: true }) as ElementCompact;

        try {


          const prestadores = result2.Resultado.fila.tablaPrestadores;
          const domicilios = result2.Resultado.fila.tablaDomicilios;
          const telefonos = result2.Resultado.fila.tablaTelefonos;

          // Asegúrate de que estamos tratando con arreglos
          const prestadoresList = Array.isArray(prestadores.idConvenio) ? 
          //@ts-ignore
          prestadores.idConvenio.map((_, index) => ({
            idConvenio: prestadores.idConvenio[index],
            nombre: prestadores.nombre[index],
            ordenAccion: prestadores.ordenAccion[index],
            ordenAccionInt: prestadores.ordenAccionInt[index],
            descartar: prestadores.descartar[index]
          })) : [];


          const domiciliosList = Array.isArray(domicilios.idConvenioDom) ? 
          //@ts-ignore
          domicilios.idConvenioDom.map((_, index) => ({
            idConvenioDom: domicilios.idConvenioDom[index],
            idDomicilioDom: domicilios.idDomicilioDom[index],
            domicilio: domicilios.domicilio[index],
            localidad: domicilios.localidad[index],
            provincia: domicilios.provincia[index],
            lat: domicilios.lat[index],
            long: domicilios.long[index],
            paraOrden: domicilios.paraOrden[index]
          })) : [];

          const telefonosList = Array.isArray(telefonos.idDomicilioTel) ? 
          //@ts-ignore
          telefonos.idDomicilioTel.map((_, index) => ({
            idDomicilioTel: telefonos.idDomicilioTel[index],
            telefono: telefonos.telefono[index]
          })) : [];

          const arrayPrestadores: any[] = [];

          prestadoresList.forEach((prestador: any) => {
            const { idConvenio, nombre } = prestador;

            // Buscar el domicilio correspondiente
            const domicilio = domiciliosList.find((d: any) => d.idConvenioDom._text === idConvenio._text);

            if (!domicilio) {
              // Si no se encuentra el domicilio, puedes devolver un objeto vacío o manejar el error
              return {
                idConvenio: idConvenio,
                nombre: nombre,
                domicilio: 'Desconocido',
                localidad: 'Desconocido',
                provincia: 'Desconocido',
                lat: 'Desconocido',
                long: 'Desconocido',
                telefonos: []
              };
            }


            // Buscar los teléfonos correspondientes
            const telefonoList = telefonosList
              .filter((t: any) => t.idDomicilioTel._text === domicilio.idDomicilioDom._text)
              .map((t: any) => t.telefono._text);

            // Si no hay teléfonos disponibles, establecer un valor predeterminado
            const telefonos = telefonoList.length > 0 ? telefonoList : ['No disponible'];

            function capitalizeText(text: string): string {
              return text
                .toLowerCase() // Convierte todo el texto a minúsculas primero
                .split(' ') // Divide el texto en palabras
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
                .join(' '); // Une las palabras con un espacio
            }

            arrayPrestadores.push({
              idConvenio: idConvenio._text,
              nombre: capitalizeText(nombre._text),
              domicilio: domicilio.domicilio._text.toLowerCase(),
              localidad: domicilio.localidad._text,
              provincia: domicilio.provincia._text,
              lat: domicilio.lat._text,
              long: domicilio.long._text,
              telefonos: telefonos
            });
          });
          setPrestadores(arrayPrestadores)
        console.log('prestadores son: --->', prestadores);
        
          
          setPrestadoresCordoba(arrayPrestadores);

        } catch (err) {
          console.log('Tuvimos un problemita en CartillaRequest (CartillaMedicaEspecialidad). Err:', err);
          setIsConsulting(false);
        }

        /* ---------------------------------------------------------------- */

        //@ts-ignore
        const cartillasData = result.Resultado.fila.tablaPrestadores;


        // Mapear los datos correctamente
        const mappedCartillas = cartillasData.nombre.map((_: any, index: number) => ({
          nombre: cartillasData.nombre[index]._text,
          idConvenio: cartillasData.idConvenio[index]._text,
          // descripcion: cartillasData.descartar[index]._text || 'No hay descripción', // Si decides usar la descripción
        }));

        setCartillas(mappedCartillas);

      } catch (error) {
        console.error('Error al obtener los formularios:', error);
        let sinCartilas = [{
          nombre: 'No se encontraron prestadores para esta especialidad',
          idConvenio: 'sin convenio'
        }]
        setCartillas(sinCartilas);
        if (axios.isAxiosError(error)) {
          console.error('Detalles del error:', JSON.stringify(error, null, 2));
          let sinCartilas = [{
            nombre: 'No se encontraron prestadores para esta especialidad',
            idConvenio: 'sin convenio'
          }]
          setCartillas(sinCartilas);
        }
      }
      setIsConsulting(false);

    };
    CartillaRequest()

  }, [idAfiliadoTitular, idCartillaSeleccionada ])


  const handlePhonePress2 = (phoneNumber: any) => {
    Alert.alert(
      'Abrir Contacto',
      `¿Deseas abrir WhatsApp o llamar al número ${phoneNumber}?`,
      [
        {
          text: 'WhatsApp',
          onPress: () => {
            // Aquí mostrarías un mensaje indicando que la acción se realizaría en un dispositivo físico
            console.log('Abrir WhatsApp:', phoneNumber);
            const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
            Linking.openURL(whatsappUrl)
            .then(() => {
              console.log('WhatsApp abierto correctamente');
            })
            .catch((err) => {
              Alert.alert('Error', 'No se pudo abrir WhatsApp. Por favor, verifica tu conexión a internet.');
            console.log('el error es el siguiente:', err);
            
            });
          },
        },
        {
          text: 'Llamar',
          onPress: () => {
            // Aquí mostrarías un mensaje indicando que la acción se realizaría en un dispositivo físico
            console.log('Llamar:', phoneNumber);
            Linking.openURL(`tel:${phoneNumber}`)
            .then(()=> {
              console.log('llamada iniciada correctamente');
              
            })
            .catch((err)=>{
              Alert.alert('Error', 'No se pudo llamar al número indicado, por favor verifica que sea válido');
              console.log('el error es el siguiente:', err);
            })
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };
  
  const handleShowLocation = (latitude: string, longitude: string) => {
    Alert.alert(
      'Ver en Google Maps',
      '¿Deseas ver esta ubicación en Google Maps?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ver',
          onPress: () => {
           try{
            console.log(`la latitude es: ${latitude} y la longitude es: ${longitude}` );
            
          const url = `maps:0?q=${latitude},${longitude}`; 
          
             console.log('la url es: ----->', url);
             
             Linking.openURL(url)
           }catch(err){
            console.error('ocurrio un error al intentar abrir el mapa:', err)
              /*  const url = `comgooglemaps://?center=${latitude},${longitude}&zoom=14`; */
            /* const url = `comgooglemaps://?center=<span class="math-inline">\{latitude\.trim\(\)\},</span>{longitude.trim()}&zoom=14`; */
            /* const url = `comgooglemaps://?center=${encodeURIComponent(latitude.trim())},${encodeURIComponent(longitude.trim())}`; */
           }
          
          /*   const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(mapUrl); */
          },
        },
      ]
    );
  };


const filtrarPorCordoba = () => {
  const palabrasClave = [ "CORDOBA", "B5000","5105","VILLA ALLENDE", ];  
     const filtrados = prestadores.filter(prestador =>
    palabrasClave.some(palabra =>
      prestador.localidad.toUpperCase().includes(palabra)
    )
  ); 
  setPrestadoresCordoba(filtrados);
  setProvinciaSeleccionada('Córdoba');
  setMostrarFiltrados(true);
};
const filtrarPorSanJuan = () => {

   const palabrasClave = [ "5400", "CAUCETE", "5442", "SAN JUAN"]; 
   const filtrados = prestadores.filter(prestador =>
    palabrasClave.some(palabra =>
      prestador.localidad.toUpperCase().includes(palabra)
    )
  );
  setPrestadoresSanJuan(filtrados);
  setProvinciaSeleccionada('San Juan');
  setMostrarFiltrados(true);
};

const filtrarPorMendoza = () => {
  const palabrasClave = ["MENDOZA", "5500", "5519", "5501","5521","5515", "5509",  "DORREGO", "LUJAN DE CUYO", "MAIPU", "GUAYMALLEN", "LAVALLE","GENERAL SAN MARTIN", "TUNUYAN", "GODOY CRUZ"];
  const filtrados = prestadores.filter(prestador =>
    palabrasClave.some(palabra =>
      prestador.localidad.toUpperCase().includes(palabra)
    )
  );
  setPrestadoresMendoza(filtrados);
  setProvinciaSeleccionada('Mendoza');
  setMostrarFiltrados(true);
};
const filtrarPorSanLuis = () => {
  const palabrasClave = [ "5700", "SAN LUIS", "VILLA MERCEDES", "5730"];
  const filtrados = prestadores.filter(prestador =>
    palabrasClave.some(palabra =>
      prestador.localidad.toUpperCase().includes(palabra)
    )
  );
  setPrestadoresSanLuis(filtrados);
  setProvinciaSeleccionada('San Luis');
  setMostrarFiltrados(true);
};
const filtrarPorTodos = () => {
  const filtrados = prestadores
  setPrestadoresTodos(filtrados);
  setProvinciaSeleccionada('Todos');
  setMostrarFiltrados(true);
};

  const handleSelect2 = (value:any) => {
    const actions = {
      'Córdoba': filtrarPorCordoba,
      'Mendoza': filtrarPorMendoza,
      'San Juan': filtrarPorSanJuan,
      'San Luis': filtrarPorSanLuis,
      'Todos': filtrarPorTodos,
    };
//@ts-ignore
    const action = actions[value];
    if (action) {
      action();
    } else {
      console.warn(`No hay acción definida para la opción: ${value}`);
    }
    setSelectedValue(value);
    setModalVisible(false);  // Cierra el modal después de seleccionar
  };
 
  const renderPrestadores = () => {
    switch (provinciaSeleccionada) {
      case 'Córdoba':
        console.log('es el caso cordoba ');
        return prestadoresCordoba;
      case 'San Juan':
        console.log('es el caso san juan ');
        return prestadoresSanJuan;
      case 'Mendoza':
        console.log('es el caso mendoza ');
        return prestadoresMendoza;
      case 'San Luis':
        console.log('es el caso san luis ');
        return prestadoresSanLuis;
      default:
        return prestadores; 
    }
  };
  const prestadoresParaMostrar = renderPrestadores();

  function capitalizeWords(input: string | undefined): string {
    if (!input) {
      return "";
    }
    return input.replace(/\b\p{L}+/gu, function (word) {
      return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
    });
  }

  return (
    <View

      style={{ ...globalStyles.container, marginBottom: hp('0%'), }}

    >
      <CustomHeader /* color={globalColors.gray2} */ titleSize={hp('4%')} />

      <BackButton Size={hp('4%')}/>

      <Text style={{
        marginBottom: 10,
        marginTop: 0,
        fontSize: hp('3%'),
        textAlign: 'center',
        color: globalColors.gray2,
        fontWeight: 'bold',

      }}>{capitalizeWords(nombreEspecialidadSeleccionada)}</Text>


      <View style={[styles.container, { gap: dynamicGap, }]}>
        {/* Botón que abre el modal */}
        <Text style={[styles.consignaText, { marginHorizontal: dynamicMargin, fontSize: hp('2.5%') }]}>Filtrá tus Prestadores: </Text>
        <TouchableOpacity
          style={[styles.selectButton, { marginHorizontal: dynamicMargin }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>{selectedValue}</Text>
        </TouchableOpacity>

        {/* Modal para seleccionar las opciones */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {['Todos', 'Córdoba', 'Mendoza', 'San Juan', 'San Luis'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => handleSelect2(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

      <View style={{ flex: 1, marginBottom: hp('4%'), marginTop: 0 }}>



        {isConsulting ? (

          <>
<View style={styles.aguardaContainer}>
                <Text style={styles.aguardaText}>
                  Aguardá un momento mientras obtenemos tus Prestadores
                </Text>
                <Text style={styles.aguardaText}>
                  Esto puede tomar unos segundos
                </Text>
            <FullScreenLoader layoutStyle={{ justifyContent: 'center', /* backgroundColor:'green'  */}}  />
              </View>
          </>
        ) : (
          <ScrollView >
            {prestadoresParaMostrar.length === 0 ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>
                  No se encontraron prestadores para esta Especialidad y Provincia.
                </Text>
              </View>
            ) : (

              renderPrestadores().map((prestador) => (
                <View key={prestador.idConvenio} style={styles.TertiaryButton}>
                  <View style={styles.contentWrapper2}>
                    <View style={styles.textWrapper}>
                      <Text style={styles.descriptionTextNombre}>{prestador.nombre}</Text>
                      <View style={styles.direccionContainer}>
                        {prestador.lat && prestador.long ? (
                          <>
                            <Text style={styles.descriptionText}>
                              Direccion: {prestador.domicilio} Localidad: {prestador.localidad}
                            </Text>
                            <TouchableOpacity
                              style={styles.telefonoTouchable}
                              onPress={() => handleShowLocation(prestador.lat, prestador.long)}
                            >
                              <Text style={styles.descriptionTextMapa}>Ver Mapa</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <Text style={styles.descriptionText}>Direccion: {prestador.domicilio}</Text>
                        )}
                      </View>
                      <View style={styles.telefonosContainer}>
                        <Text style={styles.descriptionText}>Teléfonos:</Text>
                        {prestador.telefonos.length > 0 && prestador.telefonos[0] !== "No disponible" ? (
                          prestador.telefonos.map((telefono) => (
                            <TouchableOpacity style={styles.telefonoTouchable} key={telefono} onPress={() => handlePhonePress2(telefono)}>
                              <Text style={styles.descriptionTexttelefono}>{telefono}</Text>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <Text style={styles.descriptionText}>No disponible</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

              ))
            )
            }

        </ScrollView>
      )
      }
      </View>

    </View>

  )
}


const styles = StyleSheet.create({
  TertiaryButton: {
    backgroundColor: 'white',
    minWidth: '80%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 5,
    margin: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center'
  },
  direccionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   justifyContent: 'center',
  },
  telefonosContainer: {
    display: 'flex',
    flexDirection: 'row',
   justifyContent: 'center',
  flexWrap:'wrap',
  marginTop:5,
  },
  descriptionTextNombre: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  telefonoTouchable: {
 marginLeft:5,
  },
  descriptionTexttelefono: {
    color: 'blue',
    fontSize: 15,
    textAlign: 'center',
  },
  descriptionTextMapa: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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
    marginHorizontal: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    margin:0,
    padding:0,
    backgroundColor: '#4285F4',
  },
  consignaText: {
    color: 'black',
    fontSize: 18,
    margin:0,
    padding:0
  },
/* inicio del modal  */
container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    gap: -10,
    marginBottom: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 10,
    maxHeight: 400, // Limita la altura del modal para permitir el scroll
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
 backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selectButton: {
    backgroundColor: '#4285F4',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  /* cartel de no hay prestadores:  */
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  aguardaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  aguardaText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#595960',
  },
})


