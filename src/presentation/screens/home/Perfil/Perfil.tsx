import React from 'react'
import { Text, View } from 'react-native'
import { StackActions, type NavigationProp, useNavigation} from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../../store/auth/useAuthStore'
import { RootStackParams } from '../../../routes/StackNavigator'
import { globalColors } from '../../../theme/theme'
import CustomHeader from '../../../components/CustomHeader'
import { BackButton } from '../../../components/shared/BackButton'
import { MisDatosScreen } from '../../profile/MisDatosScreen'
import { TertiaryButton } from '../../../components/shared/TertiaryButton'


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
      <CustomHeader  color={globalColors.black}  />
       <BackButton /> 
     {/*    <Text style={{marginBottom: 10}}> Settings Screen</Text> */}


        <MisDatosScreen/>

         <TertiaryButton
           onPress={()=> navigation.navigate('Buzon') }
          label="Buzón de Avisos"
          color={globalColors.profile2}
          iconName='mail-unread-outline'
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

      <TertiaryButton
        onPress={() => navigator.goBack()}
        label="Regresar"
        color={globalColors.profile2}
        iconName='medkit-outline'
      /*     description='Gestioná la orden de tus estudios' */
      />
    </View>
  )
}