import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Linking, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '../../../store/auth/useAuthStore';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ScrollView } from 'react-native-gesture-handler';


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

export const FacturasScreen = () => {

  const { idAfiliadoTitular, cuilTitular } = useAuthStore();
  /*   console.log('idAfiliadoTitular desde el FACTURA SCREEN---->', idAfiliadoTitular); */
  console.log('cuilTitular desde el FACTURA SCREEN---->', cuilTitular);


  const { top } = useSafeAreaInsets();

  const [formularios, setFormularios] = useState<{ nombre: string; descripcion: string; nombreArchivo: string }[]>([]);
  const [Saldos, setSaldos] = useState<Saldo[]>(initialSaldo);

  const [errores, setErrores] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
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
    FacturaRequest()
    console.log('la respuesta de cristian Saldos es--------->>>>', Saldos);
  }, [Saldos])


  const color = globalColors.orange

  return (
    <View

      style={globalStyles.container}
    >
      <CustomHeader color={color} />

      <BackButton />

      <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 25, textAlign: 'center', }}>Facturas</Text>
        <ScrollView>
      
      <View style={globalStyles.containerEstudiosMedicosEnv}>
        {error ? (
          <View style={globalStyles.errorContainerEstudios}>
            <Text style={globalStyles.titleErrorEstMedicosEnv}>Problemas en la solicitud</Text>
            <Text style={globalStyles.errorTextEstudios}>Error: {error}</Text>
          </View>
        ) : (
          Saldos.map((saldo, index) => (
              <View key={index} style={globalStyles.containerEstudiosMedicosEnv}>
                <Text style={globalStyles.titleEstudiosMedicosEnv}>Información del saldo</Text>
                <Text style={globalStyles.resultText2}>Periodo: {saldo.periodo}</Text>
                <Text style={globalStyles.resultText2}>Tipo de Saldo: {saldo.tipoSaldo}</Text>
                <Text style={globalStyles.resultText2}>Medio de Pago: {saldo.medioPago}</Text>
                <Text style={globalStyles.resultText2}>Pagado: {saldo.pagado ? 'Sí' : 'No'}</Text>
                <Text style={globalStyles.resultText2}>Link de Pago: {saldo.linkDePago}</Text>
                {saldo.padrones.map((padron: any, padronIndex: number) => (
                  <View key={padronIndex}>
                    <Text style={globalStyles.resultText2}>Nombre: {padron.nombre}</Text>
                    <Text style={globalStyles.resultText2}>CUIL: {padron.cuil}</Text>
                    <Text style={globalStyles.resultText2}>Edad: {padron.edad}</Text>
                    <Text style={globalStyles.resultText2}>Plan: {padron.plan}</Text>
                  </View>
                ))}
              </View>
          ))
        )}
      </View>


          </ScrollView>

    </View>
  )
}



