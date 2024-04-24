import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TopTabsNavigator } from './TopTabsNavigator';
import { TramitesScreen } from '../screens/tramites/TramitesScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MasScreen } from '../screens/mas/MasScreen';
import { CredencialScreen } from '../screens/credential/CredencialScreen';

import { globalColors } from '../theme/theme';
import { IonIcon } from '../components/shared/IonIcon';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {




  return (
    <Tab.Navigator
    sceneContainerStyle={{
        backgroundColor: globalColors.background,
    }}
    screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: globalColors.primary,
        tabBarLabelStyle: {
            marginBottom: 5,
        },
        headerStyle:{
            borderColor: 'transparent',
            shadowColor:'transparent',
        },
        tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0
        }
    }}
    >

      <Tab.Screen name="HomeScreen"
       options={{ title: 'Inicio', tabBarIcon: ({ color }) =>  ( <IonIcon name='home-outline' color= { color }/> ) }} 
       component={ HomeScreen } />
      <Tab.Screen name="Cartilla"
       options={{ title: 'Cartilla', tabBarIcon: ({ color }) =>  ( <IonIcon name='book-outline' color= { color }/> ) }}  
       component={ TopTabsNavigator } />
      <Tab.Screen name="Credencial"
       options={{ title: 'Credencial', tabBarIcon: ({ color }) =>( <IonIcon name='card-outline' color= { color }/> ) }}  
       component={ CredencialScreen } />
      <Tab.Screen name="Tramites"
       options={{ title: 'Tramites', tabBarIcon: ({ color }) =>( <IonIcon name='document-text-outline' color= { color }/> ) }}  
       component={ TramitesScreen } />
      <Tab.Screen name="Mas"
       options={{ title: 'Mas', tabBarIcon: ({ color }) =>( <IonIcon name='menu-outline' color= { color }/> ) }}  
       component={ MasScreen } />
      
    </Tab.Navigator>
  );
}