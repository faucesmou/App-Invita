//import { useNavigation } from '@react-navigation/native'; supuestamente esto generaba anidacion( revisar )
import React from 'react'
import { Pressable, Text } from 'react-native';
import { globalStyles } from '../../theme/theme';

interface Props {
    onPress: () => void;
    label?: string;
    id?: any;
}


export const PrimaryButton = ( { onPress, label}: Props) => {

    //const navigation = useNavigation();

  return (
  
    <Pressable
    onPress={ () => onPress() }
    style={ globalStyles.primaryButton }>
      <Text style={ globalStyles.buttonText }>
        {label}
      </Text>
    </Pressable>
  )
}


/* import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {

const navigation = useNavigation();

  return (
    <View style={ globalStyles.container}>
      <Text>Home Screen Perrako</Text>

      <Pressable 
      onPress={ () => navigation.navigate('Products' as never) }
      style={ globalStyles.primaryButton }>
        <Text style={ globalStyles.buttonText }>
          Productos
        </Text>
      </Pressable>
      <Pressable style={ globalStyles.primaryButton }>
        <Text style={ globalStyles.buttonText }>
          Productos
        </Text>
      </Pressable>
      <Pressable style={ globalStyles.primaryButton }>
        <Text style={ globalStyles.buttonText }>
          Productos
        </Text>
      </Pressable>
    </View>
  )
} */