import { createStackNavigator } from '@react-navigation/stack';


import { ProductScreen } from '../screens/products/ProductScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { useProfileStore } from '../store/profile-store';

import { ProductsScreen2 } from '../screens/products/ProductsScreen2';
import { MisDatosScreen } from '../screens/profile/MisDatosScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { MiOrdenConsultaScreen } from '../screens/tramites/MiOrdenConsultaScreen';
import { CredencialScreen } from '../screens/credential/CredencialScreen';
import { TopTabsNavigator } from './TopTabsNavigator';
import { TramitesScreen } from '../screens/tramites/TramitesScreen';


/* type es similar a interfaz, es decir defnimos la estructura que tienen que tener los props. */
export type RootStackParams = {
  home: undefined,
  Product: { id: number, name: string },
  Products: undefined,
  Products2: undefined,
  Settings: undefined,
  Tramites: undefined,
  MisDatos:undefined,
  MiOrdenConsulta:undefined,
  Credencial: undefined,
  Cartilla: undefined,
  
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

const navigator = useNavigation();

const email = useProfileStore( state => state.email);

useEffect(() => {
navigator.setOptions({
  headerShown: false,
})

}, [])


  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        elevation: 50,
        shadowColor: 'transparent',
      }
     }}
    >

{/*       <Stack.Screen name= 'home' component={HomeScreen} /> */}
      <Stack.Screen name= 'home' component={BottomTabsNavigator} /* <options={{ headerShown: true }}> *//>
      <Stack.Screen name= 'Cartilla' component={TopTabsNavigator} />
      <Stack.Screen name="Products2" component={ProductsScreen2} />
      <Stack.Screen name="Product" component={ProductScreen}  options={{ headerShown: true }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Tramites" component={TramitesScreen} options={{ headerShown: true }} />
      <Stack.Screen name="MisDatos" component={MisDatosScreen} options={{ headerShown: true }} />
      <Stack.Screen name="MiOrdenConsulta" component={MiOrdenConsultaScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Credencial" component={CredencialScreen} />
      {/* <Stack.Screen name="Settings2" component={ ProfileScreen } /> */}
    </Stack.Navigator>
  );
}