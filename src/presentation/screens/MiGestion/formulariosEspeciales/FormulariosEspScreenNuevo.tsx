import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View, Linking, ScrollView, Dimensions, StyleSheet } from 'react-native';

import axios from 'axios';

import { FlatList } from 'react-native-gesture-handler';



import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { xml2js } from 'xml-js';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';



/* const products = [
  {id:1, name: 'Product'},
  {id:2, name: 'producto 2'},
  {id:3, name: 'producto 3'},
  {id:4, name: 'producto 4'},
  {id:5, name: 'producto 5'},
]; */

export const FormulariosEspScreenNuevo = () => {

  const { idAfiliadoTitular } = useAuthStore();
  /*  console.log('idAfiliadoTitular ---->', idAfiliadoTitular); */



  const { top } = useSafeAreaInsets();

  const [formularios, setFormularios] = useState<{ nombre: string; descripcion: string; nombreArchivo: string }[]>([]);
  const [isError, setIsError] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);

  const [linkFormulario, setLinkFormulario] = useState("");

  let Url1 = `https://andessalud.com.ar/formsApp/cronicidad.pdf`;
  let Url2 = `https://andessalud.com.ar/formsApp/alta-complejidad.pdf`;
  let Url3 = `https://andessalud.com.ar/formsApp/diabetes.pdf`;

  const handleOpenURL = (url:string) => {
    setLinkFormulario(url);
  };


  useEffect(() => {
    const openURL = async () => {
      if (linkFormulario) {
        try {
          await Linking.openURL(linkFormulario);
        } catch (err) {
          console.log('error al intentar ingresar a whatsapp:', err);
        } finally {
          setLinkFormulario('');
        }
      }
    };
    openURL();
  }, [linkFormulario]);


/*   useEffect(() => {

    const FormsRequest = async () => {
      setIsConsulting(true);
      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPObtenerFormulariosEspeciales?idAfiliadoTitular=${idAfiliadoTitular}`);

        const xmlData = response.data;

    
        const result = xml2js(xmlData, { compact: true });

        const formulariosData = result.Resultado.fila.datos;
        console.log('formulariosData---->', formulariosData);

        const { nombre, descripcion, nombreArchivo } = formulariosData;
       
        const mappedFormularios = nombre.map((_: any, index: number) => ({
          nombre: nombre[index]._text,
          descripcion: descripcion[index]._text,
          nombreArchivo: nombreArchivo[index]._text,
        }));
        
        setFormularios(mappedFormularios);
        setIsConsulting(false);


      } catch (error) {
        console.error('Error al obtener los formularios:', error);
        setIsConsulting(false);
        setIsError(true)
      }
    };
    FormsRequest()

  }, [idAfiliadoTitular]) */

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

 
/*   const handleDescargarFormulario = (nombreArchivo: string) => {
    const url = `https://www.prestacional.saludnuevocuyo.com.ar/ClientBin/DocumentosDownload/${nombreArchivo}`;

    console.log('URL DE formularios Esp Screen: -->', url);
    Linking.openURL(url)
      .catch(err => console.error('Error al abrir URL: ', err));
  }; */


  const color = globalColors.orange


  return (
    <View

      style={globalStyles.container}

    >
      <CustomHeader /* color={globalColors.black}  */ titleSize={hp('4%')} />

      <BackButton Size={hp('4%')} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
       
        <Text style={{
          marginBottom: wp('1%'),
          marginTop: 0,
          fontSize: hp('3.2%'),
          textAlign: 'center',
          color: globalColors.gray2,
          fontWeight: 'bold'
        }}>Formularios Especiales</Text>

        <View style={{ /* backgroundColor: 'green', */  flex: 1, marginBottom: 30, marginTop: wp('3%') }}>

        <>
                   
                   <View /* key={index} */ style={{ marginBottom: 10 }}>
                       <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Formulario: De Cronicidad (medicaciones varias y diabetes){/* formulario.nombre */}</Text>
                       <Text style={{ fontSize: 15, marginBottom: 10, color: 'black' }}>Este formulario debe ser presentado personalmente para darse de alta como paciente crónico.{/* {formulario.descripcion} */}</Text>
                       <Text style={{ color: '#0e77e7', fontSize: 15, fontWeight: 'bold' }}
                         onPress={() =>handleOpenURL(Url1)}
                       >
                         Descargar Formulario
                       </Text>
                     </View>
                   <View /* key={index} */ style={{ marginBottom: 10 }}>
                       <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Formulario: De Alta Complejidad{/* formulario.nombre */}</Text>
                       <Text style={{ fontSize: 15, marginBottom: 10, color: 'black' }}>Debe presentar el formulario adjunto al solicitar autorización de estudios médicos de alta complejidad.{/* {formulario.descripcion} */}</Text>
                       <Text style={{ color: '#0e77e7', fontSize: 15, fontWeight: 'bold' }}
                         onPress={() =>handleOpenURL(Url2)}
                       >
                         Descargar Formulario
                       </Text>
                     </View>
                   <View /* key={index} */ style={{ marginBottom: 10 }}>
                       <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Formulario: Empadronamiento Diabetes{/* formulario.nombre */}</Text>
                       <Text style={{ fontSize: 15, marginBottom: 10, color: 'black' }}>Este formulario debe ser presentado personalmente para darse de alta como paciente diabético y así acceder a la medicación.{/* {formulario.descripcion} */}</Text>
                       <Text style={{ color: '#0e77e7', fontSize: 15, fontWeight: 'bold' }}
                        onPress={() =>handleOpenURL(Url3)}
                       >
                         Descargar Formulario
                       </Text>
                     </View>
                     </>

        </View>
      
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  /* estilos para estudios consulta de formularios: */
  containerEstudiosMedicosEnv2: {
    paddingHorizontal: 0,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10,

  },
  noDataContainer: {
    flex: 1,
  /*   marginBottom: hp('6%'), */
    marginHorizontal: wp('8%'),
   
  },
  noDataText: {
    fontSize: wp('4%'),
    color: 'gray',
    textAlign: 'center',
    marginTop: wp('0%'),
  },
  noDataText2: {
    fontSize: wp('4%'),
    color: 'gray',
    textAlign: 'center',
    marginTop: wp('5%'),
  },
});


