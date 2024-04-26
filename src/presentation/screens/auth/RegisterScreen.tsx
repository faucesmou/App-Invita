import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert,useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";

import { StackScreenProps } from "@react-navigation/stack";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useState } from "react";
import { RootStackParams } from "../../routes/StackNavigator";

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}


export const RegisterScreen = ( { navigation }: Props ) => {

  const { registerUser } = useAuthStore();

  const [isRegistering, setIsRegistering] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName:'',
  })

  const onRegister = async () => {

   /*  if (form.email.length === 0 || form.password.length === 0 || form.fullName.length === 0) {
      return;
    } */
    setIsRegistering(true);
    try {
     await registerUser(form.email, form.password, form.fullName);
     setIsRegistering(false);
     Alert.alert('Éxito', 'Cuenta creada exitosamente');
  } catch (error) {
    Alert.alert('Error', 'Usuario, contraseña o fullName incorrectos');
}}

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1"
          style={{ marginBottom: 20 }}
          > Crear Cuenta </Text>
          <Text category="p2"> Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre completo"
            value={form.fullName}
            onChangeText={(fullName) => setForm({ ...form, fullName })}
            accessoryLeft={ <MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={ <MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
           <Input
            placeholder="contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry
            accessoryLeft={ <MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Espacio */}

        <Layout style={{ height: 10 }} />

        {/* Button */}

        <Layout style={{ marginTop: 20 }}>
          <Button
          accessoryRight={ <MyIcon name="arrow-forward-outline" white /> }
            onPress={onRegister}
          >
            Crear cuenta
          </Button>

        </Layout>

        {/* informacion para crear cuenta */}
        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection:'row',
          justifyContent:'center'
        }}>
          <Text>
            ¿ya tienes una cuenta?
          </Text>
          <Text status="primary"
           category="s1"
           onPress={()=> navigation.goBack()}
           >
            {' '}
            Ingresar{' '}
          </Text>
        </Layout>

      </ScrollView>

    </Layout>
  )

}