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

import datos from '../facturas/datosPrueba.json';



// Define los tipos
interface Padron {
  nombre: string;
  cuil: number;
  edad: string;
  plan: string;
}

interface Saldo {
  periodo: number;
  tipoSaldo: string;
  medioPago: string;
  linkDePago: string;
  pagado: boolean;
  padrones: Padron[];
}

// Estado inicial vacío
const initialSaldo: Saldo[] = [];


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

export const FacturasScreen = () => {

  const { idAfiliadoTitular, cuilTitular } = useAuthStore();
  /*   console.log('idAfiliadoTitular desde el FACTURA SCREEN---->', idAfiliadoTitular); */
  console.log('cuilTitular desde el FACTURA SCREEN---->', cuilTitular);


  const { top } = useSafeAreaInsets();

  const [formularios, setFormularios] = useState<{ nombre: string; descripcion: string; nombreArchivo: string }[]>([]);
  /*   const [Saldos, setSaldos] = useState<Saldo[]>(initialSaldo); */
  const [showAfiliados, setShowAfiliados] = useState(false);
  const [errores, setErrores] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const Saldos = datos.data;
  useEffect(() => {

    const FacturaRequest = async () => {
      try {
        const response = await axios.post(`https://fiscalizacion.createch.com.ar/contratos/paginador/cuenta?afiliado=${cuilTitular}&offset=1`);

        console.log('la respuesta de cristian es: response.data.data--------->>>>', response.data.data);
        /*  console.log('la respuesta de cristian es: response--------->>>>', response); */
        console.log('la respuesta response.status es--------->>>>', response.status);

        if (response.status === 200) {
          // Procesa la respuesta de la API
          const data = await response.data.data;
          if (Array.isArray(data)) {
            const extractedData = response.data.data.map((item: any) => ({
              periodo: item.periodo,
              tipoSaldo: item.tipoSaldo,
              medioPago: item.medioPago,
              linkDePago: item.linkDePago,
              pagado: item.pagado,
              padrones: item.padrones.map((padron: any) => ({
                nombre: padron.nombre,
                cuil: padron.cuil,
                edad: padron.edad,
                plan: padron.plan
              }))
            }));

            setSaldos(extractedData);
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
        console.error('Error al obtener las facturas:', error);
        setError("Error con los datos");
      }
    };
    /*  FacturaRequest() */
    console.log('la respuesta de cristian Saldos es--------->>>>', Saldos);
  }, [])

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
  };



  return (
    <View

      style={globalStyles.container}
    >
      <CustomHeader color={globalColors.gray} />

      <BackButton />

      <Text style={{ marginBottom: 0, marginTop: 5, fontSize: 25, textAlign: 'center', }}>Estado de Pagos</Text>
      <ScrollView>

        <View style={globalStyles.containerEstudiosMedicosEnv2}>
          {error ? (
            <View style={globalStyles.errorContainerEstudios}>
              <Text style={globalStyles.titleErrorEstMedicosEnv}>Problemas en la solicitud</Text>
              <Text style={globalStyles.errorTextEstudios}>Error: {error}</Text>
            </View>
          ) : (
            Saldos.map((saldo, index) => (
              <View style={styles.cardWrapper}/*  key={index} style={{ alignItems:'center', backgroundColor: 'yellow', marginBottom: 10, paddingTop:10, paddingHorizontal: 40 }}  */>
                <BoxShadow setting={{ ...shadowOpt, height: showAfiliados ? 210 : 175 }} /* setting={{
                        width: 300,
                        height: 100,
                        color: "#000",
                        border: 2,
                        radius: 3,
                        opacity: 0.1,
                        x: 0,
                        y: 3,
                        style: { marginVertical: 5 },
                      }} */>
                  <View style={styles.card}>
                    {/*   <Text style={globalStyles.titleEstudiosMedicosEnv}>Información del saldo</Text> */}
                    {/*  <Text style={globalStyles.resultText2}>Periodo: {saldo.periodo}</Text> */}
                    <Text style={globalStyles.resultText3}>{saldo.tipoSaldo}</Text>
                    <Text style={globalStyles.resultText2}>Estado del pago: {saldo.pagado ? 'Pagado' : 'Pendiente'}</Text>
                    <Text style={globalStyles.resultText2}>Medio de Pago: {saldo.medioPago}</Text>
                    <TouchableOpacity style={globalStyles.primaryButton2} onPress={() => handlePress(saldo.linkDePago)}>
                      <Text style={globalStyles.buttonText}>
                        Link de Pago
                      </Text>
                    </TouchableOpacity>

                    {/*   <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 18, textAlign: 'center', }}>Afiliados:</Text> */}

                    {showAfiliados && saldo.padrones.map((padron: any, padronIndex: number) => (
                      <View key={padronIndex} >
                        <Text style={globalStyles.resultText2}>{padron.nombre}</Text>
                        {/* Detalles del afiliado */}
                      </View>
                    ))}
                    <TouchableOpacity
                      onPress={() => setShowAfiliados(!showAfiliados)}
                      style={globalStyles.primaryButton3}
                    >
                      <Text style={{ fontSize: 16 }}>
                        {showAfiliados ? 'Ocultar Afiliados' : 'Mostrar Afiliados'}
                      </Text>
                    </TouchableOpacity>
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
