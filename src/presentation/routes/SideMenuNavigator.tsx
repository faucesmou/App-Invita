import { View, useWindowDimensions } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { globalColors } from '../theme/theme';

import { IonIcon } from '../components/shared/IonIcon';
import { Button, Text } from '@ui-kitten/components';
import { useAuthStore } from '../store/auth/useAuthStore';
import { MyIcon } from '../components/ui/MyIcon';
import { useEffect, useState } from 'react';




const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions()
  const navigation = useNavigation();
  const { status } = useAuthStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Si el usuario no está autenticado y cerramos el drawer:
    if (status !== 'authenticated') {
      /* navigation.removeListener */
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  }, [status, isDrawerOpen, navigation ]);

// MOMENTANEAMENTE QUITE ESTE IF PARA PODER TRABAJAR, RESTAURAR CUANDO TERMINE LA APP!

// si no esta autenticado muestro este drawer pero que no podrá abrirse nunca:
  if (status !== 'authenticated'/* cambiar esto a authenticated */) {
/*    navigation.removeListener  */

    console.log('no estas autenticado te tengo que cerrar todo primo');

    return (
      <Drawer.Navigator
        initialRouteName={/* 'home' */ 'LoginScreen' }
        screenOptions={{
          /* swipeEdgeWidth: 0, */ //con esta propiedad no permito que se pueda abrir
          headerShown: false,
        
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >

        <Drawer.Screen
          options={{ drawerIcon: ({ color }) => (<IonIcon name='caret-forward-circle-outline' color={color} />), headerShown: false, /* intento sacar el onAnimatedValueUpdate agregando esto: : title: 'HomeScreen papa' */ }}
          name="HomeScreen papa" component={StackNavigator} />
      </Drawer.Navigator>
    );
  }
  // si está correctamente autenticado muestro este drawer:

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      /* esta parte de screenOptions no està funcionando */
      screenOptions={{
        headerShown: false,
        drawerType: (dimensions.width >= 758) ? 'permanent' : 'slide',
        drawerActiveBackgroundColor: globalColors.pressed2,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: globalColors.pressed2,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20,
        }
      }}>

      <Drawer.Screen
        options={{ drawerIcon: ({ color }) => (<IonIcon name='caret-forward-circle-outline' color={color}  />), /* intento sacar el onAnimatedValueUpdate agregando esto: : title: 'Home' */ }}
        name="Home" component={StackNavigator}  />

      <Drawer.Screen
        options={{ drawerIcon: ({ color }) => (<IonIcon name='person-circle-outline' color={color} />), headerShown: true, title: 'Mi Perfil' }}
        name="Mi Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// A continuacion se definen caracteristicas estilos y propiedades que se pasan luego como prop al drawer navigator: 

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

  const { logout } = useAuthStore()

  return (
    <DrawerContentScrollView>
      <View
        style={{
          height: 200,
          backgroundColor: globalColors.pressed2,
          margin: 30,
          borderRadius: 50,
        }}
      />

      <DrawerItemList {...props} />

      <Button
        style={{
          height: 45,
          backgroundColor: globalColors.pressed2,
          margin: 10,
          borderRadius: 50,
          borderColor: globalColors.pressed2,
          flexDirection: 'row',

          alignItems: 'center',
        }}
        accessoryLeft={<MyIcon name="log-out-outline" white />}
        onPress={logout}
      >
        Cerrar sesión
      </Button>
    </DrawerContentScrollView >
  )
}


