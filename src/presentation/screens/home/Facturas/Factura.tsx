import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Linking, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BoxShadow } from 'react-native-shadow';


import { useAuthStore } from '../../../store/auth/useAuthStore';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ScrollView } from 'react-native-gesture-handler';

import datos from './datosFacturas.json';



// Define los tipos
interface Padron {
  nombre: string;
  cuil: number;
  edad: string;
  plan: string;
}

interface FacturasInt {
  periodo: number;
  tipoSaldo: string;
  medioPago: string;
  linkMp: string;
  pagados: string;
  padrones: Padron[];
  periodoString:string;
}

// Estado inicial vacío
const initialSaldo: FacturasInt[] = [];


const shadowOpt = {
  width: 350,
  height: 200,
  color: "#000",
  border: 8,
  radius: 3,
  opacity: 0.2,
  x: -5,
  y: 20,
  style: { marginVertical: 5 }
};

export const Factura = () => {

  const { idAfiliadoTitular, cuilTitular, idUnicoFactura } = useAuthStore();
  /*   console.log('idAfiliadoTitular desde el FACTURA SCREEN---->', idAfiliadoTitular); */
  console.log('Entrando a Factura----> este es el idUnicoFactura:', idUnicoFactura);


  const { top } = useSafeAreaInsets();

  const [formularios, setFormularios] = useState<{ nombre: string; descripcion: string; nombreArchivo: string }[]>([]);
/*   const [Saldos, setSaldos] = useState<Saldo[]>(initialSaldo);  */
  const [Facturas, setFacturas] = useState<FacturasInt[]>(initialSaldo); 
  const [showAfiliados, setShowAfiliados] = useState(false);
  const [errores, setErrores] = useState<string>('');
  const [error, setError] = useState<string | null>(null);



const parsearFecha = (numero: any): string => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const string = numero.toString();
  const mes = parseInt(string.substring(string.length - 2, string.length));
  const year = string.substring(0, string.length - 2);
  
  if (!isNaN(mes) && mes >= 1 && mes <= 12) {
    const elemento = meses[mes - 1];
    const completo = `${elemento} de ${year}`;
    return completo;
  }
  return '';
}


/* const fechaMes = () => {
  let fecha = new Date()
  let year = fecha.getFullYear()
  let mes = fecha.getMonth() + 1
  if (mes < 10) {
      mes = 0${mes}
  }
  return ${year}${mes}
}  */
 
 /*  const Facturas = datos.data; */
  useEffect(() => {

    const FacturaPeriodoRequest = async ( ) => {
      try {
        const response = await axios.get(`https://fiscalizacion.createch.com.ar/facturacion/api/external?idUnico=${idUnicoFactura}`);

        console.log('la respuesta de cristian es: response.data.data--------->>>>', response.data.data);
  
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        if (response.status === 200) {
          // Procesa la respuesta de la API
          const data = await response.data.data;
    /*       console.log('esta es la variable data donde guardo el await response.data.data---x-x-x->', data); */
          

          if (Array.isArray(data)) {
            const extractedData = response.data.data.map((item: any) => ({
         
              UrlComprobante:item.UrlComprobante
             
            }));
            setFacturas(extractedData);
          }
          else {
            setError('El formato de los datos recibidos no es el esperado.');
            console.log('no es array');

          }
        } else {
          setError("Error con los datos");
          console.log('la respuesta con errores de FacturaPeriodoRequest es--------->>>>', error);
        }

      } catch (error) {
        console.error('Error al obtener los pagos:', error);
        setError("Error con los datos");
      }
    };
    FacturaPeriodoRequest( ) 
    console.log('la respuesta de cristian Facturas es--------->>>>', Facturas);
  }, [])

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
  };


  return (
    <View

      style={globalStyles.container}
    >
      <CustomHeader color={globalColors.gray3} />

      <BackButton />

      <Text style={{ marginBottom: 0, marginTop: 5, fontSize: 25, textAlign: 'center', }}>Tus Facturas de Este Mes</Text>
      <ScrollView>

        <View style={globalStyles.containerEstudiosMedicosEnv2}>
          {error ? (
            <View style={globalStyles.errorContainerEstudios}>
              <Text style={globalStyles.titleErrorEstMedicosEnv}>Factura no encontrada, por favor intente nuevamente más tarde.</Text>
{/*               <Text style={globalStyles.errorTextEstudios}>Error: {error}</Text> */}
            </View>
          ) : ( 


            Facturas.map((factura, index) => (
              <View style={styles.cardWrapper}
              /*  key={index} style={{ alignItems:'center', backgroundColor: 'yellow', marginBottom: 10, paddingTop:10, paddingHorizontal: 40 }}  */
              key={index} 
              
              >
                <BoxShadow setting={{ ...shadowOpt, height: showAfiliados ? 210 : 105 }} >
                  <View style={styles.card}
               /*   onPress={} */
                  >
                    
                    <Text style={globalStyles.resultText3}>Descargar{factura.periodoString}</Text>
                   
                

                  </View>
                </BoxShadow>

              </View>
            ))
          )}
        </View>


      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  cardWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    width: 350,
    height: 'auto',
    marginTop: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});


{/*  {saldo.padrones.map((padron: any, padronIndex: number) => (
                  <View key={padronIndex}>
                    <Text style={globalStyles.resultText2}>Nombre: {padron.nombre}</Text>
                    <Text style={globalStyles.resultText2}>Plan: {padron.plan}</Text>
                  </View>
                ))} */}

{/*  <Text style={globalStyles.resultText2}>CUIL: {padron.cuil}</Text>
                    <Text style={globalStyles.resultText2}>Edad: {padron.edad}</Text> */}
