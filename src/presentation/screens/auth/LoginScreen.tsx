import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { StackScreenProps } from "@react-navigation/stack";

import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../routes/StackNavigator";
import { API_URL, STAGE } from "@env";
import { useCredentialStore } from "../../store/credentials/useCredentialStore";



interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }


export const LoginScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();



  const { login, loginGonza, consultaDatosAfiliado } = useAuthStore();
/*   const { consultaDatosCredencial } = useCredentialStore(); */

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })


  const onLogin = async () => {

    if (form.email.length === 0 || form.password.length === 0) {
      Alert.alert('Error', 'Usuario y contraseña son campos obligatorios');
      return;
    }
    setIsPosting(true);

    const wasSuccessful = await login(form.email, form.password);

    setIsPosting(false);
    if (wasSuccessful) return;
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  }

  const onLoginGonza = async () => {


    if (form.email.length === 0 || form.password.length === 0) {
      Alert.alert('Error', 'Usuario y contraseña son campos obligatorios');
      return;
    }
    setIsPosting(true);
    // aca viene la primera peticion: 
  // TODO esta peticion vamos a tener que cambiarla por la de consultar afiliado JSON, esta solo pide el cuil. adaptar el login para pedir cuil y contraseña, con eso hacer esta peticion. despues ver como hacer las otras peticiones. //
    const salioBien = await loginGonza(form.email, form.password)
    //necesito arreglar la consultaDatosAfiliado para guardar TODOS LOS DATOS: ID, id titular, dni etc.
    let queryIdAfiliado = await consultaDatosAfiliado(form.email, form.password)
    
/*      let queryIdAfiliado = 'EB0F3828-DB84-49CC-AE37-6987C1B750FC' //este es siempre el titular, el endpoint devuelve siempre el id del titular (deberia) no del usuario y contraseña. 
*/
    console.log('esta es la queryIdAfiliado desde LoginScreen', queryIdAfiliado ); 
  //tenes que guardar este queryIdAfiliado de manera global:

  
    
//TODO: Consultar con el idAfiliado, consultar los familiares de ese afiliado y guardar los id de todos. 
//postman workspaces > expendio> obtener datos> Obtener Familiares:

/*  */
//TODO: identificar y guardar cual es el Id DEL Afiliado titular.

//obtener especialidad: necesitamos id afiliado y id afiliado titular
//postman workspaces > expendio> obtener datos> Obtener especialidad.traumatologia. es lo mismo que idPrestacion 

//tenemos que obtener prestadores que ofrecen esta especialidad.

//obtener provincias: ?
// obtener prestador por provincia




/*     const respuestaCredencial = await consultaDatosCredencial(form.email, form.password) */

   setIsPosting(false);
 
    if (salioBien) return;
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
    return;
  }

  /* console.log({ apiUrl: API_URL, stage: STAGE} ) */

  //si no sucede esto:form.email.length === 0 || form.password.length === 0 ni es un login exitoso se muestran las siguientes vistas:

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1"
            style={{ marginBottom: 20 }}
          > Ingresar </Text>
          <Text category="p2"> Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>
          <Input
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
          />
        </Layout>

        {/*   <Text>{ JSON.stringify(form, null, 2)} </Text> */}

        {/* Espacio: */}

        <Layout style={{ height: 10 }} />

        {/* Button: */}

        <Layout style={{ marginTop: 20 }}>
          <Button
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
          <Text status="primary"
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

