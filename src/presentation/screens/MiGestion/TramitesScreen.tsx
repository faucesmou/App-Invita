import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import CustomHeader from '../../components/CustomHeader'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { TertiaryButton } from '../../components/shared/TertiaryButton'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SecondaryButton } from '../../components/shared/SecondaryButton'

export const TramitesScreen = () => {
  console.log('Entrando a TramitesScreen (Mi Gestion)')

  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = 120; // Altura inicial del encabezado
  const adjustedHeaderHeight = headerHeight + top // Ajusta la altura para tener en cuenta los márgenes seguros


  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View style={styles.screenContainer}
    >

      <View style={[styles.headerContainer, { height: adjustedHeaderHeight }]}>

        <View style={{ width: '80%', marginBottom: 10  }}>

          <Text style={{
            fontSize: 35,
            textAlign: 'center',
            color: 'white'
          }} >
            Mi Gestión
          </Text>
        </View>
        <CustomHeader color={globalColors.gray} />
       {/*  <View style={{ position: 'absolute', zIndex: 2, left: 0, width: '100%' }}>
          <HamburgerMenu />
        </View> */}
      </View>


      <View style={styles.cardContainer} >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Turnos en agenda</Text>
          <Text style={styles.cardSubtitle}>Contactá con nuestros asesores</Text>
        </View>
      </View>
      <View style={styles.bigContentContainer} >


          <View style={styles.buttonsContainer} /* style={{ backgroundColor: 'yellow',  marginTop: 40 }} */
            >

          <TertiaryButton
            onPress={() => navigation.navigate('Consulta')}
            label="Solicitar orden de consulta"
            color={globalColors.profile2}
            iconName='people-outline'
            description='Gestioná la orden de tus estudios'
          />{/* <ion-icon name="people-outline"></ion-icon> */}
          <TertiaryButton
            onPress={() => navigation.navigate('Formularios')}
            label="Obtener Formularios Especiales"
            color={globalColors.profile2}
            iconName='document-text-outline'
            description='Descargá tus formularios'
          />

          <TertiaryButton
            onPress={() => navigation.navigate('Pagos')}
            label="Mis Pagos"
            color={globalColors.profile2}
            iconName='file-tray-full-outline'
            description='Accedé al estado de tus pagos'
          />
            
        </View>
      
      <View>

        <View style={styles.imageContainer}>

          <View
            style={styles.innerContainer}
          >
            <Text style={{
              fontSize: 25,
              textAlign: 'center',
            }} >
              Andes Salud
            </Text>

            <Image source={require('../../assets/images/logogris.png')}
              style={styles.image}
              resizeMode="contain" // Ajusta la imagen manteniendo su relación de aspecto
            />
          </View>
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
  /*   backgroundColor: 'violet', */
    zIndex: 0.5,
  },
  headerContainer: {
    zIndex: 0.25, 
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 0,
    marginBottom: 10,
    /*     backgroundColor:'violet', */
    borderRadius: 20,
  },
  bigContentContainer: {
    flex: 1,
    marginTop: -25,
    zIndex: 0.5,
    borderRadius: 15,
    backgroundColor: globalColors.white2
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
    borderColor: 'white',
   
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
    zIndex: 1.5,
    marginTop: 70,
    borderRadius: 15,
/*     backgroundColor: 'yellow' */
  },
  imageContainer: {
    marginBottom: 30,
    marginHorizontal:35,
    marginTop: 40,
    zIndex: 1.5,
    alignItems: 'center',
     justifyContent: 'center', 
    minHeight:'40%',
    minWidth: '50%'
  },
  innerContainer: {
    marginBottom: 15,
    marginTop: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 10,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
});

/*  useEffect(() => {
   navigation.setOptions({
     headerStyle: {
       backgroundColor: globalColors.primary, 
       height: 130,
     },
     headerTintColor: 'white',
     headerTitleStyle: {
       fontSize: 28, 
     },
   })
   }, []); */


/*
let idAfiliadoUsuario = idAfiliado;
if(idAfiliadoUsuario !== undefined){
  const idsFamiliares = ObtenerFamiliares(idAfiliadoUsuario)
  console.log('estos son los idsFamiliares desde el effect de TramitesScreen', idsFamiliares); 
}
else {
  console.error('idAfiliado es undefined. No se puede llamar a ObtenerFamiliares.');
}

} )*/