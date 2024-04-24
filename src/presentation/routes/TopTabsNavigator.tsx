import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
//import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { AboutScreen } from '../screens/about/AboutScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const Tab = createMaterialTopTabNavigator();
const { top } = useSafeAreaInsets();

export const TopTabsNavigator = () =>  {

    const navigator = useNavigation();

    useEffect(() => {
    navigator.setOptions({
      headerShown: true,
    })
    
    }, [])

  return (
    <Tab.Navigator
    style={{
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top ,
      backgroundColor: '#e9f6f8'
    }}
    >

      <Tab.Screen name="Perfil" component={ ProfileScreen } />
      <Tab.Screen name="About" component={ AboutScreen } />

    </Tab.Navigator>
  );
}