import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { ProductScreen } from '../screens/products/ProductScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { useProfileStore } from '../store/profile-store';
import { Tab3Screen } from '../screens/tabs/Tab3Screen';


/* type es similar a interfaz, es decir defnimos la estructura que tienen que tener los props. */
export type RootStackParams = {
  home: undefined,
  Product: { id: number, name: string },
  Products: undefined,
  Settings: undefined,
  Tramites: undefined,
  
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
      headerShown: true,
      headerStyle: {
        elevation: 50,
        shadowColor: 'transparent',
      }
     }}
    >
      <Stack.Screen /* options={{  }} */ name= 'home' component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Tramites" component={Tab3Screen} />
      {/* <Stack.Screen name="Settings2" component={ ProfileScreen } /> */}
    </Stack.Navigator>
  );
}