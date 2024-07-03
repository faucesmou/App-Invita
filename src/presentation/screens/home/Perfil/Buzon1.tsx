import React, { useCallback, useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';

import axios from 'axios';
import { globalColors } from '../../../theme/theme';
import { RootStackParams } from '../../../routes/StackNavigator';
import CustomHeader from '../../../components/CustomHeader';
import { BackButton } from '../../../components/shared/BackButton';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { TertiaryButton } from '../../../components/shared/TertiaryButton';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { xml2js } from 'xml-js';

interface Notificacion {
/*   idOrden: string; */
  afiliado: string;
  estado:string;
/*   fecSolicitud: string;
  estado: string;
  fecFinalizacion: string;
  comentarioRechazo: string; */
}


export const Buzon1 = () => {


  const { idAfiliadoTitular, idAfiliado, idCartillaSeleccionada } = useAuthStore();
  const { top } = useSafeAreaInsets();

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([{ afiliado:"pepe" , estado: "completo" }]);
  const [notificaciones2, setNotificaciones2] = useState<{ afiliado:string , estado: string }[]>([]);
  const [cartillas, setCartillas] = useState<{ nombre: string; /* descripcion: string; */ idConvenio: string }[]>([]);
/*   setNotificaciones2([{afiliado:"gonzalito", estado: "soltero"}]) */


  const [products, setProducts] = useState<{ apellidoYNombre: string; nroAfiliado: string; idAfiliado: any }[]>([]);
  
  
  const ProductsRequest = async () => {
    let caca = '301936D8-6482-4625-82DD-38A932A4FC5A'
    try {
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENPRAC?idAfiliado=${caca}&IMEI=`);
      /* console.log('EL RESPONSE DEL BUZON ES : ---------x-x-x-x-x-x->', response); */

      const xmlData = response.data;

      // Convertir XML a JSON
      const result = xml2js(xmlData, { compact: true });

      /*  console.log('Datos JSON convertidos:', result); */

      const tablaDatos = result.Resultado?.tablaDatos;

      if (!tablaDatos) {
        throw new Error('Estructura del JSON inesperada o sin datos en tablaDatos');
      }

      // Aquí puedes verificar la estructura de tablaDatos imprimiéndola en la consola
/*         console.log('Datos de tablaDatos-------------x-x-x-x-x-x-x->:', tablaDatos); */

      // Preparar los datos para el mapeo
      /*   const keys = Object.keys(tablaDatos).filter(key => Array.isArray(tablaDatos[key])); */
      const keys = Object.keys(tablaDatos);


      // Assuming all arrays have the same length (check the length of any array)
      const length = tablaDatos.afiliado.length;
/* 
      const mappedNotificaciones: Notificacion[] = [];

      for (let i = 0; i < length; i++) {
        const notificacion: Notificacion = {
          afiliado: tablaDatos.afiliado[i]?._text || '',
          estado: tablaDatos.estado[i]?._text || '',
          comentarioRechazo: tablaDatos.comentarioRechazo[i]?._text || '',
          fecFinalizacion: tablaDatos.fecFinalizacion[i]?._text || '',
          fecSolicitud: tablaDatos.fecSolicitud[i]?._text || '',
          idOrden: tablaDatos.idOrden[i]?._text || '',
        };

        mappedNotificaciones.push(notificacion);
      } */
   /*    console.log('mappedNotificaciones-x-x-x-x-x-x>: ', mappedNotificaciones); */
 
  /*     setNotificaciones(mappedNotificaciones); */


    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };


   useEffect(() => {
    
    setNotificaciones2([{afiliado:"gonzalito", estado: "soltero"}]) 
  
   /*  ProductsRequest() */

  }, []); 
/* 
  useEffect(() => {
    notificaciones.forEach((notificacion, index) => {
      console.log(`Notificación ${index + 1}:`);
      console.log('AFILIADO-------------->>---->->>>---->><<<<---->>:', notificacion.afiliado);
      console.log('ESTADO-------------->>---->->>>---->><<<<---->>:', notificacion.estado);
      console.log('comentarioRechazo-------------->>---->->>>---->><<<<---->>:', notificacion.comentarioRechazo);
    });
  }, [notificaciones]); */

  /*   const color = globalColors.gray */

/*   const navigation = useNavigation<NavigationProp<RootStackParams>>() */


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        /* backgroundColor: 'green', */
        marginBottom: 0,

      }}
    >
      <CustomHeader color={globalColors.gray3} />

      <BackButton />

      <View
        style={{
          marginBottom: 10, marginTop: 0,
          alignItems: 'center',
          backgroundColor: 'green',
          flex:1,
        }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10,
            padding: 0,
            marginHorizontal: 10,
          }}
        >Notificaciones: 
        </Text>

       
          <View style={{ /* flex: 1, */ marginBottom: 10, marginTop: 15, backgroundColor: 'blue', }}>
            {notificaciones2.map((notificacion, index) => (

              <View key={index} style={{ /* flex: 1, */ marginBottom: 10, padding: 10, backgroundColor: 'yellow', borderRadius: 5 }}>

                <Text style={{ fontSize: 16, textAlign: 'center', color: 'red' }}>{notificacion.afiliado}</Text>

              </View>

            ))}

          </View>

       

      </View>
    </View>
  )
}


      {/*   notificaciones.map((notificacion, index) => (
            <View key={index} style={{ marginBottom: 10, padding: 10,  backgroundColor: 'yellow',  borderRadius: 5 }}>
              <Text style={{ fontSize: 26, textAlign: 'center', color: 'black'}}>{notificacion.afiliado}</Text>
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>{notificacion.estado}</Text>
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>{notificacion.comentarioRechazo}</Text>
              <Text style={{ fontSize: 26, textAlign: 'center', color: 'black' }}>{notificacion.comentarioRechazo}</Text>
            
            </View>
          ))  */}

      const styles = StyleSheet.create({
        imageContainer: {
        marginBottom: 30,
      marginHorizontal: 35,
      marginTop: 40,
      zIndex: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '40%',
      minWidth: '50%'
  },
      innerContainer: {
        marginBottom: 15,
      marginTop: 15,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
  },
      image: {
        flex: 1,
      width: '100%',
      height: '100%',
      margin: 10,
  }
});

      {/*  <View style={styles.imageContainer}>

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
      </View> */}