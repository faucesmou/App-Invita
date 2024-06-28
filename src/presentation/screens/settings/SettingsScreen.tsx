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
import { MisDatosScreen } from '../profile/MisDatosScreen'
import { useAuthStore } from '../../store/auth/useAuthStore'

export const SettingsScreen = () => {
  const { logout } = useAuthStore()
  const { top } = useSafeAreaInsets()

 const navigator =useNavigation(); 
const navigation = useNavigation<NavigationProp<RootStackParams>>()
const colorNaranja = globalColors.orange
  return (
    <View 
    style={ {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 20 ,
/*       backgroundColor: 'green' */
    }}
    >
      <CustomHeader  color={globalColors.gray3}  />
       <BackButton /> 
     {/*    <Text style={{marginBottom: 10}}> Settings Screen</Text> */}


        <MisDatosScreen/>

         <TertiaryButton
           onPress={()=> navigator.goBack() }
          label="Regresar"
          color={globalColors.profile2}
          iconName='medkit-outline'
      /*     description='Gestioná la orden de tus estudios' */
        />

         <TertiaryButton
          onPress={logout}
          label="Cerrar Sesión"
          color={globalColors.profile2}
          iconName='power-outline' 
          /*  iconName='caret-forward-circle-outline' */
         /*  iconName='log-out-outline' */
      /*     description='Gestioná la orden de tus estudios' */
        />

    </View>
  )
}