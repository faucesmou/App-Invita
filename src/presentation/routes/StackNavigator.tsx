import { createStackNavigator } from '@react-navigation/stack';


import { ProductScreen } from '../screens/products/ProductScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { HamburgerMenu } from '../components/shared/HamburgerMenu';
import { useProfileStore } from '../store/profile-store';

import { ProductsScreen2 } from '../screens/products/ProductsScreen2';
import { MisDatosScreen } from '../screens/profile/MisDatosScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { MiOrdenConsultaScreen } from '../screens/tramites/MiOrdenConsultaScreen';
import { CredencialScreen } from '../screens/credential/CredencialScreen';
import { TopTabsNavigator } from './TopTabsNavigator';
import { TramitesScreen } from '../screens/tramites/TramitesScreen';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { useAuthStore } from '../store/auth/useAuthStore';
import { CredencialScreenPrueba } from '../screens/credential/CredencialScreenPrueba';
import { ConsultaScreen } from '../screens/ordenConsulta/ConsultaScreen';
import { ConsultaScreenFinal } from '../screens/ordenConsulta/ConsultaScreenFinal';
import { FormulariosEspScreen } from '../screens/tramites/formulariosEspeciales/FormulariosEspScreen';
import { FormularioElegido } from '../screens/tramites/formulariosEspeciales/FormularioElegido';
import { CartillaMedicaScreen } from '../screens/cartilla/cartillaMedica/CartillaMedicaScreen';
import { CartillaScreen } from '../screens/cartilla/CartillaScreen';
import { CartillaMedicaEspecialidad } from '../screens/cartilla/cartillaMedica/CartillaMedicaEspecialidad';


/* type es similar a interfaz, es decir defnimos la estructura que tienen que tener los props. */

export type RootStackParams = {
  home: undefined,
  Product: { id: number, name: string },
  Products: undefined,
  Products2: undefined,
  Settings: undefined,
  Tramites: undefined,
  MisDatos: undefined,
  MiOrdenConsulta: undefined,
  Credencial: undefined,
  Cartilla: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  LoadingScreen: undefined,
  SideMenuNavigator: undefined,
  CredencialScreenPrueba:undefined,
  ConsultaScreen: undefined,
  ConsultaScreenFinal: undefined,
  FormularioElegido:undefined,
  CartillaScreen: undefined,
  CartillaMedicaScreen: undefined,
  MiSalud: undefined,
  CartillaMedicaEspecialidad: { idCartilla: string };

}


const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const { status } = useAuthStore();
  const navigator = useNavigation();

  const email = useProfileStore(state => state.email);

  /* useEffect(() => {
  navigator.setOptions({
    headerShown: false,
  })
  
  }, []) */


  return (
    <Stack.Navigator
    /* ATENCIÒN ACÁ: INITIAL RouteName: esto define el loging sino anda usar la variante de abajo comentada. */
      initialRouteName={status === 'authenticated' ? 'home' : 'LoginScreen'}
   /*    initialRouteName={'home'} */
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 50,
          shadowColor: 'transparent',
        }
      }}
    >
{/* ------------VISTAS PRINCIPALES: -------------->*/}

{/* ------------VISTAS INICIO SESIÓN: -------------->*/}
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='LoadingScreen' component={LoadingScreen} options={{ headerShown: true }} />



{/* ------------VISTAS DESDE EL BOTTOM TAB: -------------->*/}

{/* La vista PADRE es el home con BottomTabsNavigator: */}
      <Stack.Screen name='home' component={BottomTabsNavigator} options={{ headerShown: false }} />
{/* vistas a las que se accede desde el botomTabsNavigator: */}

{/* (Mi Gestion): */}
     <Stack.Screen name="Tramites" component={TramitesScreen} options={{ headerShown: false }} />
{/* (Mi Salud): */}
      <Stack.Screen name="CartillaScreen" component={CartillaScreen} options={{ headerShown: true }} />

{/* ----------VISTAS SECUNDARIAS: -------------->*/}

{/*  HOME (INICIO): */}
                        {/* Afiliados a Cargo: */}
      <Stack.Screen name="Products2" component={ProductsScreen2} options={{ headerShown: true }} /> 

      {/* Desde Afiliados a Cargo podemos navegar al Product Screen (componente reutilizable) */}
      <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: true }} />

  {/* Settings: */}
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />

{/* MI SALUD (CartillaScreen): */}

      <Stack.Screen name="CartillaMedicaScreen" component={CartillaMedicaScreen} options={{ headerShown: true }} /> 
     {/* Desde CartilaMedicaScreen vamos a la especialidad: */}
      <Stack.Screen name="CartillaMedicaEspecialidad" component={CartillaMedicaEspecialidad} options={{ headerShown: true }} />

{/* MI GESTIÓN (TramitesScreen): */}

{/* Solicitar orden de consulta: */}
      <Stack.Screen name="ConsultaScreenFinal" component={ConsultaScreenFinal} options={{ headerShown: true }} />

{/* ConsultaScreenFinal Redirige a miOrdenConsultaScreen y muestra el Link: */}
      <Stack.Screen name="MiOrdenConsulta" component={MiOrdenConsultaScreen} options={{ headerShown: true }} />

{/* Obtener Formularios Especiales: */}
      <Stack.Screen name="Formularios" component={FormulariosEspScreen} options={{ headerShown: true }} />

      <Stack.Screen name="FormularioElegido" component={FormularioElegido} options={{ headerShown: true }} />

{/* DRAWER----------> */}

      <Stack.Screen name="MisDatos" component={MisDatosScreen} options={{ headerShown: true }} />
      
    
    </Stack.Navigator>
  );
}

/*  ---MATERIAL REUTILIZABLE----> */

{/* <Stack.Screen name="MiSalud" component={CartillaMedicaScreen} options={{ headerShown: true }} /> */}


{/*     <Stack.Screen name="ConsultaScreen" component={ConsultaScreen} options={{ headerShown: true }} /> */}
   {/*  <Stack.Screen name="Credencial" component={CredencialScreen} /> */}
  {/*   <Stack.Screen name="CredencialScreenPrueba" component={CredencialScreenPrueba} /> */}

{/* <Stack.Screen name="Settings2" component={ ProfileScreen } /> */ }
/* initialRouteName={status === 'authenticated' ? 'home': 'LoginScreen'} */
/*    initialRouteName={status === 'authenticated' ? 'home': 'LoginScreen'}  */
{/*       <Stack.Screen name= 'home' component={HomeScreen} /> */ }

    {/*  <Stack.Screen name='Cartilla' component={TopTabsNavigator} options={{ headerShown: true }} /> */}