import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, PixelRatio, Image, Pressable, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import NotiComponent3 from '../../components/shared/NotiComponent3';
import NotiMensajes from '../../components/shared/Noti-mensajes';
import { useNotificationStore } from '../../store/notification-store';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { RootStackParams } from '../../routes/StackNavigator';
import { QuaternaryButton } from '../../components/shared/QuaternaryButton';
import { SecondaryButton } from '../../components/shared/SecondaryButton';
import { globalColors } from '../../theme/theme';
import Credencial from '../../components/shared/Credencial';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { QuaternaryButton2 } from '../../components/shared/QuaternaryButton2';
import { SecondaryButton2 } from '../../components/shared/SecondaryButton2';
import { IonIcon } from '../../components/shared/IonIcon';

interface Props {
  onPress: () => void;
  label?: string;
  id?: any;
  color?: string;
  disabled?: boolean;
  iconName?: string;
  description?: string;
  textOverflow?: string;
}


export const HomeScreenUx = ( ) => {
  const { setShouldUpdateNotifications } = useAuthStore();
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
  let headerHeight = hp('15%'); // Ajusta el tamaño de la cabecera según el alto de la pantalla

  if (height < 407) { // Pantallas más pequeñas como iPhone SE o iPhone 8
    headerHeight = hp('5%'); // Ajuste para pantallas más pequeñas
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

const renderSecondaryButton = ({ onPress, label, color, disabled, iconName, description,textOverflow }: Props) => {
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
      <View /* style={{ maxWidth: '30%'  }} */>
        <IonIcon name={iconName} size={hp('3%')} color="#505050" style={styles.icon} />
        <View style={styles.innerContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {description && <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>{description}</Text>}
        </View>
      </View>
    </Pressable>
  );
};



  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { height: headerHeight,  backgroundColor: 'black', },]}>
        <View style={{ width: wp('80%'), marginBottom: hp('1%') }}>
          <Text style={styles.headerText}>Inicio</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('Buzón');
            }}
            style={{ marginLeft: 0, marginBottom: hp('1%') }}
          >
            <NotiMensajes />
          </Pressable>
          <NotiComponent3 />
        </View>
      </View>

      <View style={styles.cardContainer}>
        <Credencial />
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.innerContainer2}>
          <Text style={styles.text2}>Bienvenido a Andes Salud UX</Text>
          <Image
            source={require('../../assets/images/logogris.png')}
            style={styles.image2}
            resizeMode="contain"
          />
        </View>
      </View>

     {/*  <QuaternaryButton
        onPress={() => navigation.navigate('Facturas')}
        label={'Descargá tus Facturas'}
        iconName="cloud-download-outline"
        iconName2="mail-outline"
        description="Accedé a todas tus facturas"
      />
 */}
      <View style={styles.bigContentContainer}>
        <View style={styles.facturaContainer}>
          <QuaternaryButton2
            onPress={() => navigation.navigate('Facturas')}
            label={'Descargá tus Facturas'}
            iconName="cloud-download-outline"
            iconName2="mail-outline"
            description="Accedé a todas tus facturas"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.rowContainer1}>
            {renderSecondaryButton({
              onPress: () => navigation.navigate('Afiliados'),
              label: 'Mi Grupo Familiar',
              iconName: 'people-circle-outline',
              description: 'Tu Grupo Familiar y credenciales '
            })}
            {renderSecondaryButton({
              onPress: () => navigation.navigate('Perfil'),
              label: 'Mi Perfil',
              iconName: 'person-circle-outline',
              description: 'Tu cuenta personalizada'
            })}
            
          {/*   <SecondaryButton2
              onPress={() => navigation.navigate('Afiliados')}
              label="Mi Grupo Familiar"
              iconName="people-circle-outline"
              description="Tu Grupo Familiar y credenciales"
            />

            <SecondaryButton2
              onPress={() => navigation.navigate('Perfil')}
              label="Mi Perfil"
              iconName="person-circle-outline"
              description="Tu cuenta personalizada"
            /> */}
          </View>

          <View style={styles.rowContainer2}>
          {renderSecondaryButton({
              onPress: () => navigation.navigate('Pagos'),
              label: 'Mis Pagos',
              iconName: 'file-tray-full-outline',
              description: 'Accedé al estado de tus pagos'
            })}
            {renderSecondaryButton({
              /* onPress: () => navigation.navigate('Perfil'), */
              onPress: handleOpenURL,
              label: 'Asistencia',
              iconName: 'chatbubbles-outline',
              description: 'Chateá con nuestro soporte'
            })}
           {/*  <SecondaryButton2
              onPress={() => navigation.navigate('Pagos')}
              label="Mis Pagos"
              iconName="file-tray-full-outline"
              description="Accedé al estado de tus pagos"
              style={styles.buttonStyle}
            />
            <SecondaryButton2
              onPress={handleOpenURL}
              label="Asistencia"
              iconName="chatbubbles-outline"
              description="Chateá con nuestro soporte"
            /> */}
          </View>
        </View>
      </View>
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
   /*  width: '100%', */
   /*  backgroundColor: 'red', */
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
  },
  cardContainer: {
    position: 'absolute',
    top: hp('11%'),
    height: hp('28%'),
    width: wp('95%'),
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    zIndex: 3,
    marginBottom: hp('0%'),
    borderRadius: 20,
   /*  backgroundColor: 'yellow', */
 /*    backgroundColor: globalColors.white2, */
  },
  bigContentContainer: {
   /*  flex: 1, */
    marginTop: hp('0%'),
    marginBottom: hp('1%'),
    zIndex: 2,
    borderRadius: 15,
    /* agrego los estilos de contenedor mayor por los margenes */
    top: hp('8%'),
    marginLeft:hp('2%'), //ESTO NO PUEDE SER INVESTIGAR CENTRADOS.
    maxHeight:hp('50%'),
    marginHorizontal: wp('3%'),
    /* backgroundColor: 'orange', */
  },
  facturaContainer: {
    marginBottom: hp('1%'),
  },
  buttonsContainer: {
    zIndex: 1,
    marginTop: hp('-3%'),
    marginLeft: 0,
   /*  backgroundColor: 'violet', */
    flexDirection: 'column', 
    justifyContent: 'center',
    alignContent:'center',
    
  },
  rowContainer1: {
    zIndex: 1,
    flexDirection: 'row',
    marginBottom: hp('0%'),
    maxWidth: wp('100%'),
    marginTop: hp('0%'),
    justifyContent: 'center',
    alignContent:'center', 
   /*  backgroundColor: 'black', */
  },
  rowContainer2: {
    zIndex: 1,
    flexDirection: 'row',
    marginBottom: hp('1%'),
    maxWidth: wp('100%'),
    marginTop: hp('0%'),
    justifyContent: 'center',
    alignContent:'center', 
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
    marginBottom: hp('-7%'),
   /*  marginBottom: -60, */
    marginTop: hp('25%'),
    /* marginTop: 190, */
   /*  flex: hp('0.3%'), */
   /*  flex: 0.4, */
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center',
    maxHeight:hp('10%'),
    /* maxHeight:'10%', */
   /*  marginHorizontal:0, */
    marginHorizontal: wp('3%'),
    padding:0,
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
    flexDirection:'row',
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
   /*  width: '100%', */
    /* height: '100%', */
  },
  text2: {
   /*  fontSize: 24, */
   fontSize: hp('2.5%'),
    textAlign: 'center',
    flex: 1,
    width: wp('100%'),
    height: hp('3%'),
   /*  width: '100%', */
  /*   height: '100%', */
    margin: 0,
    flexWrap: 'wrap'
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
    maxHeight: hp('13%'),
    maxWidth: wp('43%'),
    minHeight: hp('13%'),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    margin: wp('1%'),
    alignItems: 'flex-start',
    textAlign: 'center',
   /*  backgroundColor: 'blue', */
  padding: wp('2%'),
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  icon: {
    marginBottom: hp('1%'),
  },
  innerContainer: {
  flexDirection: 'column', 
/*   width: '100%',  */
width: wp('100%'), 
  marginTop: hp('0.2%'),
  maxWidth: wp('38%'),
  maxHeight: hp('8%'), 
  minHeight: hp('7%'),
/*   backgroundColor: 'violet', */
  flexWrap: 'wrap',
  overflow: 'hidden', 
  
  },
  label: {
    fontSize: hp('2.1%'),
    color: '#505050',
    width: wp('100%'), 
   /*  width: '100%', */
    marginBottom: hp('0%'),
   /*  backgroundColor: 'red', */
    maxHeight: hp('5%'),
    marginTop: hp('0.5%'),
    textAlign: 'left',
    flexWrap: 'wrap',
 
  },
  description: {
   
    fontSize: hp('1.5%'),
/*     color: 'black', */
    color: '#707070',
   maxWidth: wp('40%'),
   minWidth: wp('40%'), 
    marginTop: hp('0.5%'),
    overflow: 'hidden', 
   padding: hp('0.01%'),
   flexWrap: 'wrap', 
  },
});
