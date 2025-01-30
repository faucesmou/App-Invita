import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Linking, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import NotiComponent3 from '../../components/shared/NotiComponent3';
import NotiMensajes from '../../components/shared/Noti-mensajes';
import { useNotificationStore } from '../../store/notification-store';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { RootStackParams } from '../../routes/StackNavigator';

import { globalColors } from '../../theme/theme';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { IonIcon } from '../../components/shared/IonIcon';
import CredencialNew from '../../components/shared/CredencialNew';
import { loadAuthData } from '../../store/auth/authService';
import LinearGradient from 'react-native-linear-gradient';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Props {
  onPress: () => void;
  label?: string;
  id?: any;
  color?: string;
  disabled?: boolean;
  iconName?: string;
  description?: string;
  textOverflow?: string;
  textSize?: any;
  descriptionSize?: any;
}


export const HomeScreenUxNew = () => {
  const { setShouldUpdateNotifications, getUserName } = useAuthStore();
  const setAuthData = useAuthStore((state) => state.setAuthData);


  const {  UserName, } = useAuthStore();

  const [currentUserName, setCurrentUserName] = useState<string | null>(null)
  const [mostrarActualizacion, setMostrarActualizacion] = useState(false);


  function capitalizeWords(string:string) {
    return string.replace(/\b\w+/g, function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  }
/* 62305471666/0000 

JhonDoe09
*/

  /* Esta función y useEffect es fundamental--> */

  useEffect(() => {
    const fetchAuthData = async () => {
      const data = await loadAuthData();
      if (data) {
        setAuthData(data);
        console.log('Datos de autenticación cargados en el contexto desde AsyncStorage:', data);
      }
    };
    fetchAuthData();
  }, []);

/*   const currentUserNameInicial = getUserName();
  const currentUserName = capitalizeWords(currentUserNameInicial);
  console.log('currentUserName es: ', currentUserName); */


  useEffect(() => {
    
      const currentUserNameInicial = getUserName(); // Obtención síncrona del nombre
      if (currentUserNameInicial) {
        const capitalizedUserName = capitalizeWords(currentUserNameInicial);
        setCurrentUserName(capitalizedUserName); // Actualiza el estado
      } else {
        console.log('No se encontró el nombre de usuario');
      }
   
  }, [UserName])
  
  useEffect(() => {
    setShouldUpdateNotifications(true);
  }, []);

  const setMedicalNotifications = useNotificationStore((state) => state.setMedicalNotifications);
  const setOrderNotifications = useNotificationStore((state) => state.setOrderNotifications);

  const [ordenConsulta, setOrdenConsulta] = useState("");
  let Url = `https://api.whatsapp.com/send?phone=542613300622&text=%C2%A1Hola%2C%20Pixi!%20Vengo%20de%20la%20APP%20y%20tengo%20algunas%20consultas.%20%F0%9F%91%8D`;

  const handleOpenURL = () => {
    setOrdenConsulta(Url);
  };

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  let headerHeight = hp('17%'); // Ajusta el tamaño de la cabecera según el alto de la pantalla

  if (height < 407) { // Pantallas más pequeñas como iPhone SE o iPhone 8
    headerHeight = hp('5%'); // Ajuste para pantallas más pequeñas
  }

  let buttonTextFontSize = wp('5%');
  let buttonDescriptionFontSize = wp('4.5%');

  let buttonsTitleFontSize = wp('3.7%');
  let DescriptionFontSize = wp('2.8%');

  let cardTitleFontSize: number = hp('2.5%');
  let cardDescriptionFontSize: number = hp('2%');
  let iconNotificationFontSize: number = wp('8%');
  let titleMarginBottom: number = hp('1%');
  let iconMarginBottom: number = hp('3%');

  if (height < 680) { // IMPORTANTE Pantallas más pequeñas como iPhone SE o iPhone 8 de 5.4 pulgadas o menos aproximadamente 

    buttonTextFontSize = wp('4.8%');
    buttonDescriptionFontSize = wp('4%');

    buttonsTitleFontSize = wp('3.4%')
    DescriptionFontSize = wp('2.5%');

    cardTitleFontSize = hp('3%');
    cardDescriptionFontSize = hp('2.5%');
    iconNotificationFontSize = wp('7%');
    titleMarginBottom = hp('3%');
    iconMarginBottom = hp('5%');
  }




  useEffect(() => {
    const openURL = async () => {
      if (ordenConsulta) {
        try {
          await Linking.openURL(ordenConsulta);
        } catch (err) {
          console.log('error al intentar ingresar a whatsapp:', err);
        } finally {
          setOrdenConsulta('');
        }
      }
    };
    openURL();
  }, [ordenConsulta]);

  /* definicion de estilos de boton para mejorar su control respecto a la pantalla */

  /* const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.background); */

  const renderSecondaryButton = ({ onPress, label, color, disabled, iconName, description, textSize,
    descriptionSize, textOverflow, }: Props) => {
    const backColor = disabled ? 'gray' : '#fff';

    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed && !disabled ? 'lightgray' : backColor,
            opacity: disabled ? 0.5 : 1,
          },
          styles.secondaryButton,
        ]}
      >
        <View style={{ margin: '0%' }} >
          <View style={{ alignItems: 'center', display: 'flex', justifyContent: 'center',  /* backgroundColor: 'violet', */ maxWidth: wp('42%'),}}  >
            <IonIcon name={iconName} size={hp('3.3%')} color="#505050" style={styles.icon} />
          </View>
          <View style={styles.innerContainerNew}>
            {label && <Text style={[styles.label, { fontSize: buttonsTitleFontSize }]}/* style={styles.label}  */>{label}</Text>}
            {description && <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.description, { fontSize: DescriptionFontSize }]}/* style={styles.description} */>{description}</Text>}
          </View>
        </View>
      </Pressable>
    );
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleGracias, setModalVisibleGracias] = useState(false);
  const [isModalVisibleNotificacion, setModalVisibleNotificacion] = useState(false);
  const [gcmData, setGcmData] = useState<any | null>(null);

/* useEffect para chequear para saber si el usuario ya concedió permiso a notificaciones push o no, en caso de que no lo haya hecho se le muestra un cartel. */
  useEffect(() => {
    const checkPermission = async () => {
      /* console.log('Se ejecutó el chequeo para saber si el usuario ya concedió permiso ') */

      const permission = await AsyncStorage.getItem('notificationPermissionn');

      // Mostrar el modal si nunca ha seleccionado permitir o denegar
      if (!permission) {
        setModalVisible(true);
      } else if (permission === 'granted') {
        console.log('El permiso ya ha sido concedido cambiar a  ')
        //revisar si hace falta activar de nuevo el token
        //registerForPushNotifications() 
        // Activar función si ya ha permitido notificaciones ESTO DEBE HACERSE SIEMPRE ? 
      }
    };

    checkPermission();
  }, []);

/* Función para solicitar al servidor la inscripción en el Topic de SNS */
  /*const registerForPushNotifications = async () => {
    try {
      await messaging().requestPermission(); // Solicitar permiso al sistema
      const token = await messaging().getToken();
      console.log('el token obtenido es---->', token)
      await axios.post('https://gmfp.createch.com.ar/api/notificacionesPrueba', { token });
    } catch (error) {
      console.log("Error al obtener o enviar el token desde la original FCM:-->", error);
      if (error.response) {
        console.log('Respuesta del servidor:error.response.data>', error.response.data);
        console.log('Estado del servidor:error.response.status>', error.response.status);
      } else if (error.request) {
        console.log('La solicitud fue hecha pero no se recibió respuesta alguna');
      } else {
        console.log('Error en la configuración:error.message>', error.message);
      }
    }
  };

*/
/*
  const handleAllow = async () => {
    setModalVisible(false);
    await AsyncStorage.setItem('notificationPermission', 'granted');
    registerForPushNotifications(); 
    setModalVisibleGracias(true)

  };*/
  
/* funcion para gestionar la redireccion a un actualización disponible en play store */
  const handleActualizar = async () => { 
    setMostrarActualizacion(false);
    try {
      await Linking.openURL(UrlActualizar);
    } catch (err) {
      console.log('error al intentar ingresar a la actualización:', err);
    } 

  };

/* funcion para gestionar el permiso negado a notificaciones push */
  const handleDeny = async () => {
    setModalVisible(false);
    await AsyncStorage.setItem('notificationPermission', 'denied');
    console.log("El usuario se negó a recibir notificaciones-->");
  };
  /* funcion para gestionar el boton de cerrar el modal de actualizaciones  */
  const handleCerrarActualizacion = async () => {
    setMostrarActualizacion(false);
    console.log("El usuario se negó a actualizar la app-->");
  };

/* acà agregar useEffect para escuchar posibles notificaciones desde el topic de SNS y estructurar los datos recibidos: */
  


/* acà agregar useEffect para escuchar desde un Segundo Plano posibles notificaciones desde el topic de SNS y estructurar los datos recibidos:  */


/* useEffect para activar el modal en caso de que tengamos nuevos datos recibidos */


/* este useEffect es para buscar versiones nuevas y avisar: */

let UrlActualizar = 'https://play.google.com/store/apps/details?id=com.ar.andessalud.andessalud'

/*
useEffect(() => {
  const checkForUpdate2 = async () => {
    try {
      const version  = await checkVersion();

      if (version.needsUpdate) {
        
        console.log('Nueva versión disponible:', version );
        console.log(`La App tiene la actualización pendiente: (version .updateType) ${version.updateType} .`);
        setMostrarActualizacion(true)
        setActualizacionDisponible(true)
        
      } 
      console.log('se consultaron actualizaciones pero no se encontraron nuevas versiones disponibles' );
     
       console.log('Nueva versión--> version---->>>:', version );
      console.log('version.needsUpdate---->>>:', version.needsUpdate );
      console.log('version.updateType---->>>:', version.updateType ); 
    } catch (error) {
      console.error('Error al verificar actualizaciones:', error);
    } finally {
      setHasCheckedForUpdate(true); // Marca como chequeado
    }
  };

  checkForUpdate2();
}, [hasCheckedForUpdate]);
*/

  return (
    <View style={styles.screenContainer}>
      <ScrollView   
        contentContainerStyle={{ flexGrow: 1 }}
  /*    scrollToOverflowEnabled={false}  
     snapToInterval={2} 
     bounces={false}  */
    /*  persistentScrollbar={true} */
      >


    {/*   <View style={[styles.headerContainer, { height: headerHeight, backgroundColor: '#e1a159' },]}>

        <View style={{ width: wp('80%'), marginBottom: titleMarginBottom }}>
          <Text style={styles.headerText}>Inicio</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('Buzón');
            }}
            style={{ marginLeft: 0, marginBottom: iconMarginBottom }}
          >
            <NotiMensajes IonIconSize={iconNotificationFontSize} />
          </Pressable>
          <NotiComponent3 />
        </View>
      </View> */}
      <LinearGradient
          colors={['#e49958', '#e49958', '#e1a159', '#e1a159', '#e1a159', '#e49958', '#e49958', '#e49958',]/* ['#e49958','#e49958','#e1a159', '#e1a159','#e1a159','#e1a159','#e1a159','#c88846','#daa36b' , '#e79340' ] */} // Degradado del color base
          start={{ x: 0, y: 0 }} // Inicio del gradiente (esquina superior izquierda)
          end={{ x: 1, y: 2 }} // Fin del gradiente (esquina inferior derecha)
          style={[{ height: headerHeight }, styles.headerContainer]} // Estilo inline para ajustar tamaño y posición
        >
          <View style={{ width: '80%', marginBottom: titleMarginBottom }}>
            <Text style={styles.headerText}>Inicio</Text>
          </View>

          <View>
            <Pressable
              onPress={() => {
                navigation.navigate('Buzón');
              }}
              style={{ marginLeft: 0, marginBottom: iconMarginBottom }}
            >
              <NotiMensajes IonIconSize={iconNotificationFontSize} />
            </Pressable>
            <NotiComponent3 />
          </View>
        </LinearGradient>

      <View style={styles.cardContainer}>
       {/*  <Credencial /> */}
        <CredencialNew />
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.innerContainer2}>

          {currentUserName ? (
            <Text style={styles.text2New}>¡Hola, {currentUserName}!</Text>
          )
        :
        (
          <Text style={styles.text2New}>¡Te estábamos esperando!</Text>
        )
        }
       
        </View>
      </View>

        {/*   <ScrollView> */}
        <View style={styles.bigContentContainer}>

          <View style={styles.buttonsContainer}>
            <View style={styles.rowContainer1}>
              {renderSecondaryButton({
                onPress: () => navigation.navigate('Perfil'),
                label: 'Mi Perfil',
                iconName: 'person-circle-outline',
                description: 'Información personal, opciones de personalización',
                textSize: { buttonsTitleFontSize },
                descriptionSize: { DescriptionFontSize }
              })}
              {renderSecondaryButton({
                onPress: () => navigation.navigate('Afiliados'),
                label: 'Mi Grupo Familiar',
                iconName: 'people-circle-outline',
                description: 'Detalles del grupo familiar y credenciales ',
                textSize: { buttonsTitleFontSize },
                descriptionSize: { DescriptionFontSize }
              })}

            </View>

            <View style={styles.rowContainer2}>
              {renderSecondaryButton({
                onPress: () => navigation.navigate('Pagos'),
                label: 'Mis Pagos',
                iconName: 'file-tray-full-outline',
                description: 'Estados de pago, opciones de pago',
                textSize: { buttonsTitleFontSize },
                descriptionSize: { DescriptionFontSize }
              })}
              {renderSecondaryButton({
                onPress: () => navigation.navigate('Facturas'),
                label: 'Descargá tus Facturas',
                iconName: 'cloud-download-outline',
                description: 'Historial y descarga de facturas',
                textSize: { buttonsTitleFontSize },
                descriptionSize: { DescriptionFontSize }
              })}
            </View>
            <View style={styles.rowContainer2}>
              {renderSecondaryButton({
                onPress: () => navigation.navigate('MiSalud'),
                /*   onPress: handleOpenURL, */
                label: 'Mi Salud',
                iconName: 'fitness-outline',
              /*   iconName: 'heart-circle-outline', */
              /*   iconName: 'chatbubbles-outline', */
                description: 'Cartilla médica y emergencias',
                textSize: { buttonsTitleFontSize },
                descriptionSize: { DescriptionFontSize }
              })}
              {renderSecondaryButton({
                onPress: () => navigation.navigate('MiGestión'),
                label: 'Gestiones',
                iconName: 'layers-outline',
                /* iconName: 'file-tray-full-outline', */
                description: 'Órdenes de consulta, estudios médicos y más',
                textSize: { buttonsTitleFontSize },
                descriptionSize: { DescriptionFontSize }
              })}
            </View>
          </View>

          <View style={styles.mensajeSoporteContainer}>
             
             {/*  <Text style={styles.text3New}>¿Necesitas asistencia?</Text> */}

            <Pressable
             onPress={handleOpenURL}
             style={styles.mensajeSoporteContainer}
            >

              <View style={styles.containerText4New}>

              <Text style={styles.text3New}>¿Necesitas asistencia?</Text>
              <IonIcon name='chatbubbles-outline' color= { 'black' } size = {30} marginLeft={wp('2%')} /> 
              </View>
              {/* <Text style={styles.text3New}>¿Necesitas asistencia?</Text> */}

              <View style={styles.containerText4New2}>

              <Text style={styles.text4New}>Chateá con nuestro soporte</Text>
              </View>

            </Pressable>
          </View>
        </View>
   {/*  <QuaternaryButton2
              onPress={handleOpenURL}
              label={'¿Necesitas asistencia?'}
              iconName="chatbubbles-outline"
              iconName2="mail-outline"
              description="Chatea con nuestro soporte"
              textSize={buttonTextFontSize}
              descriptionSize={buttonDescriptionFontSize}
            /> */}



    </ScrollView> 
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    /* backgroundColor: 'green', */
    marginHorizontal: wp('0%'),
    /*   display: 'flex', */
    /*   alignContent:'center', */
  },
  headerContainer: {
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: wp('8%'), // Ajuste responsivo para el tamaño del texto
    textAlign: 'center',
    color: 'white',
    marginLeft: wp('10%'),
    fontWeight:'bold',
  },
  cardContainer: {
    position: 'absolute',
    top: hp('10%'),
    height: hp('28%'),
    width: wp('95%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 3,
    marginBottom: hp('0%'),
    borderRadius: 20,
    /*  backgroundColor: 'yellow', */
    /*    backgroundColor: globalColors.white2, */
  },
  bigContentContainer: {
    /*  flex: 1, */
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    zIndex: 2,
    borderRadius: 15,
    /* agrego los estilos de contenedor mayor por los margenes */
    top: hp('8%'),
    marginLeft: hp('2%'), //ESTO NO PUEDE SER INVESTIGAR CENTRADOS.
    maxHeight: hp('50%'),
    marginHorizontal: wp('3%'),
    /* backgroundColor: 'orange', */
  },
  mensajeSoporteContainer: {
    marginBottom: hp('1%'),
    marginTop: hp('2%'),
    alignContent:'center',
    marginHorizontal: wp('5%'),
  },
  buttonsContainer: {
    zIndex: 1,
    marginTop: hp('-3%'),
    marginLeft: 0,
    /*  backgroundColor: 'violet', */
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',

  },
  rowContainer1: {
    zIndex: 1,
    flexDirection: 'row',
    marginBottom: hp('0%'),
    maxWidth: wp('100%'),
    marginTop: hp('0%'),
    justifyContent: 'center',
    alignContent: 'center',
    /*  backgroundColor: 'black', */
  },
  rowContainer2: {
    zIndex: 1,
    flexDirection: 'row',
    marginBottom: hp('0%'),
    maxWidth: wp('100%'),
    marginTop: hp('0%'),
    justifyContent: 'center',
    alignContent: 'center',
    /*  backgroundColor: 'red',  */
  },
  buttonStyle: {
    width: wp('42%'),  // Ajusta el tamaño para que encaje bien 2 botones por fila
    height: hp('10%'),  // Fija una altura constante
    marginHorizontal: wp('2%'),  // Controla el espacio entre botones
  },
  imageContainer2: {
    marginTop: hp('20%'),
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: hp('-4%'),
    /*  marginBottom: -60, */
    marginTop: hp('19%'),
    /* marginTop: 190, */
    /*  flex: hp('0.3%'), */
    /*  flex: 0.4, */
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: hp('10%'),
    /* maxHeight:'10%', */
    /*  marginHorizontal:0, */
    marginHorizontal: wp('3%'),
    padding: 0,
    /*   backgroundColor:'violet', */
    zIndex: 3, //cambiar
  },
  innerContainer2: {
    marginBottom: 0,
    marginTop: hp('0%'),
    /* marginTop: '6%', */
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    /*  width: '100%', */
    flexDirection: 'row',
    height: hp('3%'),
    /* height: '50%', */
    marginHorizontal: wp('4%'),
    /*    backgroundColor:'blue', */
    /* marginHorizontal:20, *///En el 15maxpro estaba en 40.
  },
  image2: {
    flex: 0.2,
    width: wp('100%'),
    height: hp('3.5%')
  },
  text2: {
    fontSize: hp('2.5%'),
    textAlign: 'center',
    flex: 1,
    width: wp('100%'),
    height: hp('3%'),
    /*  width: '100%', */
    /*   height: '100%', */
    margin: 0,
    marginLeft: wp('4%'),
    flexWrap: 'wrap'
  },
  text2New: {
    fontSize: hp('2.8%'),
    fontWeight:'bold',
    textAlign: 'center',
    flex: 1,
    width: wp('100%'),
    height: hp('3%'),

    margin: 0,
    marginLeft: wp('4%'),
    flexWrap: 'wrap',
    color: '#e1a159',
  },
  text3New: {
    fontSize: hp('2%'),
    fontWeight:'bold',
    textAlign: 'center',
    margin: 0,
    marginLeft: wp('0'),
    flexWrap: 'wrap',
    color: 'black',
    /* backgroundColor: '#e1a159', */
  },
  containerText4New: {
   /*  backgroundColor: '#ebc103', */
    /* backgroundColor: '#e6ba00', */
    /* backgroundColor: '#fbd1a5', */
    /* backgroundColor: '#e1a159', */
    borderRadius: 5,
    paddingHorizontal: wp('11%'),
    paddingVertical: 1,
    marginTop: wp('0%'),
    flexDirection:'row',
 /*    backgroundColor: 'blue', */
    alignItems:'center',
    alignContent:'center'
  },
  containerText4New2: {
    backgroundColor: '#ebc103',
    /* backgroundColor: '#e6ba00', */
    /* backgroundColor: '#fbd1a5', */
    /* backgroundColor: '#e1a159', */
    borderRadius: 5,
    paddingHorizontal: 0,
    paddingVertical: 3,
    marginTop: wp('1%'),
    marginHorizontal: wp('7%'),
  },
  text4New: {
    fontSize: hp('1.8%'),
    fontWeight:'bold',
    textAlign: 'center', 
    marginLeft: wp('0%'),
    flexWrap: 'wrap',
    color: 'black',
  },
  image: {
    width: wp('40%'), // Ajuste responsivo para la imagen
    height: hp('20%'), // Ajuste responsivo para la imagen
  },
  text: {
    fontSize: wp('6%'), // Ajuste responsivo para el texto
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  /* nuevo intento para tener mas control sobre los botones*/
  secondaryButton: {
    flex: 0.5,
    maxHeight: hp('15%'),
    maxWidth: wp('54%'),
    minWidth: wp('48%'),
    minHeight: hp('12%'),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 45,
    margin: wp('0.7%'),
    alignItems: 'center',
    /*  alignItems: 'flex-start', */
    textAlign: 'center',
    backgroundColor: globalColors.gray3,
    padding: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    /*  alignItems: 'center', */
    justifyContent: 'center',
  },
  icon: {
    marginBottom: hp('1%'),
    alignSelf: 'center',
    justifyContent: 'center',
   
  },
  innerContainer: {
    flexDirection: 'column',
    /*   width: '100%',  */
    width: wp('100%'),
    marginTop: hp('0.2%'),
    maxWidth: wp('40%'),
    maxHeight: hp('8%'),
    minHeight: hp('7%'),
    /*   backgroundColor: 'violet', */
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  innerContainerNew: {
    flexDirection: 'column',
    /*   width: '100%',  */
    width: wp('100%'),
    marginTop: hp('0.1%'),
    maxWidth: wp('42%'),
    maxHeight: hp('10%'),
    minHeight: hp('7.2%'),
      /* backgroundColor: 'violet', */
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  label: {
    fontSize: hp('1.5%'),
    color: 'black',
    fontWeight:'bold',
    /*  width: wp('100%'), */
    /*  maxwidth: '100%', */
    marginBottom: hp('0%'),
    /*   backgroundColor: 'red', */
    maxHeight: hp('2.5%'),
    minHeight: hp('2.2%'),
    marginTop: hp('0.5%'),
    textAlign: 'center',
    flexWrap: 'wrap',
  

  },
  description: {
    fontSize: hp('1%'),
        color: 'black',
   /*  color: '#707070', */
    maxWidth: wp('40%'),
    minWidth: wp('40%'),
    marginTop: hp('0.3%'),
    overflow: 'hidden',
    padding: hp('0.01%'),
    flexWrap: 'wrap',
    textAlign: 'center',
    marginBottom: hp('0%'),
    /* backgroundColor: 'violet', */
  },
});
