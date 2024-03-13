import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
//import Icon from 'react-native-vector-icons/Ionicons';
import { IonIcon } from '../../components/shared/IonIcon';




export const Tab1Screen = () => {


  const navigator = useNavigation();

useEffect(() => {
navigator.setOptions({
  headerShown: false,
})

}, [])

  return (
    <View>
      
      <HamburgerMenu/>
        <Text> Tab1 Screen</Text>
        <IonIcon name= 'rocket-outline' color='red'/>
        {/* <Text><Icon name="rocket-outline" size={30} color="#900" /></Text> */}
        {/* <Icon name="rocket-outline" size={30} color="#900" />; */}
    </View>
    
  )
}