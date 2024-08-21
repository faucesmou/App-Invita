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
  const [mostrarFiltrados, setMostrarFiltrados] = useState(false);
  const [pressedButton, setPressedButton] = useState(null);
  
  const { idAfiliadoTitular, idAfiliado, idCartillaSeleccionada, nombreEspecialidadSeleccionada } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  const options = ['Todos', 'Córdoba', 'Mendoza', 'San Juan', 'San Luis'];

 

  useEffect(() => {

    const CartillaRequest = async () => {

      if (idCartillaSeleccionada === undefined) {
        let sinCartilas = [{
          nombre: 'No se encontraron prestadores para esta especialidad',
          idConvenio: 'sin convenio'
        }]
        setCartillas(sinCartilas);
        return
      }
      try {
        setIsConsulting(true);
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscarPrestadoresCartilla?IMEI=&idAfiliado=4E7EF475-B01B-4FED-BE87-3B896766D4DA&idCartilla=${idCartillaSeleccionada}`)
        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });
        const result2 = xml2js(xmlData, { compact: true }) as ElementCompact;

        try {


          const prestadores = result2.Resultado.fila.tablaPrestadores;
          const domicilios = result2.Resultado.fila.tablaDomicilios;
          const telefonos = result2.Resultado.fila.tablaTelefonos;

          // Asegúrate de que estamos tratando con arreglos
          const prestadoresList = Array.isArray(prestadores.idConvenio) ? prestadores.idConvenio.map((_, index) => ({
            idConvenio: prestadores.idConvenio[index],
            nombre: prestadores.nombre[index],
            ordenAccion: prestadores.ordenAccion[index],
            ordenAccionInt: prestadores.ordenAccionInt[index],
            descartar: prestadores.descartar[index]
          })) : [];


          const domiciliosList = Array.isArray(domicilios.idConvenioDom) ? domicilios.idConvenioDom.map((_, index) => ({
            idConvenioDom: domicilios.idConvenioDom[index],
            idDomicilioDom: domicilios.idDomicilioDom[index],
            domicilio: domicilios.domicilio[index],
            localidad: domicilios.localidad[index],
            provincia: domicilios.provincia[index],
            lat: domicilios.lat[index],
            long: domicilios.long[index],
            paraOrden: domicilios.paraOrden[index]
          })) : [];

          const telefonosList = Array.isArray(telefonos.idDomicilioTel) ? telefonos.idDomicilioTel.map((_, index) => ({
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
          console.log('estos son los prestadores: ', prestadores);
          
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
  const filtrados = prestadores.filter(prestador =>
    prestador.localidad.toUpperCase().includes("CORDOBA")
  );
  console.log("Prestadores filtrados por Córdoba:", filtrados);
  setPrestadoresCordoba(filtrados);
  setMostrarFiltrados(true);
};
const filtrarPorSanJuan = () => {
  const filtrados = prestadores.filter(prestador =>
    prestador.localidad.toUpperCase().includes("CORDOBA")
  );
  console.log("Prestadores filtrados por Córdoba:", filtrados);
  setPrestadoresCordoba(filtrados);
  setMostrarFiltrados(true);
};
const mostrarTodos = () => {
  console.log("Se toco en mostrar todos");
  setMostrarFiltrados(false);
};
/* const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);

    switch (itemValue) {
      case 'Cordoba':
        filtrarPorCordoba();
        break;
      case 'Mendoza':
        // Llama a la función de filtro para Mendoza
        break;
      case 'San Juan':
        // Llama a la función de filtro para San Juan
        break;
      case 'San Luis':
        // Llama a la función de filtro para San Luis
        break;
      case 'Todos':
        mostrarTodos();
        break;
      default:
        break;
    }
  }; */
const handleSelect = (value: any) => {
    setSelectedValue(value);
    setModalVisible(false);
switch (value) {
      case 'Cordoba':
        filtrarPorCordoba();
        break;
      case 'Mendoza':
        console.log("Se toco en mendoza");
        break;
      case 'San Juan':
        console.log("Se toco en san juan");
        break;
      case 'San Luis':
        console.log("Se toco en san luis");
        break;
      case 'Todos':
        mostrarTodos();
        break;
      default:
        break;
    }
  };
  const handleSelect2 = (value) => {
    const actions = {
      'Córdoba': filtrarPorCordoba,
      'Mendoza': filtrarPorCordoba,
      'San Juan': filtrarPorCordoba,
      'San Luis': filtrarPorCordoba,
      'Todos': mostrarTodos,
    };

    const action = actions[value];
    if (action) {
      action();
    } else {
      console.warn(`No hay acción definida para la opción: ${value}`);
    }

    setSelectedValue(value);
    setModalVisible(false);  // Cierra el modal después de seleccionar
  };
   const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );


  return (
    <View

      style={{ ...globalStyles.container, marginBottom: 0, }}

    >
      <CustomHeader color={globalColors.gray2} />

      <BackButton />

      <Text style={{
        marginBottom: 10,
        marginTop: 0,
        fontSize: 30,
        textAlign: 'center',
        color: globalColors.gray2,
        fontWeight: 'bold',

      }}>{nombreEspecialidadSeleccionada}</Text>

{/* <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal> */}
      <View style={[styles.container, { gap: dynamicGap }]}>
        {/* Botón que abre el modal */}
        <Text style={[styles.consignaText, { marginHorizontal:dynamicMargin }]}>Filtrá tus prestadores: </Text>
        <TouchableOpacity
          style={[styles.selectButton, {marginHorizontal:dynamicMargin}]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>{selectedValue}</Text>
        </TouchableOpacity>

        {/* Modal para seleccionar las opciones */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
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

      <View style={{ /* backgroundColor: 'yellow', */ flex: 1, marginBottom: 60, marginTop: 0 }}>

            

      {isConsulting ? (
     
        <> 
   
          <FullScreenLoader /> 
        </>
      ) : (
        <ScrollView /* contentContainerStyle={styles.scrollViewContent} */>


{(mostrarFiltrados ? prestadoresCordoba : prestadores).map((prestador) => (
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
  ))}

         {/*  {prestadores.map((prestador) => (
          

            <View key={prestador.idConvenio} style={styles.TertiaryButton}>
              <View style={styles.contentWrapper2}>
                <View style={styles.textWrapper}>
                  <Text style={styles.descriptionTextNombre}>
                    {prestador.nombre}
                  </Text>
                 
                  <View style={styles.direccionContainer} >
                    {prestador.lat != "" && prestador.long != "" ?
                      (
                        <>

                          <Text style={styles.descriptionText}>
                            Direccion: {prestador.domicilio}
                           Localidad: {prestador.localidad}
                          </Text>

                          <TouchableOpacity
                            style={styles.telefonoTouchable}
                            onPress={() => handleShowLocation(prestador.lat, prestador.long)}
                          >
                            <Text style={styles.descriptionTextMapa}>Ver Mapa</Text>
                          </TouchableOpacity>

                        </>
                      )
                      : (
                        <Text style={styles.descriptionText}>
                          Direccion:{prestador.domicilio}
                        </Text>
                      )
                    }
                  </View>

                  <View style={styles.telefonosContainer} >
                    <Text style={styles.descriptionText}>
                      Teléfonos:
                    </Text>
                    {prestador.telefonos.length > 0 && prestador.telefonos[0] !== 'No disponible' ? (
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


          ))} */}
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
/*   marginTop:5, */
/*   backgroundColor: 'yellow'  */
  },
  telefonosContainer: {
    display: 'flex',
    flexDirection: 'row',
   justifyContent: 'center',
  flexWrap:'wrap',
  marginTop:5,
/*   backgroundColor: 'yellow'  */

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
 /*    textDecorationLine: 'underline', */
  },
  descriptionTextMapa: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
 /*    textDecorationLine: 'underline', */
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
  buttonContainer: {
    flexDirection: 'row',
   /*  justifyContent: 'space-around', */
  /*   marginVertical: 5, */
    alignItems:'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: globalColors.pressed,
    padding: 5,
    borderRadius: 5,
    margin: 5,
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    margin:0,
    padding:0,
   
  },
  consignaText: {
    color: 'black',
    fontSize: 18,
    margin:0,
    padding:0
  },
  pressedButton: {
    backgroundColor: 'red', // O el color que quieras para el botón presionado
  },
/* intento de modal dropdown: */
container: {
/*     flex: 1, */
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    gap: -10,
  },
  dropdownButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 10,
    maxHeight: 200, // Limita la altura del modal para permitir el scroll
    padding: 10,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  /* segundo intento de modal:  */
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
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
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',

/*     marginHorizontal: 20, */
  },
})


