import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../routes/StackNavigator';
import CustomHeader from '../../components/CustomHeader';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';

export const CartillaScreen = () => {
  console.log('Entrando a Cartilla Screen--------->');
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const { top } = useSafeAreaInsets();
  const colorNaranja = globalColors.orange;

  return (
    <View style={{

      flex: 1,
      paddingHorizontal: 20,
      marginTop: 10,
      /*  backgroundColor: 'green' */
    }}>
      <CustomHeader />
      <HamburgerMenu />

      <Pressable
        onPress={() => navigation.navigate('EstudiosMedicos')}
        style={globalStyles.primaryButton}
      >
        <Text
          style={globalStyles.buttonText}
        >
          Consulta Estudios Médicos
        </Text>
      </Pressable>


      <PrimaryButton
        onPress={() => navigation.navigate('CartillaMedicaScreen')}
        label="CartillaMedicaScreen"
        color={globalColors.profile2}
      />
      <View style={{ /* backgroundColor: 'yellow', */ marginTop: 30, marginHorizontal:30,  }}>
        <View style={{ /* backgroundColor: 'green', */ marginBottom: 15 }}>
          <Text style={{ fontSize: 30, textAlign: 'center', color: globalColors.orange2, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }} > Urgencias y Emergencias</Text>
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

      {/* quiero colocarlo aqui */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    /*    flex: 1, */
    padding: 10,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    /*  backgroundColor:'green', */
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Quicksand-Regular',
  },
  subitle: {
    fontSize: 15,
    marginBottom: 5,
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
