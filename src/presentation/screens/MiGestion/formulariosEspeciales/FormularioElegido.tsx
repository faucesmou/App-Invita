
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { View, Text } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { BackButton } from '../../../components/shared/BackButton';
import { globalColors, globalStyles } from '../../../theme/theme';


type FormularioElegidoRouteProp = RouteProp<RootStackParams, 'FormularioElegido'>;

interface Props {
  route: FormularioElegidoRouteProp;
}




export const FormularioElegido = ({ route }) => {



  if (!route) {
    return <Text>Error: Route no esta definido</Text>
  }
  const { url } = route.params;
  const color = globalColors.gray3

  const navigation = useNavigation<NavigationProp<RootStackParams>>()


  return (


    <View
      style={globalStyles.container}
    >
      <CustomHeader color={color} />
      <BackButton />

      <View
        style={{  flex: 1, marginBottom: 30, marginTop: 0  }}>
        {/* <Text style={{ backgroundColor: 'yellow', fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 15 }}>Formulario Elegido</Text> */}
        <WebView   /* style={{ flex: 1, backgroundColor: 'blue', }} */ source={{ uri: url }} />
      </View>
    </View>

  )
}