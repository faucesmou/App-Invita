import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import { TopTabsNavigator } from './TopTabsNavigator';
import { TramitesScreen } from '../screens/MiGestion/TramitesScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
//import { MasScreen } from '../screens/mas/MasScreen';
//import { CredencialScreen } from '../screens/credential/CredencialScreen';

import { globalColors } from '../theme/theme';
import { IonIcon } from '../components/shared/IonIcon';
//import { CredencialScreenPrueba } from '../screens/credential/CredencialScreenPrueba';
import { CartillaScreen } from '../screens/MiSalud/CartillaScreen';
import { HomeScreenUx } from '../screens/home/HomeScreenUx';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, StyleSheet } from 'react-native';
import { HomeScreenUxNew } from '../screens/home/HomeScreenUxNew';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {

  const { height } = Dimensions.get('window');
  let headerHeight = hp('12%'); // Ajusta el tamaño de la cabecera según el alto de la pantalla

  if (height < 680) { // IMPORTANTE Pantallas más pequeñas como iPhone SE o iPhone 8 de 5.4 pulgadas o menos aproximadamente 
    headerHeight = hp('9%'); // Ajuste para pantallas más pequeñas
  }


  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: globalColors.background,
      }}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: globalColors.profile,
        tabBarLabelStyle: {
          marginBottom: hp('1.5%'),
          /* marginBottom: 5, */
         /*  backgroundColor: 'blue', */
          fontSize: hp('1.8%'),
          marginTop: hp('-1%'),
          /* fontSize: 15, */
        },
        headerStyle: {
          borderColor: 'transparent',
          shadowColor: 'transparent',
        },
        tabBarStyle: {
          borderTopWidth: 1,
          elevation: 10,
          height: 0,
          // ----------->>>IMPORTANTE!: AL COLOCAR EL HEIGHT EN 0 OCULTO EL BOTOM TAB NAVIGATOR.PARA REESTABLECERLO  DESCOMENTAR LO SIGUIENTE: height: headerHeight <<<-------------

          /* height: headerHeight, */
          /* height: hp('12%'), */
         /*  height: 100, */
        }
      }}
    >

    {/*   <Tab.Screen name="HomeScreen"
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<IonIcon name='home-outline' color={color}  />), headerShown: false  }}
        component={HomeScreen} /> */}
    {/*   <Tab.Screen name="HomeScreenUx"
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<IonIcon name='home-outline' color={color} size={hp('3.9%')}  />), headerShown: false  }}
        component={HomeScreenUx} /> */}
     <Tab.Screen name="HomeScreenUxNew"
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<IonIcon name='home-outline' color={color} size={hp('3.9%')}  />), headerShown: false  }}
        component={HomeScreenUxNew} />
      <Tab.Screen name="Cartilla"
        options={{ title: 'MiSalud', tabBarIcon: ({ color }) => (<IonIcon name='heart-outline' color={color}  size={hp('3.8%')  } />), headerShown: false  }}
        component={CartillaScreen} />
{/*       <Tab.Screen name="Credencial"
        options={{ title: 'Credencial', tabBarIcon: ({ color }) => (<IonIcon name='card-outline' color={color} />) }}
        component={CredencialScreenPrueba} /> */}
      <Tab.Screen name="MiGestión"
        options={{ title: 'Mi Gestión', tabBarIcon: ({ color }) => (<IonIcon name='document-text-outline' color={color} style={styles.icon} size={hp('3.9%')}  />), headerShown: false  }}
        
        component={TramitesScreen} />
{/*       <Tab.Screen name="Mas"
        options={{ title: 'Mas', tabBarIcon: ({ color }) => (<IonIcon name='menu-outline' color={color} />) }}
        component={MasScreen} /> */}

    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: {
    marginTop: hp('1%'),
  },
})