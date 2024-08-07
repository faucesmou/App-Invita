import { createStackNavigator } from '@react-navigation/stack';


import { ProductScreen } from '../screens/afiliados/ProductScreen';
/* import { SettingsScreen } from '../screens/settings/Perfil'; */
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { HamburgerMenu } from '../components/shared/HamburgerMenu';
import { useProfileStore } from '../store/profile-store';

import { Afiliados/* , ProductsScreen2  */} from '../screens/afiliados/Afiliados';
import { MisDatosScreen } from '../screens/profile/MisDatosScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { MiOrdenConsultaScreen } from '../screens/MiGestion/MiOrdenConsultaScreen';
import { CredencialScreen } from '../screens/credential/CredencialScreen';
import { TopTabsNavigator } from './TopTabsNavigator';
import { TramitesScreen } from '../screens/MiGestion/TramitesScreen';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { useAuthStore } from '../store/auth/useAuthStore';
import { CredencialScreenPrueba } from '../screens/credential/CredencialScreenPrueba';
import { ConsultaScreen } from '../screens/ordenConsulta/ConsultaScreen';
import { ConsultaScreenFinal } from '../screens/ordenConsulta/ConsultaScreenFinal';
import { FormulariosEspScreen } from '../screens/MiGestion/formulariosEspeciales/FormulariosEspScreen';
import { FormularioElegido } from '../screens/MiGestion/formulariosEspeciales/FormularioElegido';
import { CartillaMedicaScreen } from '../screens/MiSalud/cartillaMedica/CartillaMedicaScreen';
import { CartillaScreen } from '../screens/MiSalud/CartillaScreen';
import { CartillaMedicaEspecialidad } from '../screens/MiSalud/cartillaMedica/CartillaMedicaEspecialidad';
import { EstudiosMedicosScreen } from '../screens/MiSalud/estudiosMedicos/EstudiosMedicosScreen';
import { EstudiosMedicosEnv } from '../screens/MiSalud/estudiosMedicos/EstudiosMedicosEnv';
import { PagosScreen } from '../screens/MiGestion/pagos/PagosScreen';
import { SettingsScreen } from '../screens/home/Perfil/Perfil';
import { Buzon } from '../screens/home/Perfil/Buzon';
import { Buzon1 } from '../screens/home/Perfil/Buzon1';
import { HomeScreen } from '../screens/home/HomeScreen';
import { Facturas } from '../screens/home/Facturas/Facturas';
import { LoginScreen2 } from '../screens/auth/LoginScreen2';



/* type es similar a interfaz, es decir defnimos la estructura que tienen que tener los props. */

export type RootStackParams = {
  home: undefined,
 /*  Product: { id: number, name: string }, */
  Credenciales: { id: number, name: string },
  Products: undefined,
  Afiliados: undefined,
  Buzon: undefined,
  Buzon1: undefined,
  Perfil: undefined,
  MiGestión: undefined,
  MisDatos: undefined,
  "Orden Enviada": undefined,
  Credencial: undefined,
  Cartilla: undefined,
  LoginScreen: undefined,
  LoginScreen2: undefined,
  LoginGonzalo: undefined,
  RegisterScreen: undefined,
  LoadingScreen: undefined,
  SideMenuNavigator: undefined,
  CredencialScreenPrueba:undefined,
  ConsultaScreen: undefined,
  Consulta: undefined,
  Formulario:undefined,
  CartillaScreen: undefined,
  Cartillas: undefined,
  MiSalud: undefined,
  Formularios:undefined,
  Prestadores: { idCartilla: string };
  EstudiosMedicos: undefined, 
  "Estudios Médicos": undefined,
  "Estudios enviados": undefined,
  EstudiosMedicosEnviados:undefined,
  Pagos: undefined,
  Facturas:undefined,

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
      initialRouteName={status === 'authenticated' ? 'home' : 'LoginGonzalo'}
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
      {/* <Stack.Screen name='LoginGonzalo' component={LoginScreen2} options={{ headerShown: false }} /> */}
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='LoadingScreen' component={LoadingScreen} options={{ headerShown: true }} />



{/* ------------VISTAS DESDE EL BOTTOM TAB: -------------->*/}

{/* La vista PADRE es el home con BottomTabsNavigator: */}
      <Stack.Screen name='home' component={BottomTabsNavigator} options={{ headerShown: false }} /> 

      {/* <Stack.Screen name= 'home' component={HomeScreen} />  */}
{/* vistas a las que se accede desde el botomTabsNavigator: */}

{/* (Mi Salud): */}
      <Stack.Screen name="MiSalud" component={CartillaScreen} options={{ headerShown: false }} />

{/* (Mi Gestion): */}
     <Stack.Screen name="MiGestión" component={TramitesScreen} options={{ headerShown: true }} />

{/* ----------VISTAS SECUNDARIAS: -------------->*/}

{/*  HOME (INICIO): */}
                        {/* Descarga tu factura: */}
  <Stack.Screen name="Facturas" component={Facturas} options={{ headerShown: true }} /> 
 

                        {/* Mi grupo Familiar : */}
      <Stack.Screen name="Afiliados" component={Afiliados} options={{ headerShown: true }} /> 
      {/* Desde Mi grupo Familiar a Cargo podemos navegar al Product Screen (componente reutilizable) */}
      <Stack.Screen name="Credenciales" component={ProductScreen} options={{ headerShown: true }} />

                          {/* Settings: */}
      <Stack.Screen name="Perfil" component={SettingsScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Buzon" component={Buzon} options={{ headerShown: true }} /> 

{/* MI SALUD (CartillaScreen): */}

      <Stack.Screen name="Cartillas" component={CartillaMedicaScreen} options={{ headerShown: true }} /> 
     {/* Desde CartilaMedicaScreen vamos a la especialidad: */}
      <Stack.Screen name="Prestadores" component={CartillaMedicaEspecialidad} options={{ headerShown: true }} />

      <Stack.Screen name="Estudios Médicos" component={EstudiosMedicosScreen} options={{ headerShown: true, headerTitleStyle: { fontSize: 18 },  }} />
      
{/* MI GESTIÓN (TramitesScreen): */}

{/* Solicitar orden de consulta: */}
      <Stack.Screen name="Consulta" component={ConsultaScreenFinal} options={{ headerShown: true }} />

{/* ConsultaScreenFinal Redirige a miOrdenConsultaScreen y muestra el Link: */}
      <Stack.Screen name="Orden Enviada" component={MiOrdenConsultaScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Estudios enviados" component={EstudiosMedicosEnv} options={{ headerShown: true }} />

{/* Obtener Formularios Especiales: */}
      <Stack.Screen name="Formularios" component={FormulariosEspScreen} options={{ headerShown: true }} />

      <Stack.Screen name="Formulario" component={FormularioElegido} options={{ headerShown: true }} />

{/* Pagos del usuario */}

     <Stack.Screen name="Pagos" component={PagosScreen} options={{ headerShown: true }} /> 



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
    

    {/*  <Stack.Screen name='Cartilla' component={TopTabsNavigator} options={{ headerShown: true }} /> */}