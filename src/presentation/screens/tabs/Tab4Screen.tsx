import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'

const tramites = [
  {id:1, name: 'Autorizar prestación'},
  {id:2, name: 'Solicitar medicamentos'},
  {id:3, name: 'Reintegros'},
  {id:4, name: 'Empadronamientos anticonceptivos'},
  {id:5, name: 'Mis trámites'},
];


export const Tab4Screen = () => {

  const navigation = useNavigation< NavigationProp < RootStackParams > >()
  return (
    <View style={ globalStyles.container }>
    <Text style={{marginBottom: 5, fontSize:25}}>Trámites</Text>
    
    <FlatList
    data={ tramites }
    renderItem={ ( {item} )=> (
      <PrimaryButton
      onPress={ ()=> navigation.navigate('Product', { id: item.id, name: item.name} )}
      label={ item.name}
      />
    )}
    />

    <Text style={{ marginBottom: 10, fontSize:25 }}>Mis tramites</Text>

    <PrimaryButton
    onPress={ ()=> navigation.navigate('Settings' as never )}
    label={"Ajustes"}
    />
  </View>
  )
}