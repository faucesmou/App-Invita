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
  periodoString: string;
}

// Estado inicial vacío
const initialSaldo: FacturasInt[] = [];


const shadowOpt = {
  width: 350,
  height: 200,
  color: "#000",
  border: 8,
  radius: 3,
  shadowRadius: 15,
  opacity: 0.1,
  x: -5,
  y: 20,
  style: { marginVertical: 5 }
};

export const Facturas = () => {

  const { idAfiliadoTitular, cuilTitular,  } = useAuthStore();


  console.log('ENTRANDO A FACTURAS---->>>', );

  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  const { top } = useSafeAreaInsets();

  const [formularios, setFormularios] = useState<{ nombre: string; descripcion: string; nombreArchivo: string }[]>([]);
 
  const [Facturas, setFacturas] = useState<FacturasInt[]>(initialSaldo);
  const [UrlDescarga, setUrlDescarga] = useState<FacturasInt[]>(initialSaldo);
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

    const FacturasRequest = async () => {
      try {
        const response = await axios.get(`https://fiscalizacion.createch.com.ar/facturacion/api/total?titular=${cuilTitular}`);

       /*  console.log('la respuesta de cristian es: response.data.data--------->>>>', response.data.data); */

        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        if (response.status === 200) {
          // Procesa la respuesta de la API
          const data = await response.data.data;
          if (Array.isArray(data)) {
            const extractedData = response.data.data.map((item: any) => ({
              id: item.id,
              periodo: item.periodo,
              idUnico: item.idUnico,
              sujetoFacturable: item.sujetoFacturable,
              linkMp: item.linkMp,
              pagados: item.pagados,
              facturas: item.facturas,
              periodoString: parsearFecha(item.periodo),
            }));
            //invierto el orden para mostrar del más reciente al más antiguo:
            const reversedData = extractedData.reverse();

            setFacturas(reversedData);
          }
          else {
            setError('El formato de los datos recibidos no es el esperado.');
            console.log('no es array');

          }
        } else {
          setError("Error con los datos");
          console.log('la respuesta con errores de Cta Cte es--------->>>>', error);
        }

      } catch (error) {
        console.error('Error al obtener los pagos:', error);
        setError("Error con los datos");
      }
    };
    FacturasRequest()
    
/*     console.log('la respuesta de cristian Facturas es--------->>>>', Facturas); */
  }, [])

  const handlePress = (url: string ) => {

    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace de factura:', err));
 
  
}


  const FacturasRequest2 = async ( existeFactura: string, idUnico: string) => {

      console.log('entrando a FACTURAREQUEST2 ---------->');
      
    try {
     if (existeFactura === "Si" ) {  
      console.log('INICIANDO CONSULTA DE FACTURA CON idUnicoFactura---------->', idUnico);
      const response = await axios.get(`https://fiscalizacion.createch.com.ar/facturacion/api/external?idUnico=${idUnico}`);



      if (response.status === 200) {
        // Procesa la respuesta de la API
        const data = await response.data.data;
        if ((data)) {
          let UrlDescarga = data.UrlComprobante;
          console.log('la UrlDescarga es-------------->>>>>>>>>>>: ', UrlDescarga);
      
         handlePress(UrlDescarga)
        } else {
          setError('El formato de los datos recibidos no es el esperado.');
          console.log('no es array');
       
        }
      } else {
        setError("Error con los datos");
        console.log('Error en la consulta factura con id unico.Error>>>>', error);
     
      } 
      
    }  else {
     
      console.log('No existe factura para descargar');
   
    }
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
    /*   console.log('Detalles completos del error---->', error.response); */
      setError("Error con los datos");
     
    }
    console.log('Fin de la funcion FacturaRequest2 con el idUnico >>>', idUnicoFactura);
  }

  

  return (
    <View

      style={globalStyles.container}
    >
      <CustomHeader color={globalColors.gray3} />

      <BackButton />

{/*       <Text style={{ marginBottom: 0, marginTop: 5, fontSize: 25, textAlign: 'center', }}>Tus Facturas</Text> */}
      <ScrollView>

        <View style={{...globalStyles.containerEstudiosMedicosEnv2, marginTop: 0}}>
          {error ? (
            <View style={globalStyles.errorContainerEstudios}>
              <Text style={globalStyles.titleErrorEstMedicosEnv}>Factura no encontrada, intente nuevamente más tarde.</Text>

            </View>
          ) : (
            Facturas.map((factura, index) => (

        
              <View style={styles.cardWrapper}
                /*  key={index} style={{ alignItems:'center', backgroundColor: 'yellow', marginBottom: 10, paddingTop:10, paddingHorizontal: 40 }}  */
                key={index}

              >
                <BoxShadow setting={{ ...shadowOpt, height: showAfiliados ? 210 : 105 }} >
                  <View style={styles.card}>

                    <Text style={globalStyles.resultText3}>Período: {factura.periodoString}</Text>
                    <Text style={globalStyles.resultText2}>Estado del pago: {factura.pagados ? 'Pagado' : 'Pendiente'}</Text>

                    {!factura.pagados ? 
                      (
                        <TouchableOpacity
                          style={globalStyles.primaryButton2}
                          onPress={() => handlePress(factura.linkMp)}
                        >
                          <Text style={globalStyles.buttonText}>
                            Link de Pago
                          </Text>
                        </TouchableOpacity>

                      ) : 
                      
                      (
                        factura.facturas === "Si" ? (
                         
                        <TouchableOpacity
                          style={globalStyles.paidButton}
                          onPress={ async () => {
                            let existeFactura = factura.facturas;
                            let idUnico = factura.idUnico;
                              await FacturasRequest2(existeFactura, idUnico)
                          }}
                        >
                         
                          <Text style={globalStyles.buttonText}>
                            Descargar
                          </Text>
                          
                       </TouchableOpacity>

                        ) 
                        :
                        (
                          <TouchableOpacity
                          style={globalStyles.notAvailableButton}
                         /*  onPress={ async () => {
                            let existeFactura = factura.facturas;
                            let idUnico = factura.idUnico;
                              await FacturasRequest2(existeFactura, idUnico)
                          }} */
                        >
                         
                          <Text style={globalStyles.buttonText}>
                            No disponible
                          </Text>
                          
                       </TouchableOpacity>

                        )              
                          
                      )
                    }
                     


                    {/*   <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 18, textAlign: 'center', }}>Afiliados:</Text> */}

                    {/* Detalles del afiliado: */}

                 

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
    borderRadius: 15,
  },
  card: {
    width: 350,
    height: 'auto',
    marginTop: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
});


{/*  {saldo.padrones.map((padron: any, padronIndex: number) => (
                  <View key={padronIndex}>
                    <Text style={globalStyles.resultText2}>Nombre: {padron.nombre}</Text>
                    <Text style={globalStyles.resultText2}>Plan: {padron.plan}</Text>
                  </View>
                ))} */}

                /* logica para mostrar afiliados: */

{/*  <Text style={globalStyles.resultText2}>CUIL: {padron.cuil}</Text>
                    <Text style={globalStyles.resultText2}>Edad: {padron.edad}</Text> */}
   {/*  {showAfiliados && saldo.padrones.map((padron: any, padronIndex: number) => (
                      <View key={padronIndex} >
                        <Text style={globalStyles.resultText2}>{padron.nombre}</Text>
                      </View>
                    ))} */}

                    {/* boton mostrar Afiliados:  */}

                    {/* <TouchableOpacity
                      onPress={() => setShowAfiliados(!showAfiliados)}
                      style={globalStyles.primaryButton3}
                    >
                      <Text style={{ fontSize: 16 }}>
                        {showAfiliados ? 'Ocultar Afiliados' : 'Mostrar Afiliados'}
                      </Text>
                    </TouchableOpacity> */}