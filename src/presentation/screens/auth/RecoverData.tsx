import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, Linking, StyleSheet, View, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";

import { StackScreenProps } from "@react-navigation/stack";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useEffect, useState } from "react";
import { RootStackParams } from "../../routes/StackNavigator";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IonIcon } from "../../components/shared/IonIcon";


interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }


export const RecoverData = ({ navigation }: Props) => {

  const [linkPixi, setLinkPixi] = useState("");
  const [linkAndesSalud, setLinkAndesSalud] = useState("");

  const { recuperarDatos, setUser, setPass, setUserName, setUserLastName  } = useAuthStore();
/*   const [isConsulting, setIsConsulting] = useState(false); */

  const [isRecovering, setIsRecovering] = useState(false)
  const { top } = useSafeAreaInsets();


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
     const usuarioNombre = respuesta.usuarioNombre
        const usuarioApellido = respuesta.usuarioApellido; 
        setUser(user);
        setPass(pass); 
        setUserName(usuarioNombre);
        setUserLastName(usuarioApellido); 
        console.log('el usuario en recover data es: ', user);
        console.log('el pass en recover data es: ', pass);
        console.log('el usuarioNombre en recover data es: ', usuarioNombre);
        console.log('el usuarioApellido en recover data es: ', usuarioApellido);
        navigation.navigate('UserData')
        setIsRecovering(false);
      } else {
        Alert.alert('Ups!', 'El Dni o Numero de Credencial son incorrectos');
      }
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
    } finally {
      setIsRecovering(false);
    }
  }

  useEffect(() => {
    const openURLAndesSalud = async () =>{
      if(linkAndesSalud){
        try{
          await Linking.openURL(linkAndesSalud)
        } catch (err) {
          console.log('Error al intentar ingresar a Andes Salud:', err);
        } finally {
        
          setLinkAndesSalud('');
        }
      }
    }
    openURLAndesSalud()
  }, [linkAndesSalud])
  
  useEffect(() => {
    
    const openUrlPixi = async () =>{
      if(linkPixi){
        try{
          await Linking.openURL(linkPixi)
        } catch (err) {
          console.log('error al intentar ingresar a whatsapp Pixi:', err);
        } finally {
        
          setLinkPixi('');
        }
      }
    }
   
    openUrlPixi();
  }, [linkPixi]);


  let UrlPixi = `https://api.whatsapp.com/send?phone=542613300622&text=%C2%A1Hola%2C%20Pixi!%20Vengo%20de%20la%20APP%20y%20tengo%20algunas%20consultas.%20%F0%9F%91%8D`
  let UrlAndes = `https://www.andessalud.com.ar/`
  
  const handleOpenURLPixi = () => {
    console.log('entrando a whatsapp Pixi');
    
    setLinkPixi(UrlPixi);
  }
  const handleOpenURLAndes = () => {
    console.log('entrando a Andes Salud');
    
    setLinkAndesSalud(UrlAndes);
  }

  const { height } = useWindowDimensions();

    return (
      <Layout style={{ flex: 1, /* backgroundColor: 'green' */ }}>
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
              placeholder="Número de Credencial"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.numeroAfiliado}
              onChangeText={(numeroAfiliado) => setForm({ ...form, numeroAfiliado })}
              accessoryLeft={<IonIcon name='card-outline' size={25} color="#505050" marginLeft={'2%'} /> }
              
              style={{ marginBottom: 10,}}
            />
        
          </Layout>

          {/* Espacio */}

          <Layout style={{ height: 10 }} />

          {/* Button */}

          <Layout style={{ marginTop: 20 }}>
            <Button
              style={styles.customButton}
              disabled={isRecovering}
              accessoryRight={<MyIcon name="arrow-forward-outline" white isDisabled={isRecovering} />}
              onPress={ recover}
            >
              Recuperar Datos
            </Button>

          </Layout>
          {
        isRecovering ? (

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
          <Layout style={{ height: 30 }} />

          <Layout style={{
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Text style={styles.customText2}>
             El Número de credencial es el que figura en tu tarjeta de Andes Salud
            </Text>
            <Text style={styles.customText2}>
           ¿No encuentras tu Número? Solicítalo con Pixi:
            </Text>
            <Text
              style={styles.customText3}
              status="primary"
              category="s1"
              onPress={handleOpenURLPixi}
            >
              {' '}
              Pixi{' '}
            </Text>
          </Layout>

          <Layout style={{ height: 40 }} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom:10,
          }}>
            <Text>
              ¿Ya tienes una cuenta?
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
              onPress={handleOpenURLAndes}
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
      marginBottom:10,
      textAlign: 'center'
    },
    customText3: {
     color: '#4285F4', 
     fontSize:20,
     fontWeight:'bold',
    },
    icon: {
      alignItems: 'flex-start',
      marginBottom: 0,
      marginLeft:5,
    },

  });