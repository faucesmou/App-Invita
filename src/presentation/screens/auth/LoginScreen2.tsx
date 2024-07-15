import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { Alert, useWindowDimensions, Modal, View, StyleSheet  } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MyIcon } from "../../components/ui/MyIcon";
import { RootStackParams } from "../../routes/StackNavigator";
import { RNCamera } from 'react-native-camera';
/* import AsyncStorage from '@react-native-async-storage/async-storage';  */
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


interface Props extends StackScreenProps<RootStackParams, 'LoginGonzalo'> { }


export const LoginScreen2 = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();

  const { loginGonzaMejorado } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    dni: '',
  })

  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const onLoginGonza = async () => {

   
    if ( form.dni.length === 0) {
      Alert.alert('Error', 'Dni es campo obligatorio');
      return;
    }
    setIsPosting(true); 
  
    const salioBien = await loginGonzaMejorado(form.email, form.password, form.dni)
    setIsPosting(false);

    if (salioBien) return;
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
    return;
  }

/* primera funcion para integrar el escaneo  */
const onBarCodeRead = async (e: any) => {
  const qrData = e.data; // Datos del QR escaneado
  const { identifier, dni } = extractDataFromQR(qrData); // Función que extrae datos del QR

  if (identifier && dni) {
    const isValid = await validateDNI(dni); // Función que valida el DNI en tu sistema
    if (isValid) {
   /*    await AsyncStorage.setItem('userToken', identifier); */
      setForm({ ...form, dni });
      setIsScannerVisible(false);
    } else {
      Alert.alert('Invalid DNI', 'The DNI is not registered in the system.');
    }
  } else {
    Alert.alert('Invalid QR', 'The QR code does not contain valid data.');
  }
};

/* Segunda funcion para escaneo */

const extractDataFromQR = (qrData: string) => {
  try {
    const parsedData = JSON.parse(qrData);
    return { identifier: parsedData.id, dni: parsedData.dni };
  } catch (error) {
    console.error('Error parsing QR data', error);
    return {};
  }
};

/* Tercer funcion para escaneo: */

const validateDNI = async (dni: string) => {
  /* try {
    const response = await fetch(`https://your-system-api.com/validateDNI?dni=${dni}`);
    const result = await response.json();
    return result.isValid;
  } catch (error) {
    console.error(error);
    return false;
  } */
  setIsPosting(true); 
  
  const salioBien = await loginGonzaMejorado(form.email, form.password, dni)
  setIsPosting(false);

  if (salioBien) return;
  Alert.alert('Error', 'Usuario o contraseña incorrectos');
  return;
};

  

  //si no sucede esto:form.dni.length === 0 ni es un login exitoso se muestran las siguientes vistas:-------->

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1"
            style={{ marginBottom: 20 }}
          >Bienvenido a Andes Salud Login2</Text>
          <Text category="h1"
            style={{ marginBottom: 20, fontSize: 20 }}
          > Ingresar </Text>
          <Text category="p2"> Por favor, ingrese su DNI para continuar</Text>
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
        </Layout>

        {/*   <Text>{ JSON.stringify(form, null, 2)} </Text> */}

        {/* Espacio: */}

        <Layout style={{ height: 10 }} />

        {/* Button: */}

        <Layout style={{ marginTop: 20, marginHorizontal:30, /* maxHeight:35, */ marginBottom:10 }}>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onLoginGonza}
            style={{ marginTop: 0, maxHeight:40 }}
          >
            Ingresar
          </Button>
          <Button
            style={{ marginTop: 10 }}
            onPress={() => setIsScannerVisible(true)}
          >
            Ingresar con escaneo de DNI
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

      {/* Modal para abrir la camara y escanear: */}
      {isScannerVisible && (
        <Modal
          visible={isScannerVisible}
          transparent={false}
          animationType="slide"
        >
          <RNCamera
            style={{ flex: 1 }}
            onBarCodeRead={onBarCodeRead}
            captureAudio={false}
          >
            <View style={styles.overlay}>
              <Text style={styles.centerText}>Escanea el código QR de tu DNI</Text>
              <Button onPress={() => setIsScannerVisible(false)}>Cancelar</Button>
            </View>
          </RNCamera>
        </Modal>
      )}

    </Layout>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#fff',
  },
});