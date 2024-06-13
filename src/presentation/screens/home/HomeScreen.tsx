//import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
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
import { SecondaryButton } from '../../components/shared/SecondaryButton';

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
     /*    backgroundColor: 'green' */
      }}
    >
      <CustomHeader />
      <HamburgerMenu />
      <Credencial />


      <View
        style={styles.container}
      >
        <View
          style={styles.buttonContainer}
        >

          <SecondaryButton
            onPress={() => navigation.navigate('Afiliados')}
            label="Afiliados a Cargo"
            iconName='heart-outline'
          />
          <SecondaryButton
            onPress={() => navigation.navigate('Settings')}
            label="Settings"
            iconName='home-outline'
          />
        </View>
        <View
          style={styles.buttonContainer}
        >

          <SecondaryButton
            onPress={() => navigation.navigate('Afiliados')}
            label="Afiliados a Cargo"
            iconName='heart-outline'
          />
          <SecondaryButton
            onPress={() => navigation.navigate('Settings')}
            label="Settings"
            iconName='home-outline'
          />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal:10,
    marginTop: 10,
    marginBottom: 180,
  /*   backgroundColor: 'yellow', */
    justifyContent: 'center',
  },
  buttonContainer: {

    flexDirection: 'row',
    alignItems: 'center',
/*     backgroundColor: 'orange', */
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});



{/*  <Button
          accessoryLeft={<MyIcon name="log-out-outline" white />} 
          onPress={ logout } >
            Cerrar sesión
          </Button> */}
 {/*       <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
            marginBottom: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'yellow'
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

        </View> */}