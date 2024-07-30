import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';

import axios from 'axios';

/* import { FlatList } from 'react-native-gesture-handler'; */
/* import { ScrollView } from 'react-native-gesture-handler'; */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { xml2js, ElementCompact } from 'xml-js';

import { useAuthStore } from '../../../store/auth/useAuthStore';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';


interface Props {
  idCartilla?: string;
  nombreEspecialidad: string;
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


export const CartillaMedicaEspecialidad = ({ idCartilla, nombreEspecialidad }: Props) => {


  const [isConsulting, setIsConsulting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalData, setModalData] = useState([]);


  console.log('Entrando a CartillaMedicaEspecialidad--------------------->-ESTE es el idCartilla--->', idCartilla);
  const { idAfiliadoTitular, idAfiliado, idCartillaSeleccionada } = useAuthStore();
  console.log('idCartillaSeleccionada desde CartillaMedicaEspecialidad---->', idCartillaSeleccionada);


  const { top } = useSafeAreaInsets();

  const [cartillas, setCartillas] = useState<{ nombre: string; /* descripcion: string; */ idConvenio: string }[]>([]);
  const [cartillas2, setCartillas2] = useState<{ nombre: string; idConvenio: string }[]>([]);

  const [prestadores, setPrestadores] = useState<Prestador[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParams>>()


 

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
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscarPrestadoresCartilla?IMEI=&idAfiliado=4E7EF475-B01B-4FED-BE87-3B896766D4DA&idCartilla=${idCartillaSeleccionada}`)
        const xmlData = response.data;

        /*  interface Prestador {
           idConvenio: string;
           nombre: string;
           domicilio: string;
           localidad: string;
           provincia: string;
           lat: string;
           long: string;
           telefonos: string[];
       } */
        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });
        const result2 = xml2js(xmlData, { compact: true }) as ElementCompact;

     /*    console.log('Resultado:-->>>>>>>>:-->>>>>>>>:-->>>>>>>>', result2.Resultado); */
     
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

console.log('luego de useEffect CartillaMedicaEspecialidad--------------------->-ESTE es el nombreEspecialidad--->', JSON.stringify(nombreEspecialidad));

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

console.log('arrayPrestadores----->:', arrayPrestadores);
   

      } catch(err){
        console.log('tuvimos un problemita dog pero vamo arriba:---------------------------------------------------------->>>>', err);
        
      }

        /* ---------------------------------------------------------------- */
        const cartillasData = result.Resultado.fila.tablaPrestadores;
       /*  console.log('cartillasData:', cartillasData); */

        // Mapear los datos correctamente
        const mappedCartillas = cartillasData.nombre.map((_: any, index: number) => ({
          nombre: cartillasData.nombre[index]._text,
          idConvenio: cartillasData.idConvenio[index]._text,
          // descripcion: cartillasData.descartar[index]._text || 'No hay descripción', // Si decides usar la descripción
        }));

        setCartillas(mappedCartillas);
       /*  console.log('Mapped Cartillas:', mappedCartillas); */
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
      console.log('Entrando a CartillaMedicaEspecialidad--------------------->-ESTE es el idCartilla--->', idCartilla);
    };
    CartillaRequest()

  }, [idAfiliadoTitular, idCartillaSeleccionada])


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
              Alert.alert('Error', 'No se pudo abrir WhatsApp. Por favor, verifica tu conexión a internet o si la aplicación de WhatsApp está instalada.');
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
  

  return (
    <View

      style={globalStyles.container}

    >
      <CustomHeader color={globalColors.gray2} />

      <BackButton />

           <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 20, textAlign: 'center', color: 'black' }}>{nombreEspecialidad}</Text> 

      <View style={{ /* backgroundColor: 'yellow', */ flex: 1, marginBottom: 60, marginTop:0 }}>
        <ScrollView /* contentContainerStyle={styles.scrollViewContent} */>
        <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 15, textAlign: 'center', color: 'green' }}>{nombreEspecialidad}</Text> 
          {prestadores.map((prestador) => (
        /*   {cartillas.map((cartilla, index) => ( */

            <View key={prestador.idConvenio} style={styles.TertiaryButton}>
              <View style={styles.contentWrapper2}>
                <View style={styles.textWrapper}>
                  <Text style={styles.descriptionTextNombre}>
                    {prestador.nombre}
                  </Text>
                  <Text style={styles.descriptionText}>
                    Direccion:{prestador.domicilio}
                  </Text>
                  {/*    <Text style={styles.descriptionTexttelefono}>
                    Teléfono:{prestador.telefonos.length > 0 ? prestador.telefonos.join(' - ') : 'No disponible'}
                  </Text>  */}
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

           /*  <View key={index} style={styles.TertiaryButton}>
              <View style={styles.contentWrapper2}>
                <View style={styles.textWrapper}>
                  <Text style={styles.descriptionText}>
                    {cartilla.nombre}
                  </Text>

                </View>
              </View>
            </View> */

          ))}
        </ScrollView>
      </View>

    </View>

  )
}

/*  

       <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center',  backgroundColor: 'yellow', }}>{cartilla.nombre}</Text>
                 <Text style={{ fontSize: 15, marginBottom: 10 }}>ID: {cartilla.idCartilla}</Text> 
              </View>


*/





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
  telefonosContainer: {
    display: 'flex',
    flexDirection: 'row',
   justifyContent: 'center',
  flexWrap:'wrap',

  },
  descriptionTextNombre: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },
  telefonoTouchable: {
 marginLeft:5,
  },
  descriptionTexttelefono: {
    color: 'blue',
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
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
})


/* <FlatList
        data={products}
        renderItem={({ item }) => (
          <PrimaryButton
            onPress={() => navigation.navigate('Product', { id:item.apellidoYNombre, nroAfiliado: item.nroAfiliado })}
            label={item.apellidoYNombre} 
            color={color} 
          />
        )}
      /> */

               /*  setModalData(cartillaTablasDataCombinadas); */
      /*       console.log('modalData -->>>------>---------->---------->>>>>>:', JSON.stringify(modalData));  */

       /*  }else {
          console.error('cartillaTablasData es undefined');
       
        } */

        /*      console.log('Primeros 3 elementos de result:', result?.Resultado?.fila?.tablaPrestadores?.slice(0, 3));  */
 
    /*     console.log('Primeros 3 elementos de cartillaTablasData.tablaPrestadores:', cartillaTablasData.tablaPrestadores?.slice(0, 3)); */

/*         function combinarDatos(cartillaTablasData: CartillaTablaData) {
          const { tablaPrestadores, tablaDomicilios, tablaTelefonos } = cartillaTablasData;
        
          const minLength = Math.min(
            tablaPrestadores.length,
            tablaDomicilios.length,
            tablaTelefonos.length
          );
        
          if (minLength === 0) {
            console.log('No hay datos disponibles para combinar');
            return [];
          }
        
          return tablaPrestadores.slice(0, minLength).map((prestador, index) => {
            

            const domicilio = tablaDomicilios[index];
            const telefono = tablaTelefonos[index];
        
            return {
              idOrden: prestador.idConvenio?._text || '',
              ordenAccion: prestador.ordenAccion?._text || '',
              idOrdenParcialENC: prestador.idOrdenParcialENC?._text || '',
              ordenAccionInt: prestador.ordenAccionInt?._text || '',
              descartar: prestador.descartar?._text || '',
            
              idConvenioDom: domicilio.idConvenioDom?._text || '',
              idDomicilioDom: domicilio.idDomicilioDom?._text || '',
              domicilio: domicilio.domicilio?._text || '',
              localidad: domicilio.localidad?._text || '',
              provincia: domicilio.provincia?._text || '',
              lat: domicilio.lat?._text || '',
              long: domicilio.long?._text || '',
              paraOrden: domicilio.paraOrden?._text || '',
            
              idDomicilioTel: telefono.idDomicilioTel?._text || '',
              telefono: telefono.telefono?._text || '',
            
              email: prestador.email?._text || '',
            };
          });
        }
        combinarDatos(cartillaTablasData) */
   /*    console.log('cartillaTablasData es: -->>>>>>>>:-->>>>>>>>:-->>>>>>>>:', JSON.stringify(cartillaTablasData)); */
   /*     if (!cartillaTablasData.tablaPrestadores === undefined || !cartillaTablasData.tablaDomicilios === undefined || !cartillaTablasData.tablaTelefonos === undefined ) {
          console.log('En PracticaResueltaRequest cartillaTablasData tabla Prestadores, domicilios o telefonos. hay alguno undefined ');
          setIsConsulting(false);
         
          return;
        }

          const prestadoresLength = cartillaTablasData.tablaPrestadores.idConvenio?.length || 0;
          const domiciliosLength = cartillaTablasData.tablaDomicilios.idConvenioDom?.length || 0;
          const telefonosLength = cartillaTablasData.tablaTelefonos.idDomicilioTel?.length || 0;

          const maxLength = Math.min(prestadoresLength, domiciliosLength, telefonosLength);

          if (maxLength === 0) {
            console.log('No hay datos disponibles para combinar');
            setIsConsulting(false);
            return;
          } */

          /* 
       /*  if (!cartillaTablasData) {
          setError('El formato de los datos recibidos no es el esperado.');
          console.log('En PracticaResueltaRequest el formato de los datos recibidos no es el esperado.');
        } */
    /*     if ( cartillaTablasData && cartillaTablasData.tablaPrestadores && cartillaTablasData.tablaDomicilios && cartillaTablasData.tablaTelefonos ) { */

         /*  const cartillaTablasDataCombinadas = cartillaTablasData.tablaPrestadores.idConvenio.slice(0, maxLength).map((item: any, index: number) => ({

            idOrden: item._text || '',
            ordenAccion: cartillaTablasData.tablaPrestadores.ordenAccion[index]?._text || '',
            idConvenio: cartillaTablasData.tablaPrestadores.idConvenio[index]?._text || '',
            nombre: cartillaTablasData.tablaPrestadores.idOrdenParcialENC[index]?._text || '',
            ordenAccionInt: cartillaTablasData.tablaPrestadores.ordenAccionInt[index]?._text || '',
            descartar: cartillaTablasData.tablaPrestadores.descartar[index]?._text || '',
            
            idConvenioDom: cartillaTablasData.tablaDomicilios.idConvenioDom[index]?._text || '',
            idDomicilioDom: cartillaTablasData.tablaDomicilios.idDomicilioDom[index]?._text || '',
            domicilio: cartillaTablasData.tablaDomicilios.domicilio[index]?._text || '',
            localidad: cartillaTablasData.tablaDomicilios.localidad[index]?._text || '',
            
            provincia: cartillaTablasData.tablaDomicilios.provincia[index]?._text || '',
            lat: cartillaTablasData.tablaDomicilios.lat[index]?._text || '',
            long: cartillaTablasData.tablaDomicilios.long[index]?._text || '',
            paraOrden: cartillaTablasData.tablaDomicilios.paraOrden[index]?._text || '',
            
            idDomicilioTel: cartillaTablasData.tablaTelefonos.idDomicilioTel[index]?._text || '',
            telefono: cartillaTablasData.tablaTelefonos.telefono[index]?._text || '',
          })); */
       /*    console.log('cartillaTablasDataCombinadas-->>>------>---------->---------->>>>>>:', cartillaTablasDataCombinadas); */ 
       /*         const cartillaTablasData = {
          // @ts-ignore
          tablaPrestadores: result?.Resultado?.fila?.tablaPrestadores,
          // @ts-ignore
          tablaDomicilios: result?.Resultado?.fila?.tablaDomicilios,
          // @ts-ignore
          tablaTelefonos: result?.Resultado?.fila?.tablaTelefonos,
        }; */

        /*             // Convertir XML a JSON
          
          // Extraer las tablas
          const prestadores = result.Resultado.fila.tablaPrestadores;
        /*   const prestadores = prestadoresPrevio.ordenAccion; */
          
        /*    const domicilios = domiciliosPrevio.idConvenioDom; */
        /*
        
        const telefonos = result.Resultado.fila.tablaTelefonos;
        
        const domicilios = result.Resultado.fila.tablaDomicilios;


        console.log('domicilios: -->>>>>>>>:-->>>>>>>>:-->>>>>>>>:', domicilios); 

  
      const domiciliosPorIdConvenio = domicilios.reduce((map: any, domicilio:any) => {

      const { idConvenioDom, idDomicilioDom, domicilio: direccion, localidad, provincia, lat, long } = domicilio;

  const domicilioData = {
    idConvenio: idConvenioDom._text,
    idDomicilio: idDomicilioDom._text,
    direccion: direccion._text,
    localidad: localidad._text,
    provincia: provincia._text,
    lat: lat._text,
    long: long._text,
  };
    

  map[domicilioData.idConvenio] = map[domicilioData.idConvenio] || [];
  map[domicilioData.idConvenio].push(domicilioData); */