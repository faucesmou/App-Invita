import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { FlatList } from 'react-native-gesture-handler'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'
import CustomHeader from '../../components/CustomHeader'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { Input } from '@ui-kitten/components'
import { MyIcon } from '../../components/ui/MyIcon'
/* import { SvgXml } from 'react-native-svg';
const isotipo = require('../credential/CredentialsData/images/Isotipo.svg'); */
const tramites = [
  { id: 1, name: 'Autorizar prestación' },
  { id: 2, name: 'Solicitar medicamentos' },
  { id: 3, name: 'Reintegros' },
  { id: 4, name: 'Empadronamientos anticonceptivos' },
  { id: 5, name: 'Mis trámites' },
];


export const ConsultaScreen = () => {

  /*   const { idAfiliado } = useAuthStore(); */
    const [formData, setFormData] = useState({
      idAfiliado: '',
      prestacion: '',
      prestador: '',
    })
     // Función para manejar los cambios en los inputs
  const handleChange = (name: string, value:string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   // Función para determinar si los campos anteriores están completados
   const isPreviousComplete = (field: keyof typeof formData): boolean => {
    switch (field) {
      case 'prestacion':
        return !!formData.idAfiliado;
      case 'prestador':
        return !!formData.idAfiliado && !!formData.prestacion;
      default:
        return true;
    }
  };
/*   const [idAfiliado, setIdAfiliado] = useState('');
  const [prestacion, setPrestacion] = useState('');
  const [prestador, setPrestador] = useState(''); */
  //son 3 selects:
  //voy a llamar los id familiares desde el context y mostrarlos en el select.
  //voy a llamar a consulta especialidad y mostrarlos en el select.
  //voy a llamar a consulta prestador y mostrarlos en el select.

  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  return (
    <View style={globalStyles.container}>

      <CustomHeader />
      <HamburgerMenu />
      <Text style={{ marginBottom: 20, marginTop: 10, fontSize: 25, textAlign: 'center', }}>Solicitar orden de consulta</Text>


      <View
        style={{ marginBottom: 250 }}
      >


        <Input
          placeholder="Seleccione Afiliado"
          autoCapitalize="none"
          value={formData.idAfiliado}
          /* onChangeText={text => setIdAfiliado(text)} */
          onChangeText={(text) => handleChange('idAfiliado', text)}
          editable={!formData.idAfiliado}
          accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Seleccione Especialidad"
          autoCapitalize="none"
          value={formData.prestacion}
          /*    onChangeText={text => setPrestacion(text)} */
          onChangeText={(text) => handleChange('prestacion', text)}
        editable={isPreviousComplete('prestacion')}
          accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
          style={{ marginBottom: 10 }}
        />



        <Input
          placeholder="Seleccione Prestador"
          autoCapitalize="none"
          value={formData.prestador}
          /* onChangeText={text => setPrestador(text)} */
          onChangeText={(text) => handleChange('prestador', text)}
        editable={isPreviousComplete('prestador')}
          accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
          style={{ marginBottom: 10 }}
        />
        <PrimaryButton
         /*  onPress={() => navigation.navigate('MiOrdenConsulta')} */
         onPress={() => {
          console.log('se realizò la consulta de orden de consultaaaa');
          
        }}
        disabled={!formData.idAfiliado || !formData.prestacion || !formData.prestador}
          label=" Solicitar Orden de consulta"
        />

        {/* <SvgXml xml={isotipo} width="100" height="150" /> */}
      </View>

      {/*   <Text style={{ marginBottom: 70, fontSize:25 }}>Mis tramites</Text> */}

      {/*   <PrimaryButton
    onPress={ ()=> navigation.navigate('Settings' as never )}
    label={"Ajustes"}
    /> */}
    </View>
  )
}