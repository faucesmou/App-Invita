import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { ProductScreen } from '../screens/products/ProductScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


/* type es similar a interfaz, es decir defnimos la estructura que tienen que tener los props. */
export type RootStackParams = {
  home: undefined,
  Product: { id: number, name: string },
  Products: undefined,
  Settings: undefined,
  
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

const navigator = useNavigation();

useEffect(() => {
navigator.setOptions({
  headerShown: false,
})

}, [])


  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        elevation: 50,
        shadowColor: 'transparent',
      }
     }}
    >
      <Stack.Screen /* options={{  }} */ name="home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}