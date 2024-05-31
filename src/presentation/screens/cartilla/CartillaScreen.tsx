import React from 'react'
import { Pressable, Text, View } from 'react-native'
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
        marginTop: 0,
        backgroundColor: 'green'
      /* flex: 1, */
      //paddingHorizontal: 20,
      /* marginTop: 15 *//* top */,
      /* backgroundColor: 'green' *//* '#e9f6f8' */
    }}>
        <CustomHeader />
      <HamburgerMenu />

      <Pressable
        style={globalStyles.primaryButton}
      >
        <Text
          style={globalStyles.buttonText}
        >
          Cartilla Médica boton extra
        </Text>
      </Pressable>

      
      <PrimaryButton
      onPress={ ()=> navigation.navigate('CartillaMedicaScreen')}
      label="CartillaMedicaScreen"
      color={globalColors.profile2}
      /> 
    </View>
  )
}