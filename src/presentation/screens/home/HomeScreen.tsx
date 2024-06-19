//import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { RootStackParams } from '../../routes/StackNavigator';
import { useProfileStore } from '../../store/profile-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import CustomHeader from '../../components/CustomHeader';
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
    >

            <View style={[styles.headerContainer, { height: adjustedHeaderHeight }]}>

                  <View style={{ width: '80%' }}>

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
                      label="Afiliados"
                      iconName='people-circle-outline'
                      description='Tu Grupo Familiar y credenciales'
                    />

                    <SecondaryButton
                      onPress={() => {
                        console.log('presiono el boton Settings');
                        navigation.navigate('Settings');
                      }}
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
    backgroundColor: /* globalColors.white2  */ 'blue' 
  },
  bigContentContainer: {
    flex: 1,
    marginTop: -25,
    marginBottom: '5%',
    zIndex: 2,
    borderRadius: 15,
    backgroundColor: globalColors.white2  
  },
  buttonsContainer: {
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: '20%',
    marginLeft:0,
  /*   backgroundColor:'green' */
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
  shadowOpacity: 0.2,
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
  marginBottom: 10,
  marginTop: 175,
  flex: 0.5,
  alignItems: 'center',
  flexDirection:'row',
  justifyContent: 'center',
  maxHeight:'10%',
},
innerContainer: {
  marginBottom: 10,
  marginTop: 5,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
  flexDirection:'row',
  height: '50%',
  marginHorizontal:40,
},
image: {
  flex: 0.2,
  width: '100%',
  height: '100%',
},
text: {
  fontSize: 25,
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