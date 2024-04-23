import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Screen } from '../screens/tabs/Tab1Screen';
//import { Tab2Screen } from '../screens/tabs/Tab2Screen';
//import { Tab3Screen } from '../screens/tabs/Tab3Screen';
import { globalColors } from '../theme/theme';
import { TopTabsNavigator } from './TopTabsNavigator';
import { StackNavigator } from './StackNavigator';
import { IonIcon } from '../components/shared/IonIcon';
import { TramitesScreen } from '../screens/tabs/TramitesScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MasScreen } from '../screens/tabs/MasScreen';
import { CredencialScreen } from '../screens/credential/CredencialScreen';


const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
    sceneContainerStyle={{
        backgroundColor: globalColors.background,
    }}
    screenOptions={{
        //headerShown: false,
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
      <Tab.Screen name="Tab1"
       options={{ title: 'Inicio', tabBarIcon: ({ color }) =>  ( <IonIcon name='home-outline' color= { color }/> ) }} 
       component={ HomeScreen } />
      <Tab.Screen name="Tab2"
       options={{ title: 'Cartilla', tabBarIcon: ({ color }) =>  ( <IonIcon name='book-outline' color= { color }/> ) }}  
       component={ TopTabsNavigator } />
      <Tab.Screen name="Tab3"
       options={{ title: 'Credencial', tabBarIcon: ({ color }) =>( <IonIcon name='card-outline' color= { color }/> ) }}  
       component={ CredencialScreen } />
      <Tab.Screen name="Tab4"
       options={{ title: 'Tramites', tabBarIcon: ({ color }) =>( <IonIcon name='document-text-outline' color= { color }/> ) }}  
       component={ TramitesScreen } />
      <Tab.Screen name="Tab5"
       options={{ title: 'Mas', tabBarIcon: ({ color }) =>( <IonIcon name='menu-outline' color= { color }/> ) }}  
       component={ MasScreen } />
      
    </Tab.Navigator>
  );
}