import { Layout, Text, Input, Button, Icon } from "@ui-kitten/components"
import { Alert, StyleSheet, useWindowDimensions, TouchableOpacity, Clipboard, Animated, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";

import { StackScreenProps } from "@react-navigation/stack";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useState, useEffect, useRef } from "react";
import { RootStackParams } from "../../routes/StackNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }


export const UserData = ( ) => {

  function capitalizeWords(string:string) {
    return string.replace(/\b\w+/g, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showUser, setShowUser] = useState(false);


  const { getUser, getPass, getUserName, getUserLastName} = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const currentUser = getUser();
  const currentPass = getPass();
  const currentUserName = capitalizeWords(getUserName());
  const currentUserLastName = capitalizeWords(getUserLastName());
  console.log('el currentUser en user data  es: ', currentUser);
  console.log('el currentPass en user data es: ', currentPass);
 console.log('el currentUserName en user data  es: ', currentUserName);
  console.log('el currentUserLastName en user data es: ', currentUserLastName)

  useEffect(() => {
    // Siempre que user o pass cambien, se re-renderiza el componente
    console.log('Usuario actualizado:', currentUser);
    console.log('Contraseña actualizada:', currentUser);
  }, [currentUser, currentPass]);

  const { height } = useWindowDimensions();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleUserVisibility = () => {
    setShowUser(!showUser);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 50}}>
        <Layout style={{ paddingTop: height * 0.20, /* alignItems:'center'  */ }}>
          
          <Text category="h1"
            style={styles.title}
          > Tus Datos </Text>
          <Text 
            style={styles.text}
          >Hola {currentUserName}{' '}{currentUserLastName}! </Text>
          <Text 
            style={styles.text2}
          >A continuacion puedes acceder a tus datos de Usuario:</Text>
  
    <View style={{ alignItems:'center' }} >

          <View style={styles.userContainer}>
            <Text style={styles.passwordText}>
              Usuario:{' '} 
              {showUser ? currentUser : '******'}
            </Text>
            <Icon
              style={styles.passwordIcon}
              name={showUser ? 'eye-off' : 'eye'}
              fill="#8F9BB3"
              onPress={toggleUserVisibility}
            />
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordText}>
              Contraseña:{' '}
              {showPassword ? currentPass : '******'}
            </Text>
            <Icon
              style={styles.passwordIcon}
              name={showPassword ? 'eye-off' : 'eye'}
              fill="#8F9BB3"
              onPress={togglePasswordVisibility}
            />
          </View>


    </View>
      
        </Layout>

      
  

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
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0,
      
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      /* backgroundColor: 'green' */
    },
    passwordText: {
    fontSize: 17, 
     flex: 0.8 // Ocupa todo el espacio disponible menos el icono
    },
    passwordIcon: {
      width: '35%', 
      height: '35%',
      aspectRatio: 1, // Mantiene una proporción cuadrada
    },
    text: {
      fontSize: 16,
      marginTop:15,
      textAlign: 'left'
    },
    text2: {
      fontSize: 16,
      textAlign: 'left'
    /*   marginTop:10, */
    },
    title: {
      fontSize: 30, // Ajusta el tamaño según tus preferencias
      textAlign: 'center',
    },
  });