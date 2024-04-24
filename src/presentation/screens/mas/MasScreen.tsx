import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import CustomHeader from '../../components/CustomHeader'

const tramites = [
  {id:1, name: 'Mas tramite 1'},
  {id:2, name: 'Mas tramite 2'},
  {id:3, name: 'Mas tramite 3'},
  {id:4, name: 'Mas tramite 4'},
];


export const MasScreen = () => {

  const navigation = useNavigation< NavigationProp < RootStackParams > >()
  return (
    <View style={ globalStyles.container }>
       <CustomHeader />
  
    <Text style={{ marginBottom: 10, fontSize:25 }}>Mas Screen</Text>
    
    <FlatList
    data={ tramites }
    renderItem={ ( {item} )=> (
      <PrimaryButton
      onPress={ ()=> navigation.navigate('Product', { id: item.id, name: item.name} )}
      label={ item.name}
      />
    )}
    />


    <PrimaryButton
    onPress={ ()=> navigation.navigate('Settings' as never )}
    label={"Ajustes"}
    />
  </View>
  )
}