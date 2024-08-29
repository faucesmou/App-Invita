import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, StyleSheet, View, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { StackScreenProps } from "@react-navigation/stack";

import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../routes/StackNavigator";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useSafeAreaInsets } from "react-native-safe-area-context";




interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }


export const LoginScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();


  const { loginGonzaMejorado, guardarDatosLoginEnContext, loginGonzaMejorado2, } = useAuthStore();
 

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    usuario: '',
    email: '',
    password: '',
    dni: '',
  })

/*   const onLoginGonza = async () => {

   
    if ( form.password.length === 0 || form.usuario.length === 0) {
      Alert.alert('Usuario y contraseña son obligatorios');
      return;
    }
    setIsPosting(true); 
  
    const salioBien = await loginGonzaMejorado( form.usuario, form.password, form.dni)

    const guardarDatosUsuarioEnContext = await guardarDatosLoginEnContext(form.dni)

    if(!guardarDatosUsuarioEnContext){
      console.log('no se pudieron guardar los datos de usuario desde el loginScreen');
      
    }
    setIsPosting(false);

    if (salioBien) return;
    Alert.alert('Ups!', 'Usuario o contraseña incorrectos');
    return;
  } */
  const onLoginGonza2 = async () => {

    if (form.password.length === 0 || form.usuario.length === 0) {
      Alert.alert('Usuario y contraseña son obligatorios');
      return;
    }
  
    setIsPosting(true);
  
    try {
      const loginExitoso = await loginGonzaMejorado2(form.usuario, form.password);
  
      if (loginExitoso) {
      /* const idAfiliadoActual = idAfiliado */
      const { idAfiliado } = useAuthStore.getState(); 

      if (idAfiliado) {
        // Llama a guardarDatosLoginEnContext con el idAfiliado actualizado
        const datosGuardados = await guardarDatosLoginEnContext(idAfiliado);

        if (!datosGuardados) {
          console.error('No se pudieron guardar los datos de usuario desde el LoginScreen');
        }
      } else {
        console.error('idAfiliado no está disponible');
      }

      } else {
        Alert.alert('Ups!', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Layout style={{ flex: 1, /* backgroundColor: 'green', */ }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1"
            style={{ marginBottom: 20 }}
          >Bienvenido a Andes Salud</Text>
          <Text category="h1"
            style={{ marginBottom: 20, fontSize: 20 }}
          > Ingresar </Text>
          <Text category="p2">Por favor, ingrese su Usuario y Contraseña para continuar</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>
      
          <Input
            placeholder="Usuario"
            autoCapitalize="none"
            value={form.usuario}
            onChangeText={(usuario) => setForm({ ...form, usuario })}
            accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
            style={{ marginBottom: 10 }}
          />
           <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>


        {/* Espacio: */}

        <Layout style={{ height: 10 }} />

        {/* Button: */}

        <Layout style={{ marginTop: 20 }}>
          <Button
          style={styles.customButton}
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white isDisabled={isPosting}  />}
            onPress={onLoginGonza2}
          >
            Ingresar
          </Button>

        </Layout>
        {
        isPosting ? (

          <View
            style={{
              flex: 0.5,
              marginTop: top - 25,
              marginBottom: 0,
            }}
          >
            <FullScreenLoader />
          </View>

        )
          :
          <>
          </>
      }

        {/* informacion para crear cuenta */}

        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Text>
            ¿No recuerdas tu Usuario/Contraseña?
            {' '}
          </Text>
          <Text 
           style={styles.customText}
          status="primary"
            category="s1"
            onPress={() => navigation.navigate('RecoverData')}
          >
            {' '}
            Recuperar Datos{' '}
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
    marginTop:10,
  }
});

