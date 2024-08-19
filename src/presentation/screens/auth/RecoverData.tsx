import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, StyleSheet, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";

import { StackScreenProps } from "@react-navigation/stack";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useState } from "react";
import { RootStackParams } from "../../routes/StackNavigator";


interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }


export const RecoverData = ({ navigation }: Props) => {

  const { recuperarDatos, setUser, setPass  } = useAuthStore();

  const [isRecovering, setIsRecovering] = useState(false)
  const [form, setForm] = useState({
    numeroAfiliado: '',
    idAfiliado: '',
    dni: '',
    email: '',
    password: '',
    fullName: '',
  })

  const recover = async () => {

    if (form.dni.length === 0 || form.numeroAfiliado.length === 0) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }
    setIsRecovering(true);
    try {
      const respuesta = await recuperarDatos(form.numeroAfiliado, form.dni)
      if (respuesta) {
        const user = respuesta.usuarioAfiliado
        const pass = respuesta.passAfiliado;
        setUser(user);
        setPass(pass); 
        console.log('el usuario en recover data es: ', user);
        console.log('el pass en recover data es: ', pass);
        setIsRecovering(false);
        navigation.navigate('UserData')
      } else {
        Alert.alert('Error', 'Dni o Numero de Afiliado son incorrectos');
      }
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
    } finally {
      setIsRecovering(false);
    }
  }


  const { height } = useWindowDimensions();

    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView style={{ marginHorizontal: 40 }}>
          <Layout style={{ paddingTop: height * 0.20 }}>
            <Text category="h1"
              style={{ marginBottom: 20 }}
            > Recuperar Datos</Text>
            <Text category="p1">Por favor, completa los siguientes campos para continuar</Text>

          </Layout>

          {/* Inputs */}

          <Layout style={{ marginTop: 20 }}>
            <Input
              placeholder="DNI"
              value={form.dni}
              onChangeText={(dni) => setForm({ ...form, dni })}
              accessoryLeft={<MyIcon name="person-outline" />}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Numero de Credencial"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.numeroAfiliado}
              onChangeText={(numeroAfiliado) => setForm({ ...form, numeroAfiliado })}
              accessoryLeft={<MyIcon name="email-outline" />}
              style={{ marginBottom: 10 }}
            />
           {/*  <Input
              placeholder="contraseña"
              autoCapitalize="none"
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
              secureTextEntry
              accessoryLeft={<MyIcon name="lock-outline" />}
              style={{ marginBottom: 10 }}
            /> */}
          </Layout>

          {/* Espacio */}

          <Layout style={{ height: 10 }} />

          {/* Button */}

          <Layout style={{ marginTop: 20 }}>
            <Button
              style={styles.customButton}
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={ recover       
              }
            >
              Recuperar Datos
            </Button>

          </Layout>

          {/* informacion para crear cuenta */}
          <Layout style={{ height: 50 }} />

          <Layout style={{
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Text style={styles.customText2}>
             El Numero de credencial es el que figura en tu tarjeta de Andes Salud
            </Text>
            <Text style={styles.customText2}>
           ¿No encuentras tu Numero? Solicitalo con Pixi:
            </Text>
            <Text
              style={styles.customText3}
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('LoginScreen')}
            >
              {' '}
              Pixi{' '}
            </Text>
          </Layout>

          <Layout style={{ height: 40 }} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Text>
              ¿ya tienes una cuenta?
            </Text>
            <Text
              style={styles.customText}
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('LoginScreen')}
            >
              {' '}
              Ingresar{' '}
            </Text>
          </Layout>


          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Text>
              ¿No tienes cuenta? 
              Registrate en 
            </Text>
            <Text
              style={styles.customText}
              status="primary"
              category="s1"
              onPress={() => navigation.goBack()}
            >
              {' '}
              Andes Salud {' '}
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
    customText2: {
     /*  color: '#4285F4', */
      marginBottom:15,
      textAlign: 'center'
    },
    customText3: {
     color: '#4285F4', 
     fontSize:20,
     fontWeight:'bold',
    },
  });