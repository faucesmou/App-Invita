import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

import axios from 'axios';
import { globalStyles } from '../../theme/theme';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { type RootStackParams } from '../../routes/StackNavigator';
import { BackButton } from '../../components/shared/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



/* const products = [
  {id:1, name: 'Product'},
  {id:2, name: 'producto 2'},
  {id:3, name: 'producto 3'},
  {id:4, name: 'producto 4'},
  {id:5, name: 'producto 5'},
]; */

export const ProductsScreen2 = () => {

  const { top } = useSafeAreaInsets();

  const [products, setProducts] = useState<{ apellidoYNombre: string; nroAfiliado: string; }[]>([]);
  useEffect(() => {

    const ProductsRequest = async () => {
      try {
        const response = await axios.get('https://andessalud.createch.com.ar/api/obtenerFamiliares?idAfiliado=CF67CCE7-2799-4BF6-A6CF-6A99A30BE6E9');
        const mappedProducts = response.data.data.map((item: { apellidoYNombre: any; nroAfiliado: any; })  => ({
          apellidoYNombre: item.apellidoYNombre,
          nroAfiliado: item.nroAfiliado
        }));

        setProducts(mappedProducts);
        console.log('este es el mappedProducts:', mappedProducts);

      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    ProductsRequest()

  }, [])


  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View 
    style={ {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top ,
      backgroundColor: '#e9f6f8'
    }}
    >
      <BackButton /> 
      <Text style={{ marginBottom: 5, fontSize: 30 }}>Consulta de Afiliados</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <PrimaryButton
            onPress={() => navigation.navigate('Product', { id:item.apellidoYNombre, nroAfiliado: item.nroAfiliado })}
            label={item.apellidoYNombre} 
          />
        )}
      />

    </View>
  )
}