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
import { globalColors } from '../../theme/theme';

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
      <CustomHeader  color={globalColors.gray}  />
      <HamburgerMenu />
      <Credencial />


      <View
        style={styles.container}
      >
          <View style={styles.rowContainer}>
            <SecondaryButton
              onPress={() => navigation.navigate('Afiliados')}
              label="Afiliados "
              iconName='people-circle-outline'
              description='Tu Grupo Familiar y credenciales'
            />
        
            <SecondaryButton
              onPress={() => navigation.navigate('Settings')}
              label="Settings"
              iconName='settings-outline'
              description='Tu configuracion personalizada'
            />
          </View>
        
        <View
          style={styles.rowContainer}
        >

          <SecondaryButton
            onPress={() => navigation.navigate('Afiliados')}
            label="Buscar guardia"
            iconName='fitness-outline'
            description='Prestadores Cercanos'
          />
          <SecondaryButton
            onPress={() => navigation.navigate('Settings')}
            label="Asistencia"
            iconName='chatbubbles-outline'
            description='Chateá con nuestro soporte'
          />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 180,
/*     backgroundColor: 'violet', */
    marginLeft:0,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: -10,
/*     backgroundColor: 'yellow',  */
    maxWidth:'50%', 
    maxHeight:'70%',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
 /*    backgroundColor: 'orange', */
    justifyContent: 'center',
    paddingHorizontal:0,
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