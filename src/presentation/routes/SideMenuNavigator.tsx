import { View, useWindowDimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParams, StackNavigator } from './StackNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { globalColors } from '../theme/theme';

import { IonIcon } from '../components/shared/IonIcon';
import { Button } from '@ui-kitten/components';
import { useAuthStore } from '../store/auth/useAuthStore';
import { MyIcon } from '../components/ui/MyIcon';




const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {


  const dimensions = useWindowDimensions()

/*   const { status } = useAuthStore();  */// Obtener el estado de autenticación
/*   const navigation = useNavigation<NavigationProp<RootStackParams>>(); */

 


  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      /* esta parte de screenOptions no està funcionando */
      screenOptions={{
        headerShown: true,
        drawerType: (dimensions.width >= 758) ? 'permanent' : 'slide',
        drawerActiveBackgroundColor: globalColors.orange,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: globalColors.orange,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20,
        }
      }}>
  

      <Drawer.Screen
        options={{ drawerIcon: ({ color }) => (<IonIcon name='caret-forward-circle-outline' color={color} />) }}
        name="Categorias" component={StackNavigator} />

      <Drawer.Screen
        options={{ drawerIcon: ({ color }) => (<IonIcon name='person-circle-outline' color={color} />) }}
        name="Mi Perfil" component={ProfileScreen} />

      

    </Drawer.Navigator>



  );
}

//<ion-icon name="log-in-outline"></ion-icon>

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

  const { logout } = useAuthStore() 

 
  return (
    <DrawerContentScrollView>
      <View
        style={{
          height: 200,
          backgroundColor: globalColors.orange,
          margin: 30,
          borderRadius: 50,
        }}
      />

      <DrawerItemList {...props} />

      <Button
        style={{
          height: 45,
          backgroundColor: globalColors.orange,
          margin: 10,
          borderRadius: 50,
          borderColor:globalColors.orange,
        }}
      accessoryLeft={<MyIcon name="log-out-outline" white />} 
      onPress={ logout } >
            Cerrar sesión
          </Button> 

    </DrawerContentScrollView>
  )
  
}


/*  accessoryLeft={<MyIcon name="log-out-outline" white />} */ 

 // Verificar si el usuario está autenticado
/*   if (status !== 'authenticated') {
    console.log('no puede acceder al drawer perro');
    navigation.navigate('LoginScreen'); 
    return null;
  } */