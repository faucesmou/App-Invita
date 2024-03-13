import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Screen } from '../screens/tabs/Tab1Screen';
//import { Tab2Screen } from '../screens/tabs/Tab2Screen';
//import { Tab3Screen } from '../screens/tabs/Tab3Screen';
import { globalColors } from '../theme/theme';
import { TopTabsNavigator } from './TopTabsNavigator';
import { StackNavigator } from './StackNavigator';
import { IonIcon } from '../components/shared/IonIcon';


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
       options={{ title: '1', tabBarIcon: ({ color }) =>  ( <IonIcon name='accessibility-outline' color= { color }/> ) }} 
       component={ Tab1Screen } />
      <Tab.Screen name="Tab2"
       options={{ title: '2', tabBarIcon: ({ color }) =>  ( <IonIcon name='rocket-outline' color= { color }/> ) }}  
       component={ TopTabsNavigator } />
      <Tab.Screen name="Tab3"
       options={{ title: '3', tabBarIcon: ({ color }) =>( <IonIcon name='apps-outline' color= { color }/> ) }}  
       component={ StackNavigator } />
      
    </Tab.Navigator>
  );
}