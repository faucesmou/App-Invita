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
import { BoxShadow } from 'react-native-shadow';
export const CartillaScreen = () => {
  console.log('Entrando a Cartilla Screen--------->');
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { top } = useSafeAreaInsets();
  const colorNaranja = globalColors.orange;

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
    <View style={{

      flex: 1,
      paddingHorizontal: 20,
      marginTop: 10,
      /*  backgroundColor: 'green' */
    }}>
      <CustomHeader color={globalColors.gray}  />
      <HamburgerMenu />

     {/*  <BoxShadow  
    
      >
       
       </BoxShadow> */}
       <Text style={{
          fontSize:25,
          textAlign: 'center',
        }} >
          Contenido complementario
        </Text>

   

      <View style={ styles.container} >
        <View style={{ /* backgroundColor: 'green', */ marginBottom: 15 }}>
          <Text style={{ fontSize: 30, textAlign: 'center', color: globalColors.orange2, fontWeight: 'bold', marginTop: 0, marginBottom: 10 }} > Urgencias y Emergencias</Text>
          <Text style={styles.subitle}>En caso de emergencias, comunicate a los siguientes números:</Text>
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
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 30,
    padding: 10,
    borderWidth: 0.3,
    borderRadius: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Quicksand-Regular',
  },
  subitle: {
    fontSize: 18,
    marginBottom: 0,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    /*  marginHorizontal:10, */
  },
  /*   },
    image: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },
    successMessage: {
      color: 'green',
      marginTop: 20,
    }, */
  /*   errorMessage: {
      color: 'red',
      marginTop: 20,
    },
    imageContainer: {
      marginBottom: 20,
    },
    removeButton: {
      backgroundColor: '#ee5a3d',
      padding: 5,
      borderRadius: 5,
      marginHorizontal:120,
      marginTop:5,
    },
    removeButtonText: {
      color: 'white',
      textAlign: 'center',
    }, */
});
