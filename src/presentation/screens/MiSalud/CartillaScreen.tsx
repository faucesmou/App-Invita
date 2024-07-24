import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { globalColors } from '../../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigator';
import CustomHeader from '../../components/CustomHeader';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { TertiaryButton } from '../../components/shared/TertiaryButton';
import { IonIcon } from '../../components/shared/IonIcon';

export const CartillaScreen = () => {
  console.log('Entrando a Cartilla Screen--------->');
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { top } = useSafeAreaInsets();
  const headerHeight = 120; // Altura del encabezado
  const adjustedHeaderHeight = headerHeight + top 


  return (
    <View
      style={styles.screenContainer}
    >
   

      <View style={[styles.headerContainer, 
        {
          height: adjustedHeaderHeight,
          display: 'flex',
          flexDirection: 'row'
        }
      ]}>

        <View style={{ width: '80%', marginBottom: 10, }}>

          <Text style={{
            fontSize: 35,
            textAlign: 'center',
            marginLeft: '7%',
            color: 'white',
          /*   backgroundColor: 'yellow' */
          
          }} >
            Mi Salud
          </Text>
        </View>

        <View>

        <Pressable onPress={() => {
          console.log('presiono el boton ');
          navigation.navigate('Buzon')
        }}
          style={{ marginLeft: 0, marginBottom: 0 }}
        >
         <IonIcon name='notifications-outline' color={'white'} size={35} /> 
        </Pressable>
        
        </View>
     
      </View>

      <View style={styles.cardContainer} >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Turnos en agenda</Text>
          <Text style={styles.cardSubtitle}>Accedé a todos los centros de atención</Text>
        </View>
      </View>
    
      <View style={styles.bigContentContainer} >
        <View style={styles.emergencyContainer} >
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 30, textAlign: 'center', color: globalColors.orange2, fontWeight: 'bold', marginTop: 0, marginBottom: 10 }} > Urgencias y Emergencias</Text>
            <Text style={styles.emergencySubitle}>En caso de emergencias, comunicate a los siguientes números:</Text>
          </View>
          <View >
            <Text style={styles.emergencyProvincesTitle}> Mendoza</Text>
            <Text style={styles.emergencyProvincesNumbers}> 0810-333-9743</Text>
            <Text style={styles.emergencyProvincesTitle}> San Juan</Text>
            <Text style={styles.emergencyProvincesNumbers}> 264-631-3531</Text>
            <Text style={styles.emergencyProvincesTitle}> San Luis</Text>
            <Text style={styles.emergencyProvincesNumbers}> 265-742-8786</Text>
            <Text style={styles.emergencyProvincesNumbers}> 266-443-5700</Text>
          </View>

        </View>

        <View style={{ marginTop: 20, }}>
         
          <TertiaryButton
            onPress={() => navigation.navigate('Cartillas')}
            label="Cartilla Médica"
            color={globalColors.profile2}
            iconName='heart-outline'
            description='Accedé a todas las cartillas'
          />
          
        </View>
      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  headerContainer: {
    zIndex: 0.25,
    width: '100%',
    backgroundColor: globalColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardContainer: {
    position: 'absolute',
    top: 120, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 0,
    marginBottom: 10,
    borderRadius: 20,
  },
  bigContentContainer: {
    flex: 1,
    marginTop: -25,
    zIndex: 0.5,
    borderRadius: 15,
    backgroundColor: 'white' /* globalColors.white1 */
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
  emergencyContainer: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 30,
    padding: 10,
    borderWidth: 0.3,
    borderColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  emergencySubitle: {
    fontSize: 18,
    marginBottom: 0,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
  },
  emergencyProvincesTitle: {
    color: 'brown',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  emergencyProvincesNumbers: {
    color: globalColors.yellow,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
 
});
