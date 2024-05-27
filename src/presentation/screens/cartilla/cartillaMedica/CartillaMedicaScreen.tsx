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


export const CartillaMedicaScreen = () => {
  console.log('Entrando a Cartilla Medica Screen------->');
  const { idAfiliadoTitular, idAfiliado } = useAuthStore();
  console.log('idAfiliadoTitular desde Cartilla Medica Screen---->', idAfiliadoTitular);


  const { top } = useSafeAreaInsets();

  const [cartillas, setCartillas] = useState<{ nombre: string; descripcion: string; idCartilla: string }[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  useEffect(() => {

    const CartillaRequest = async () => {

      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPObtenerCartillas?IMEI=&idAfiliado=${idAfiliado}&otrasCartillas=`)

        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });

        const cartillasData = result.Resultado.fila.tabCartillas;

        // Verificar si cartillasData es un array o un objeto y procesar en consecuencia
        const mappedCartillas = Array.isArray(cartillasData.idCartilla)
          ? cartillasData.idCartilla.map((_: any, index: number) => ({
            nombre: cartillasData.nombre[index]._text,
            idCartilla: cartillasData.idCartilla[index]._text,
          }))
          : [{
            nombre: cartillasData.nombre._text,
            idCartilla: cartillasData.idCartilla._text,
          }];
        setCartillas(mappedCartillas);

        console.log('este es el mappedCartillas---x--x-x--x->:', mappedCartillas);
        /*  console.log('este es el cartillas useState:', cartillas); */

      }
      catch (error) {
        console.error('Error al obtener los formularios:', error);
      }
    };
    CartillaRequest()

  }, [idAfiliadoTitular])


  const color = globalColors.orange

  return (
    <View

      style={globalStyles.container}

    >
      <CustomHeader color={color} />

      <BackButton />

      <Text style={{ marginBottom: 5, marginTop: 5, fontSize: 25, textAlign: 'center', }}>Cartilla médica Screen</Text>

      <View style={{ /* backgroundColor: 'yellow', */ flex: 1, marginBottom: 30, marginTop: 15 }}>
        <ScrollView /* contentContainerStyle={styles.scrollViewContent} */>
          {cartillas.map((cartilla, index) => (

            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center', }}>{cartilla.nombre}</Text>
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
