//import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Linking, Pressable, } from 'react-native'
import { RootStackParams } from '../../routes/StackNavigator';
import { useProfileStore } from '../../store/profile-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import CustomHeader from '../../components/CustomHeader';
import Credencial from '../../components/shared/Credencial';
import { SecondaryButton } from '../../components/shared/SecondaryButton';
import { globalColors } from '../../theme/theme';
import { QuaternaryButton } from '../../components/shared/QuaternaryButton';
import { BackButton } from '../../components/shared/BackButton';
import { IonIcon } from '../../components/shared/IonIcon';



export const HomeScreen = () => {
  console.log('Entrando al homeScreen---->')

const [ordenConsulta, setOrdenConsulta] = useState("");
let Url = `https://api.whatsapp.com/send?phone=542613300622&text=%C2%A1Hola%2C%20Pixi!%20Vengo%20de%20la%20APP%20y%20tengo%20algunas%20consultas.%20%F0%9F%91%8D`

const handleOpenURL = () => {
  console.log('entrando a whatsapp');
  
  setOrdenConsulta(Url);
}

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = 120; // Altura inicial del encabezado
  const adjustedHeaderHeight = headerHeight + top // Ajusta la altura para tener en cuenta los márgenes seguros

  useEffect(() => {
    
    const openURL = async () =>{
      if(ordenConsulta){
        try{
          await Linking.openURL(ordenConsulta)
        } catch (err) {
          console.log('error al intentar ingresar a whatsapp:', err);
        } finally {
          // Restablecer el estado después de intentar abrir la URL
          setOrdenConsulta('');
        }
      }
    }
    openURL();
  }, [ordenConsulta]);

  return (
    <View style={styles.screenContainer}
    >

      <View style={
        [styles.headerContainer, 
          {
            height: adjustedHeaderHeight,
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'row'
          }]}>

        <View style={{ width: '80%', marginBottom: 10  }}>

          <Text style={{
            fontSize: 35,
            textAlign: 'center',
            color: 'white',
         
          }} >
            Home
          </Text>
        </View>
        <View /* style={{ width: '80%' }} */ 
        >

        <Pressable onPress={() => {
          console.log('presiono el boton ');
          navigation.navigate('Buzon')
        }}
          style={{ marginLeft: 0, marginBottom: 0 }}
        >
         {/*  <IonIcon name='notifications-circle-outline' color={'white'} size={35} /> */}
         <IonIcon name='notifications-outline' color={'white'} size={35} /> 
        </Pressable>
        
        </View>



        {/*   <BackButton /> */}
        {/*  <CustomHeader color={'white'} /> */}
      {/*   <View style={{ position: 'absolute', zIndex: 2, left: 0, width: '100%' }}>

        </View> */}
      </View>

      <View style={styles.cardContainer} >

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

      <QuaternaryButton
              onPress={() => navigation.navigate('Facturas')}
              label={'Descargá tus Facturas'}
              iconName='cloud-download-outline'
              iconName2='mail-outline'
              description='Accedé a todas tus facturas'
              /* color={color} */ 
            />
        
      <View
              style={styles.bigContentContainer}
              >
              <View
              style={styles.buttonsContainer}
              >
                  <View  style={styles.rowContainer} >
                    <SecondaryButton
                      onPress={() => {
                        console.log('presiono el boton ');
                        navigation.navigate('Afiliados')
                      }}
                      label="Mi Grupo Familiar"
                      iconName='people-circle-outline'
                      description='Tu Grupo Familiar y credenciales'
                    />

                    <SecondaryButton
                      onPress={() => {
                        console.log('presiona el boton perfil');
                        navigation.navigate('Perfil');
                      }}
                      label="Mi Perfil"
                      iconName='person-circle-outline'
                      description='Tu cuenta personalizada'
                    />
                  </View>

                    <View
                      style={styles.rowContainer} 
                    >

                      <SecondaryButton
                        onPress={() => navigation.navigate('Pagos')}
                        label="Mis Pagos"
                        iconName='file-tray-full-outline'
                        description='Accedé al estado de tus pagos'
                      />
                      <SecondaryButton
                        onPress={handleOpenURL}
                        label="Asistencia"
                        iconName='chatbubbles-outline'
                        description='Chateá con nuestro soporte'
                      />
                      
                    </View>
              </View>

            
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 0,
    zIndex: 0.5,
    backgroundColor: globalColors.white2  
  },
  headerContainer: {
    zIndex: 1, 
    width: '100%',
    backgroundColor: globalColors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  cardContainer: {
    position: 'absolute',
    top: 110, 
    width: '100%',
    height:'0%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    paddingHorizontal: 0,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: globalColors.white2  
  },
  bigContentContainer: {
    flex: 1,
    marginTop: -35,
    marginBottom: '2%',
    zIndex: 2,
    borderRadius: 15,
  },
  buttonsContainer: {
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: '20%',
    marginLeft:0,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: -10,
    maxWidth:'50%', 
    maxHeight:'70%',
    marginTop: 5,
  },
 card: {
  width: '90%',
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 15 },
  shadowOpacity: 0.1,
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
imageContainer: {
  marginBottom: 0,
  marginTop: 162,
  flex: 0.2,
  alignItems: 'center',
  flexDirection:'row',
  justifyContent: 'center',
  maxHeight:'10%',
  marginHorizontal:0,
  padding:0,
},
innerContainer: {
  marginBottom: 0,
  marginTop: 5,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
  flexDirection:'row',
  height: '40%',
  marginHorizontal:40,
},
image: {
  flex: 0.2,
  width: '100%',
  height: '100%',
},
text: {
  fontSize: 24,
  textAlign: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
  margin: 0,
  flexWrap: 'wrap'
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