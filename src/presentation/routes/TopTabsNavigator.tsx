import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
//import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { AboutScreen } from '../screens/about/AboutScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

export const TopTabsNavigator = () =>  {

    const navigator = useNavigation();

    useEffect(() => {
    navigator.setOptions({
      headerShown: false,
    })
    
    }, [])

  return (
    <Tab.Navigator>
      <Tab.Screen name="Perfil" component={ ProfileScreen } />
      <Tab.Screen name="About" component={ AboutScreen } />
    </Tab.Navigator>
  );
}