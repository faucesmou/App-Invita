//import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { RootStackParams } from '../../routes/StackNavigator';
import { useProfileStore } from '../../store/profile-store';
import { useCounterStore } from '../../store/counter-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import CustomHeader from '../../components/CustomHeader';
//import { Button, Layout, Text } from '@ui-kitten/components';
//import { MyIcon } from '../../components/ui/MyIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import Credencial from '../../components/shared/Credencial';

export const HomeScreen = () => {
  console.log('Entrando al homeScreen---->')

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();


  /* usando el State del Profile Store:  */
  /*   const name = useProfileStore(state => state.name);
    const email = useProfileStore(state => state.email);
  
    const count = useCounterStore(state => state.count); */

  /* useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        <Pressable onPress={ ()=> navigation.dispatch( DrawerActions.toggleDrawer)}>
          <Text>
            Menu
          </Text>
        </Pressable>
      }
    })
  }, []) */

  //const navigation = useNavigation();

  //const { logout } = useAuthStore()

  return (
    <View /* style={globalStyles.container} */
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 0,
        /*  backgroundColor: 'green' */
      }}
    >
      <CustomHeader />
      <HamburgerMenu />
      <Credencial />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: -160,
          marginBottom: 20,
          /*  backgroundColor: 'yellow' */
        }}
      >

        <PrimaryButton
          onPress={() => navigation.navigate('Afiliados')}
          label="Afiliados a Cargo"
        />
        <PrimaryButton
          onPress={() => navigation.navigate('Settings')}
          label="Settings"
        />


      </View>
      {/*   <Text style={{ marginBottom: 5, marginTop:15 }}> { name }</Text>
        <Text style={{ marginBottom: 15 }}> { email } </Text>
        <Text style={{ marginBottom: 5 }}> Productos: { count } </Text> */}


      {/*  <Button
          accessoryLeft={<MyIcon name="log-out-outline" white />} 
          onPress={ logout } >
            Cerrar sesión
          </Button> */}


    </View>
  )
}
