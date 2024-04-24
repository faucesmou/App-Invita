import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import CustomHeader from '../../components/CustomHeader'

const tramites = [
  { id: 1, name: 'Autorizar prestación' },
  { id: 2, name: 'Solicitar medicamentos' },
  { id: 3, name: 'Reintegros' },
  { id: 4, name: 'Empadronamientos anticonceptivos' },
  { id: 5, name: 'Mis trámites' },
];


export const TramitesScreen = () => {

 /*  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: globalColors.primary, 
        height: 130,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 28, 
      },
    })
    }, []); */


  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  return (
    <View style={globalStyles.container}>

      <CustomHeader />
      <HamburgerMenu />
      <Text style={{ marginBottom: 20,  marginTop: 10 ,fontSize: 25, textAlign: 'center',}}>Trámites</Text>

      <FlatList
        data={tramites}
        renderItem={({ item }) => (
          <PrimaryButton
            onPress={() => navigation.navigate('Product', { id: item.id, name: item.name })}
            label={item.name}
          />
        )}
      />
      <View
        style={{ marginBottom: 250 }}
      >

        <PrimaryButton
          onPress={() => navigation.navigate('MiOrdenConsulta')}
          label="Orden de consulta"
        />
      </View>

      {/*   <Text style={{ marginBottom: 70, fontSize:25 }}>Mis tramites</Text> */}

      {/*   <PrimaryButton
    onPress={ ()=> navigation.navigate('Settings' as never )}
    label={"Ajustes"}
    /> */}
    </View>
  )
}