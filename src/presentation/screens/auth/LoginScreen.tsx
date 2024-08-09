import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, StyleSheet, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { StackScreenProps } from "@react-navigation/stack";

import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../routes/StackNavigator";
/* import { API_URL, STAGE } from "@env";
import { useCredentialStore } from "../../store/credentials/useCredentialStore"; */



interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }


export const LoginScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();



  const { loginGonzaMejorado } = useAuthStore();
  /*   const { consultaDatosCredencial } = useCredentialStore(); */

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    dni: '',
  })

  const onLoginGonza = async () => {

   
    if (/* form.email.length === 0 ||*/  form.password.length === 0 || form.dni.length === 0) {
      Alert.alert('Dni y contraseña son obligatorios');
      return;
    }
    setIsPosting(true); 
  
    const salioBien = await loginGonzaMejorado(form.email, form.password, form.dni)
    setIsPosting(false);

    if (salioBien) return;
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
    return;
  }

  /* console.log({ apiUrl: API_URL, stage: STAGE} ) */

  //si no sucede esto:form.dni.length === 0 ni es un login exitoso se muestran las siguientes vistas:-------->

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1"
            style={{ marginBottom: 20 }}
          >Bienvenido a Andes Salud</Text>
          <Text category="h1"
            style={{ marginBottom: 20, fontSize: 20 }}
          > Ingresar </Text>
          <Text category="p2"> Por favor, ingrese su DNI y contraseña para continuar</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>
         {/*  <Input
            placeholder="correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          /> */}
          <Input
            placeholder="DNI"
            autoCapitalize="none"
            value={form.dni}
            onChangeText={(dni) => setForm({ ...form, dni })}
            accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
            style={{ marginBottom: 10 }}
          />
           <Input
            placeholder="contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/*   <Text>{ JSON.stringify(form, null, 2)} </Text> */}

        {/* Espacio: */}

        <Layout style={{ height: 10 }} />

        {/* Button: */}

        <Layout style={{ marginTop: 20 }}>
          <Button
          style={styles.customButton}
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onLoginGonza}
          >
            Ingresar
          </Button>

        </Layout>

        {/* informacion para crear cuenta */}

        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>
            ¿no tienes cuenta?
          </Text>
          <Text 
           style={styles.customText}
          status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}
          /*   onPress={() => { }} */
          >
            {' '}
            Crear cuenta{' '}
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
  }
});

