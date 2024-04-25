import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native'
import { useProfileStore } from '../../store/profile-store'
import { globalColors, globalStyles } from '../../theme/theme'
import { useCounterStore } from '../../store/counter-store'
import { RootStackParams } from '../../routes/StackNavigator'
import CustomHeader from '../../components/CustomHeader'

export const ProfileScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

const { top } = useSafeAreaInsets();
/* const navigation = useNavigation(); */


/* Si hacemos una desestructuración de name, email y changeProfile tods juntos puede disparar renders innecesarios. Es por eso que hacemos uno a uno así: */

const name = useProfileStore( state => state.name);
const email = useProfileStore( state => state.email);
const changeProfile = useProfileStore( state => state.changeProfile);

const count = useCounterStore( state => state.count);
const increaseBy = useCounterStore( state => state.incrementBy)


/* como incorporara un nombre dinámico en el titulo: */

useEffect(() => {
  navigation.setOptions({
    title: `Profile: ${ count }`
  })


}, [ count ])

/* useEffect(() => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: globalColors.profile, 
      height: 130,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 28, // tamaño del título del header
    },
  });
}, []); */
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
      //paddingHorizontal: 20,
      marginTop:  top ,
      backgroundColor: '#e9f6f8'
    }}>
      <CustomHeader color='orange'  />

        <Text style={{ marginBottom: 5, paddingHorizontal: 5, }}> Profile Screen</Text>
        <Text style={{ marginBottom: 5, paddingHorizontal: 5, }}> { name }</Text>
        <Text style={{ marginBottom: 5, paddingHorizontal: 5, }}> { email } </Text>
        <Text style={{ marginBottom: 5, paddingHorizontal: 5, }}> Productos: { count } </Text>

      <Pressable 
      style ={ globalStyles.secondaryButton }
      onPress={ () => useProfileStore.setState( { name: 'gonza morresi'})}
      >
        <Text
        style ={ globalStyles.buttonText2 }>
          Cambiar Pepe
        </Text>
      </Pressable>

      <Pressable 
      style ={ globalStyles.secondaryButton  }
      onPress={ () => useProfileStore.setState( { email: 'gonza@gmail.com'})}
      >
        <Text
        style ={ globalStyles.buttonText2 }>
          Cambiar email
        </Text>
      </Pressable>

      <Pressable 
      style ={ globalStyles.secondaryButton   }
      onPress={ () => changeProfile( 'Don Damajuana', 'tintosypeñas@gmail.com.com') }
      >
        <Text
        style ={ globalStyles.buttonText2 }>
          Restaurar datos
        </Text>
      </Pressable>
      <Pressable 
      style ={ globalStyles.secondaryButton }

      onPress={ () => changeProfile( 'Don Damajuana', 'tintosypeñas@gmail.com.com') }
      >
        <Text
        style ={ globalStyles.buttonText2 }
        onPress={ () => increaseBy(+1) } 
        >
          Sumar al carrito
        </Text>
      </Pressable>
      <Pressable 
        style ={ globalStyles.secondaryButton }
      >
        <Text
        style ={ globalStyles.buttonText2 }
        onPress={ () => increaseBy(-1) } 
        >
          Restar al carrito
        </Text>
      </Pressable>

        <PrimaryButton
        onPress={ () => navigation.dispatch( DrawerActions.toggleDrawer )}
        label="Abrir menú"
        color='orange' 
        />
        <PrimaryButton
        onPress={ ()=> navigation.navigate('MisDatos')}
        label="MisDatos"
        color='orange' 
        />  
        </View>
        )
      }
      {/*   <PrimaryButton
        onPress={ ()=> navigation.navigate('MisDatos' )}
        label="Mis Datos"
        />   */}