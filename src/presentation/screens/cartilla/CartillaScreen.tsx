import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigator';
import CustomHeader from '../../components/CustomHeader';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { SecondaryButton } from '../../components/shared/SecondaryButton';
import { TertiaryButton } from '../../components/shared/TertiaryButton';

export const CartillaScreen = () => {
  console.log('Entrando a Cartilla Screen--------->');
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const colorNaranja = globalColors.orange;

  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = 120; // Altura inicial del encabezado
  const adjustedHeaderHeight = headerHeight + top // Ajusta la altura para tener en cuenta los márgenes seguros
  /* const shadowOpt = {
    width: 350,
    height: 200,
    color: "#000",
    border: 8,
    radius: 3,
    opacity: 0.2,
    x: -5,
    y: 20,
    style: { marginVertical: 5 }
  }; */

  return (
    <View
      style={styles.screenContainer}
    /* style={{

      flex: 1,
      paddingHorizontal: 20,
      marginTop: 10,
    }} */
    >
      {/*     <CustomHeader color={globalColors.gray}  /> */}
      <HamburgerMenu />

      <View style={[styles.headerContainer, { height: adjustedHeaderHeight }]}>

        <View style={{ width: '80%' }}>

          <Text style={{
            fontSize: 30,
            textAlign: 'center',
            color: 'white'
          }} >
            Mi Salud
          </Text>
        </View>
        <CustomHeader color={globalColors.gray} />
        <View style={{ position: 'absolute', zIndex: 2, left: 0, width: '100%' }}>
          <HamburgerMenu />
        </View>
      </View>

      <View  style={styles.cardContainer} >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Turnos en agenda</Text>
          <Text style={styles.cardSubtitle}>Accedé a todos los centros de atención</Text>
        </View>
      </View>

      <Text style={{
        fontSize: 25,
        textAlign: 'center',
      }} >
        Contenido complementario
      </Text>



      <View style={styles.emergencyContainer} >
        <View style={{ /* backgroundColor: 'green', */ marginBottom: 15 }}>
          <Text style={{ fontSize: 30, textAlign: 'center', color: globalColors.orange2, fontWeight: 'bold', marginTop: 0, marginBottom: 10 }} > Urgencias y Emergencias</Text>
          <Text style={styles.emergencySubitle}>En caso de emergencias, comunicate a los siguientes números:</Text>
        </View>
        <View  /* style={{ justifyContent: 'center'}} */ >
          <Text style={{ color: 'brown', fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}> Mendoza</Text>
          <Text style={{ color: globalColors.yellow, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> 0810-333-9743</Text>
          <Text style={{ color: 'brown', fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}> San Juan</Text>
          <Text style={{ color: globalColors.yellow, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> 264-631-3531</Text>
          <Text style={{ color: 'brown', fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}> San Luis</Text>
          <Text style={{ color: globalColors.yellow, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> 265-742-8786</Text>
          <Text style={{ color: globalColors.yellow, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> 266-443-5700</Text>
        </View>

      </View>

      <View style={{  /* backgroundColor: 'yellow', */  marginTop: 20, }}>
        <TertiaryButton
          onPress={() => navigation.navigate('EstudiosMedicos')}
          label="Estudios Médicos"
          color={globalColors.profile2}
          iconName='medkit-outline'
          description='Gestioná la orden de tus estudios'
        />
        <TertiaryButton
          onPress={() => navigation.navigate('CartillaMedicaScreen')}
          label="Cartilla Médica"
          color={globalColors.profile2}
          iconName='heart-outline'
          description='Accedé a todas las cartillas'
        />
      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  emergencyContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    marginHorizontal: 30,
    padding: 10,
    borderWidth: 0.3,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  emergencySubitle: {
    fontSize: 18,
    marginBottom: 0,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
  },
  /* cambio del header custom header e integracion con la vista:  */

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
    top: 120, // Ajusta este valor según sea necesario revisar si lo podemos dejar dinamico y proporcional al headerContainer 
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
  imageContainer: {
    marginBottom: 20,
    marginTop: 35,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    marginBottom: 10,
    marginTop: 55,
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
