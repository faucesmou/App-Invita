//import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
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

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = 120; // Altura inicial del encabezado
  const adjustedHeaderHeight = headerHeight + top // Ajusta la altura para tener en cuenta los márgenes seguros


  return (
    <View style={styles.screenContainer}
      /* style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 0,
      }} */
    >

    <View style={[styles.headerContainer, { height: adjustedHeaderHeight }]}>

      <View style={{  width: '80%' }}>

          <Text style={{
            fontSize: 30,
            textAlign: 'center',
            color: 'white'
          }} >
            Home
          </Text>
        </View>
        <CustomHeader color={globalColors.gray} />
        <View style={{ position: 'absolute', zIndex: 2, left: 0, width: '100%' }}>
         
        </View>
      </View>

      <View  style={styles.cardContainer} >
       
         {/*  <Text style={styles.cardTitle}>Turnos en agenda</Text>
          <Text style={styles.cardSubtitle}>Contactá con nuestros asesores</Text> */}
          <Credencial />
       
      </View>
      <View style={styles.imageContainer}>

        <View
          style={styles.innerContainer}
        >
          <Text style={styles.text} >
            Bienvenido a Andes Salud
          </Text>

          <Image source={require('../../assets/images/logogris.png')}
            style={styles.image}
            resizeMode="contain" // Ajusta la imagen manteniendo su relación de aspecto
          />
        </View>
      </View>


      <View
        style={styles.ButtonsContainer}
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
  ButtonsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: '10%',
/*     backgroundColor: 'violet',  */ 
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
/* integracion de custom header con tarjeta intermedia: ----->-------->>  */
screenContainer: {
  flex: 1,
  paddingHorizontal: 0,
  marginTop: 0,
},
headerContainer: {
  zIndex: 1, // Asegúrate de que el zIndex sea menor
  width: '100%',
  backgroundColor: globalColors.gray,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 15,
},
cardContainer: {
  position: 'absolute',
  top: 115, // Ajusta este valor según sea necesario revisar si lo podemos dejar dinamico y proporcional al headerContainer 
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  paddingHorizontal: 0,
  marginBottom: 10,
  /*     backgroundColor:'violet', */
  borderRadius: 20,
},
card: {
  width: '90%',
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.5,
  shadowRadius: 15,
  elevation: 5,
},
cardTitle: {
  fontSize: 22,
  fontWeight: 'normal',
  textAlign: 'center',
  marginBottom: 10,
},
cardSubtitle: {
  fontSize: 18,
  textAlign: 'center',
  color: 'black',
},
buttonsContainer: {
  marginTop: 40,
  zIndex: 1.5,
  marginTop: 70,
  borderRadius: 15,
/*   backgroundColor: 'yellow' */
},

/* contenedor con texto e imagen para agregar en el medio del home------->> */
imageContainer: {
  marginBottom: 0,
  marginTop: 165,
  flex: 0.5,
  alignItems: 'center',
  flexDirection:'row',
  justifyContent: 'center',
/*   backgroundColor:'green', */
  maxHeight:'10%',
  
},
innerContainer: {
  marginBottom: 10,
  marginTop: 15,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '90%',
/*   backgroundColor:'yellow', */
  flexDirection:'row',
  height: '50%',
  marginHorizontal:20,

},
image: {
  flex: 0.3,
  width: '100%',
  height: '100%',
 /*  margin: 10, */
/*   backgroundColor:'blue', */
},
text: {
  fontSize: 25,
  textAlign: 'center',
 /*  justifyContent: 'center', */
  flex: 1,
  width: '100%',
  height: '100%',
/*   alignContent:'center', */
  margin: 0,
  flexWrap: 'wrap'
 /*  marginTop: '6%' */ // ARREGLAR ---><
},



});

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