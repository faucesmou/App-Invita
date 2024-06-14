import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import CustomHeader from '../../components/CustomHeader'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { TertiaryButton } from '../../components/shared/TertiaryButton'

const tramites = [
  { id: 1, name: 'Autorizar prestación' },
  { id: 2, name: 'Solicitar medicamentos' },
  { id: 3, name: 'Reintegros' },
  { id: 4, name: 'Empadronamientos anticonceptivos' },
  { id: 5, name: 'Mis trámites' },
];


export const TramitesScreen = () => {
  console.log('Entrando a TramitesScreen (Mi Gestion)')


  /*  useEffect(() => {
     navigation.setOptions({
       headerStyle: {
         backgroundColor: globalColors.primary, 
         height: 130,
       },
       headerTintColor: 'white',
       headerTitleStyle: {
         fontSize: 28, 
       },
     })
     }, []); */


  /* 
  let idAfiliadoUsuario = idAfiliado;
  if(idAfiliadoUsuario !== undefined){
    const idsFamiliares = ObtenerFamiliares(idAfiliadoUsuario)
    console.log('estos son los idsFamiliares desde el effect de TramitesScreen', idsFamiliares); 
  }
  else {
    console.error('idAfiliado es undefined. No se puede llamar a ObtenerFamiliares.');
}

} )*/
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  /* console.error('Entrando a TramitesScreen (Mi Gestion)') */
  return (
    <View style={{/* globalStyles.container */  flex: 1,
      paddingHorizontal: 20,
      marginTop: 0,
      /* backgroundColor: 'yellow' */
    }}>

      <CustomHeader color={globalColors.gray} />
      <HamburgerMenu />
   
      <View style={{ /* backgroundColor: 'yellow', */ marginTop: 40, }}>
        <TertiaryButton
          onPress={() => navigation.navigate('Consulta')}
          label="Solicitar orden de consulta"
          color={globalColors.profile2}
          iconName='people-outline'
          description='Gestioná la orden de tus estudios'
        />{/* <ion-icon name="people-outline"></ion-icon> */}
        <TertiaryButton
          onPress={() => navigation.navigate('Formularios')}
          label="Obtener Formularios Especiales"
          color={globalColors.profile2}
          iconName='document-text-outline'
          description='Descargá tus formularios'
        />
     
        <TertiaryButton
          onPress={() => navigation.navigate('Facturas')}
          label="Mis Facturas"
          color={globalColors.profile2}
          iconName='file-tray-full-outline'
          description='Accedé a todas tus facturas'
        />
      </View>
      <View
        style={{ marginBottom: 20, 
          marginTop: 10,  
          /* backgroundColor: 'green',  */ 
          flex: 1, alignItems: 'center' }}
      >
        <Text style={{
          fontSize:25,
          textAlign: 'center',
        }} >
          Contenido complementario
        </Text>


      </View>


    </View>
  )
}