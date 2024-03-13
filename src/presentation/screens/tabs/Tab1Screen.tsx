import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
export const Tab1Screen = () => {


  return (
    <View>
      <HamburgerMenu/>
        <Text> Tab1 Screen</Text>
    </View>
  )
}