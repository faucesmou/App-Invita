import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import { TopTabsNavigator } from './TopTabsNavigator';
import { TramitesScreen } from '../screens/tramites/TramitesScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
//import { MasScreen } from '../screens/mas/MasScreen';
//import { CredencialScreen } from '../screens/credential/CredencialScreen';

import { globalColors } from '../theme/theme';
import { IonIcon } from '../components/shared/IonIcon';
//import { CredencialScreenPrueba } from '../screens/credential/CredencialScreenPrueba';
import { CartillaScreen } from '../screens/cartilla/CartillaScreen';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: globalColors.background,
      }}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: globalColors.profile,
        tabBarLabelStyle: {
          marginBottom: 5,
          marginTop: -5,
          fontSize: 15,
        },
        headerStyle: {
          borderColor: 'transparent',
          shadowColor: 'transparent',
        },
        tabBarStyle: {
          borderTopWidth: 1,
          elevation: 10,
          height: 100,
        }
      }}
    >

      <Tab.Screen name="HomeScreen"
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => (<IonIcon name='home-outline' color={color}  />), headerShown: false  }}
        component={HomeScreen} />
      <Tab.Screen name="Cartilla"
        options={{ title: 'MiSalud', tabBarIcon: ({ color }) => (<IonIcon name='heart-outline' color={color} />), headerShown: false   }}
        component={CartillaScreen} />
{/*       <Tab.Screen name="Credencial"
        options={{ title: 'Credencial', tabBarIcon: ({ color }) => (<IonIcon name='card-outline' color={color} />) }}
        component={CredencialScreenPrueba} /> */}
      <Tab.Screen name="Tramites"
        options={{ title: 'Mi Gestión', tabBarIcon: ({ color }) => (<IonIcon name='document-text-outline' color={color} />), headerShown: false  }}
        component={TramitesScreen} />
{/*       <Tab.Screen name="Mas"
        options={{ title: 'Mas', tabBarIcon: ({ color }) => (<IonIcon name='menu-outline' color={color} />) }}
        component={MasScreen} /> */}

    </Tab.Navigator>
  );
}