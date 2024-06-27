import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';

import axios from 'axios';

/* import { FlatList } from 'react-native-gesture-handler'; */
/* import { ScrollView } from 'react-native-gesture-handler'; */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { xml2js } from 'xml-js';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';


interface Props {
  idCartilla?: string;
}

export const CartillaMedicaEspecialidad = ({ idCartilla }: Props) => {
  console.log('Entrando a CartillaMedicaEspecialidad--------------------->-ESTE es el idCartilla--->', idCartilla);
  const { idAfiliadoTitular, idAfiliado, idCartillaSeleccionada } = useAuthStore();
  console.log('idCartillaSeleccionada desde CartillaMedicaEspecialidad---->', idCartillaSeleccionada);


  const { top } = useSafeAreaInsets();

  const [cartillas, setCartillas] = useState<{ nombre: string; /* descripcion: string; */ idConvenio: string }[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  useEffect(() => {

    const CartillaRequest = async () => {

      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscarPrestadoresCartilla?IMEI=&idAfiliado=4E7EF475-B01B-4FED-BE87-3B896766D4DA&idCartilla=${idCartillaSeleccionada}`)
        const xmlData = response.data;

         // Convertir XML a JSON
         const result = xml2js(xmlData, { compact: true });
         console.log('CartillaMedicaEspecialidad---->', idAfiliadoTitular);
         console.log('Datos JSON convertidos:', result);
 
         const cartillasData = result.Resultado.fila.tablaPrestadores;
         console.log('cartillasData:', cartillasData);
         
        // Mapear los datos correctamente
        const mappedCartillas = cartillasData.nombre.map((_: any, index: number) => ({
          nombre: cartillasData.nombre[index]._text,
          idConvenio: cartillasData.idConvenio[index]._text,
          // descripcion: cartillasData.descartar[index]._text || 'No hay descripción', // Si decides usar la descripción
        }));
         
         setCartillas(mappedCartillas);
         console.log('Mapped Cartillas:', mappedCartillas);
       } catch (error) {
         console.error('Error al obtener los formularios:', error);
         if (axios.isAxiosError(error)) {
           console.error('Detalles del error:', JSON.stringify(error, null, 2));
         }
       }
       console.log('Entrando a CartillaMedicaEspecialidad--------------------->-ESTE es el idCartilla--->', idCartilla);
    };
    CartillaRequest()

  }, [idAfiliadoTitular, idCartillaSeleccionada])


  const color = globalColors.orange

  return (
    <View

      style={globalStyles.container}

    >
      <CustomHeader color={globalColors.gray3} />

      <BackButton />

      <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 25, textAlign: 'center', }}>Cartilla Médica Especialidad- Prestadores</Text>

      <View style={{ /* backgroundColor: 'yellow', */ flex: 1, marginBottom: 30, marginTop: 15 }}>
        <ScrollView /* contentContainerStyle={styles.scrollViewContent} */>
          {cartillas.map((cartilla, index) => (

            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center', /* backgroundColor: 'yellow',  */}}>{cartilla.nombre}</Text>
              {/*    <Text style={{ fontSize: 15, marginBottom: 10 }}>ID: {cartilla.idCartilla}</Text> */}
            </View>
          ))}
        </ScrollView>
      </View>

    </View>

  )
}
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
