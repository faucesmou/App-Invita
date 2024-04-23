import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { RootStackParams } from '../../routes/StackNavigator';
import { useProfileStore } from '../../store/profile-store';
import { useCounterStore } from '../../store/counter-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

const navigation = useNavigation<NavigationProp<RootStackParams>>();

/* usando el State del Profile Store:  */
const name = useProfileStore( state => state.name);
const email = useProfileStore( state => state.email);

const count = useCounterStore( state => state.count);
/* useEffect(() => {
  navigation.setOptions({
    headerLeft: () => {
      <Pressable onPress={ ()=> navigation.dispatch( DrawerActions.toggleDrawer)}>
        <Text>
          Menu
        </Text>
      </Pressable>
    }
  })
}, []) */


  return (
    <View style={globalStyles.container}>
   {/*  <View style={ {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: top ,
      backgroundColor: '#e9f6f8'
    }}> */}
 
    <PrimaryButton
    onPress={ () => navigation.navigate('Products2')}
    label="Productos"
    />
    <PrimaryButton
    onPress={ () => navigation.navigate('Settings' )}
    label="Settings"
    />
    <PrimaryButton
    onPress={ () => navigation.navigate('Settings' )}
    label="Credencial"
    />
   
        <PrimaryButton
        onPress={ () => navigation.dispatch( DrawerActions.toggleDrawer )}
        label="Abrir menú"
        />
        <Text style={{ marginBottom: 5, marginTop:15 }}> { name }</Text>
        <Text style={{ marginBottom: 15 }}> { email } </Text>
        <Text style={{ marginBottom: 5 }}> Productos: { count } </Text>
    
    </View>
  )
}
