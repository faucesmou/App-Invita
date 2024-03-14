import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useProfileStore } from '../../store/profile-store'
import { globalColors, globalStyles } from '../../theme/theme'
import { useCounterStore } from '../../store/counter-store'

export const ProfileScreen = () => {


const { top } = useSafeAreaInsets();
const navigation = useNavigation();


/* Si hacemos una desestructuración de name, email y changeProfile tods juntos puede disparar renders innecesarios. Es por eso que hacemos uno a uno así: */

const name = useProfileStore( state => state.name);
const email = useProfileStore( state => state.email);
const changeProfile = useProfileStore( state => state.changeProfile);

const count = useCounterStore( state => state.count);
const increaseBy = useCounterStore( state => state.incrementBy)


/* como incorporara un nombre dinámico en el titulo: */

useEffect(() => {
  navigation.setOptions({
    title: `Profile + contador: ${ count }`
  })


}, [ count ])


/* function Counter() {
  const { count, incrementBy } = useCounterStore()
  return (
    <Text style={{ marginBottom: 5 }}> 
    { count }
     </Text>
  )
} */


  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top + 20,
    }}>
        <Text style={{ marginBottom: 5 }}> Profile Screen</Text>
        <Text style={{ marginBottom: 5 }}> { name }</Text>
        <Text style={{ marginBottom: 5 }}> { email } </Text>
        <Text style={{ marginBottom: 5 }}> Contador: { count } </Text>

      <Pressable 
      style ={ globalStyles.primaryButton }
      onPress={ () => useProfileStore.setState( { name: 'gonza morresi'})}
      >
        <Text
        style ={ globalStyles.buttonText }>
          Cambiar nombre
        </Text>
      </Pressable>

      <Pressable 
      style ={ globalStyles.primaryButton }
      onPress={ () => useProfileStore.setState( { email: 'gonza@gmail.com'})}
      >
        <Text
        style ={ globalStyles.buttonText }>
          Cambiar email
        </Text>
      </Pressable>

      <Pressable 
      style ={ globalStyles.primaryButton }
      onPress={ () => changeProfile( 'Don Damajuana', 'tintosypeñas@gmail.com.com') }
      >
        <Text
        style ={ globalStyles.buttonText }>
          Restaurar datos
        </Text>
      </Pressable>
      <Pressable 
      style ={ { ...globalStyles.primaryButton, backgroundColor: 'red' }}

      onPress={ () => changeProfile( 'Don Damajuana', 'tintosypeñas@gmail.com.com') }
      >
        <Text
        style ={ globalStyles.buttonText }
        onPress={ () => increaseBy(+1) } 
        >
          Incrementar
        </Text>
      </Pressable>
      <Pressable 
        style ={ { ...globalStyles.primaryButton, backgroundColor: 'blue' }}
         
      >
        <Text
        style ={ globalStyles.buttonText }
        onPress={ () => increaseBy(-1) } 
        >
          Decrementar
        </Text>
      </Pressable>


        <PrimaryButton
        onPress={ () => navigation.dispatch( DrawerActions.toggleDrawer )}
        label="Abrir menú"
        />
    </View>
  )
}