import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { RootStackParams } from '../../routes/StackNavigator';

export const HomeScreen = () => {

const navigation = useNavigation<NavigationProp<RootStackParams>>();


useEffect(() => {
  navigation.setOptions({
    headerLeft: () => {
      <Pressable onPress={ ()=> navigation.dispatch( DrawerActions.toggleDrawer)}>
        <Text>
          Menu
        </Text>
      </Pressable>
    }
  })
}, [])


  return (
    <View style={ globalStyles.container}>
      <Text>Home</Text>

    <PrimaryButton
    onPress={ () => navigation.navigate('Products' )}
    label="Productos"
    />
    <PrimaryButton
    onPress={ () => navigation.navigate('Settings' )}
    label="Settings"
    />
    </View>
  )
}
