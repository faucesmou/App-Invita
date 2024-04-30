import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { StackScreenProps } from "@react-navigation/stack";

import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../routes/StackNavigator";
import { API_URL, STAGE } from "@env";


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }


export const LoginScreen = ({ navigation }: Props) => {
  
  const { height } = useWindowDimensions();


  
  const { login } = useAuthStore();

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

  /* console.log({ apiUrl: API_URL, stage: STAGE} ) */

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

        {/* Espacio */}

        <Layout style={{ height: 10 }} />

        {/* Button */}

        <Layout style={{ marginTop: 20 }}>
          <Button
           disabled={ isPosting }
          accessoryRight={<MyIcon name="arrow-forward-outline" white />} 
          onPress={onLogin} 
         /*  onPress={()=>{}} */
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

