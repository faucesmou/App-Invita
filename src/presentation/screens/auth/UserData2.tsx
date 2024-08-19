import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, StyleSheet, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";

import { StackScreenProps } from "@react-navigation/stack";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useState } from "react";
import { RootStackParams } from "../../routes/StackNavigator";


interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }


export const UserData = ({ navigation }: Props) => {

  const { getUser, getPass } = useAuthStore();

  const currentUser = getUser();
  const currentPass = getPass();

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1"
            style={{ marginBottom: 20 }}
          > Tus Datos</Text>
          <Text category="p1">Estos son tus datos:</Text>

        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>
          {/*      <Text category="p1">Usuario: { currentUser }</Text>
          <Text category="p1">Contraseña: { currentPass }</Text> */}


        </Layout>

        {/* Espacio */}

        <Layout style={{ height: 10 }} />


        {/* informacion para crear cuenta */}
        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>
            ¿Deseas iniciar sesión?
          </Text>
          <Text
            style={styles.customText}
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('LoginScreen')}
          >
            {' '}
            Iniciar sesión{' '}
          </Text>
        </Layout>

      </ScrollView>

    </Layout>
  )

}

  const styles = StyleSheet.create({
    customButton: {
      backgroundColor: '#4285F4',
      borderRadius: 10,
      margin: 10,
      padding: 15,
    },
    customText: {
      color: '#4285F4',
    },
  });