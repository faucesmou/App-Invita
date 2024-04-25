import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackButton } from '../../components/shared/BackButton'
import CustomHeader from '../../components/CustomHeader'

export const SettingsScreen = () => {

  const { top } = useSafeAreaInsets()

const navigator =useNavigation();

  return (
    <View 
    style={ {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top ,
      backgroundColor: '#e9f6f8'
    }}
    >
      <CustomHeader color='orange'  />
       <BackButton /> 
        <Text style={{marginBottom: 10}}> Settings Screen</Text>

        <PrimaryButton
        label="Regresar"
        onPress={()=> navigator.goBack() }
        color='orange' 
        />
        <PrimaryButton
        label="Regresar al Home"
        onPress={()=> navigator.dispatch( StackActions.popToTop ) }
        color='orange' 
        />
    </View>
  )
}