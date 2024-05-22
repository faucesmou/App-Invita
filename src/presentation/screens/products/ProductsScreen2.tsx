import React, { useEffect, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

import axios from 'axios';
import { globalColors, globalStyles } from '../../theme/theme';
import { FlatList } from 'react-native-gesture-handler';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { type RootStackParams } from '../../routes/StackNavigator';
import { BackButton } from '../../components/shared/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { useAuthStore } from '../../store/auth/useAuthStore';



/* const products = [
  {id:1, name: 'Product'},
  {id:2, name: 'producto 2'},
  {id:3, name: 'producto 3'},
  {id:4, name: 'producto 4'},
  {id:5, name: 'producto 5'},
]; */

export const ProductsScreen2 = () => {

  const {  idAfiliado } = useAuthStore();

  const { top } = useSafeAreaInsets();

  const [products, setProducts] = useState<{ apellidoYNombre: string; nroAfiliado: string; }[]>([]);
  useEffect(() => {

    const ProductsRequest = async () => {
      try {
        const response = await axios.get(`https://andessalud.createch.com.ar/api/obtenerFamiliares?idAfiliado=${idAfiliado}`);
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

 const color = globalColors.orange
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
      <CustomHeader color={color}  />
      
      <BackButton /> 
      <Text style={{ marginBottom: 5, fontSize: 25, textAlign: 'center', }}>Afiliados a Cargo</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <PrimaryButton
            onPress={() => navigation.navigate('Product', { id:item.apellidoYNombre, nroAfiliado: item.nroAfiliado })}
            label={item.apellidoYNombre} 
            color={color} 
          />
        )}
      />

    </View>
  )
}