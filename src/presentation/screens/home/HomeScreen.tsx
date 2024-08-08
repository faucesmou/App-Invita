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

/* import NotificationComponent from '../../components/shared/NotificationComponent'; */
import NotiComponent3 from '../../components/shared/NotiComponent3';
import NotiMensajes from '../../components/shared/Noti-mensajes';
import { useNotificationStore } from '../../store/notification-store';



export const HomeScreen = () => {
  console.log('Entrando al homeScreen---->')

/* contexto para avisar que se carga por primera vez al notificador */
const { initialLoadComplete, setInitialLoadComplete } = useNotificationStore();
const setMedicalNotifications = useNotificationStore((state) => state.setMedicalNotifications);
const setOrderNotifications = useNotificationStore((state) => state.setOrderNotifications);



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
        
          setOrdenConsulta('');
        }
      }
    }
    openURL();
  }, [ordenConsulta]);
/* useEffect para avisar al notificador que ya se cargo por primera vez esta vista:  */



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
            marginLeft: '12%',
         
          }} >
            Inicio
          </Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              console.log('presiono el boton');
              navigation.navigate('Buzon');
            }}
            style={{ marginLeft: 0, marginBottom: 5 }}
          >
       
            <NotiMensajes />
          </Pressable>

          <NotiComponent3/> 
        </View>

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
            resizeMode="contain" 
          />
        </View>
      </View>

      <QuaternaryButton
              onPress={() => navigation.navigate('Facturas')}
              label={'Descargá tus Facturas'}
              iconName='cloud-download-outline'
              iconName2='mail-outline'
              description='Accedé a todas tus facturas'
        
            />
        
      <View
              style={styles.bigContentContainer}
              >
              <View
              style={styles.buttonsContainer}
              >
                  <View  style={styles.rowContainer1} >
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
                      style={styles.rowContainer2} 
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
/*    backgroundColor:'green'  */
  },
  rowContainer1: {
    flexDirection: 'row',
    marginBottom: -10,
    maxWidth:'50%', 
    maxHeight:'70%',
    marginTop: '0%',
 /*   backgroundColor:'yellow'  */
  },
  rowContainer2: {
    flexDirection: 'row',
    marginBottom: -10,
    maxWidth:'50%', 
    maxHeight:'70%',
    marginTop: '3%',
 /*   backgroundColor:'yellow'  */
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
  marginTop: '6%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flexDirection:'row',
  height: '50%',
  marginHorizontal:20,//En el 15maxpro estaba en 40.
/*   backgroundColor:'green' */
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

  /* import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Linking, Pressable, ScrollView } from 'react-native';
import { RootStackParams } from '../../routes/StackNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IonIcon } from '../../components/shared/IonIcon';
import { QuaternaryButton } from '../../components/shared/QuaternaryButton';
import { SecondaryButton } from '../../components/shared/SecondaryButton';
import { globalColors } from '../../theme/theme';
import Credencial from '../../components/shared/Credencial';

export const HomeScreen = () => {
  const [ordenConsulta, setOrdenConsulta] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { top } = useSafeAreaInsets();
  const headerHeight = 120 + top;

  const Url = `https://api.whatsapp.com/send?phone=542613300622&text=%C2%A1Hola%2C%20Pixi!%20Vengo%20de%20la%20APP%20y%20tengo%20algunas%20consultas.%20%F0%9F%91%8D`;

  const handleOpenURL = () => {
    setOrdenConsulta(Url);
  };

  useEffect(() => {
    const openURL = async () => {
      if (ordenConsulta) {
        try {
          await Linking.openURL(ordenConsulta);
        } catch (err) {
          console.log('error al intentar ingresar a whatsapp:', err);
        } finally {
          setOrdenConsulta('');
        }
      }
    };
    openURL();
  }, [ordenConsulta]);

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={[styles.headerContainer, { height: headerHeight }]}>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={styles.headerText}>Home</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Buzon')} style={{ marginLeft: 0, marginBottom: 0 }}>
          <IonIcon name='notifications-outline' color={'white'} size={35} />
        </Pressable>
      </View>

      <View style={styles.cardContainer}>
        <Credencial />
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Bienvenido a Andes Salud</Text>
          <Image source={require('../../assets/images/logogris.png')} style={styles.image} resizeMode="contain" />
        </View>
      </View>

      <QuaternaryButton
        onPress={() => navigation.navigate('Facturas')}
        label={'Descargá tus Facturas'}
        iconName='cloud-download-outline'
        iconName2='mail-outline'
        description='Accedé a todas tus facturas'
      />

      <View style={styles.bigContentContainer}>
        <View style={styles.buttonsContainer}>
          <View style={styles.rowContainer}>
            <SecondaryButton
              onPress={() => navigation.navigate('Afiliados')}
              label="Mi Grupo Familiar"
              iconName='people-circle-outline'
              description='Tu Grupo Familiar y credenciales'
            />
            <SecondaryButton
              onPress={() => navigation.navigate('Perfil')}
              label="Mi Perfil"
              iconName='person-circle-outline'
              description='Tu cuenta personalizada'
            />
          </View>

          <View style={styles.rowContainer}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 0,
    backgroundColor: globalColors.white2,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: globalColors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    zIndex: 9, 
  },
  headerText: {
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    marginLeft: '7%',
  },
  cardContainer: {
    marginTop: -40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: globalColors.white2,
    zIndex: 7, // Manteniendo el valor zIndex
  },
  bigContentContainer: {
    flex: 1,
    marginTop: -35,
    borderRadius: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flex: 1,
    marginBottom: '10%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 5, 
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});
 */