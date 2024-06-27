import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
//import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { CartillaScreen } from '../screens/MiSalud/CartillaScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalColors } from '../theme/theme';



const Tab = createMaterialTopTabNavigator();
const { top } = useSafeAreaInsets();
const headerHeight = 80;
const adjustedHeaderHeight = headerHeight + top; // Ajusta la altura para tener en cuenta los márgenes seguros
export const TopTabsNavigator = () =>  {

    const navigator = useNavigation();

    useEffect(() => {
    navigator.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: globalColors.profile2, 
        height: adjustedHeaderHeight,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 28, 
      },
    })
    
    }, [])

  return (
    <Tab.Navigator
 /*    style={{
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 5 ,
      backgroundColor: '#e9f6f8'
    }} */
    >

      <Tab.Screen name="Perfil" component={ ProfileScreen } />
      <Tab.Screen name="Información" component={ CartillaScreen } />

    </Tab.Navigator>
  );
}