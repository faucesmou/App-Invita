import React from 'react'
import { Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { StackActions, type NavigationProp, useNavigation} from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackButton } from '../../components/shared/BackButton'
import CustomHeader from '../../components/CustomHeader'
import { TertiaryButton } from '../../components/shared/TertiaryButton'
import { RootStackParams } from '../../routes/StackNavigator'

export const SettingsScreen = () => {

  const { top } = useSafeAreaInsets()

 const navigator =useNavigation(); 
const navigation = useNavigation<NavigationProp<RootStackParams>>()
const colorNaranja = globalColors.orange
  return (
    <View 
    style={ {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top ,
      backgroundColor: '#e9f6f8'
    }}
    >
      <CustomHeader  color={globalColors.gray2}  />
       <BackButton /> 
        <Text style={{marginBottom: 10}}> Settings Screen</Text>

         <TertiaryButton
           onPress={()=> navigator.goBack() }
          label="Regresar"
          color={globalColors.profile2}
          iconName='medkit-outline'
      /*     description='Gestioná la orden de tus estudios' */
        />

         <TertiaryButton
          onPress={()=> navigator.dispatch( StackActions.popToTop ) }
          label="Regresar al Home"
          color={globalColors.profile2}
          iconName='medkit-outline'
      /*     description='Gestioná la orden de tus estudios' */
        />
    </View>
  )
}