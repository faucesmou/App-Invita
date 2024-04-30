import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AboutScreen = () => {

  const { top } = useSafeAreaInsets();

  return (
    <View style={{
      flex: 1,
      //paddingHorizontal: 20,
      marginTop:  top ,
      backgroundColor: '#e9f6f8'
    }}>
           
      <Pressable 
      style ={ globalStyles.primaryButton }
      >
        <Text
        style ={ globalStyles.buttonText }
        >
          Mas información 
        </Text>
      </Pressable>
        </View>
        )
      }