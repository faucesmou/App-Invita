import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import {Picker, PickerContainer} from '@react-native-picker/picker';
import {  globalStyles } from '../../theme/theme'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import CustomHeader from '../../components/CustomHeader'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { IndexPath, Layout, Select, SelectItem, SelectGroup, } from '@ui-kitten/components'
import { BackButton } from '../../components/shared/BackButton'
/* import { SvgXml } from 'react-native-svg';
const isotipo = require('../credential/CredentialsData/images/Isotipo.svg'); */
const tramites = [
  { id: 1, name: 'Autorizar prestación' },
  { id: 2, name: 'Solicitar medicamentos' },
  { id: 3, name: 'Reintegros' },
  { id: 4, name: 'Empadronamientos anticonceptivos' },
  { id: 5, name: 'Mis trámites' },
];

const data = [
  'Developer',
  'Designer',
  'Product Manager',
];

interface Especialidad {
  id: string;
  nombre: string;
}

interface Props {
  especialidades: Especialidad[];
}

export const ConsultaScreenFinal = () => {

  const { ObtenerFamiliares, idAfiliado, idAfiliadoTitular, ObtenerEspecialidades } = useAuthStore();
  
  

  //codigo para los selects:---------------------->



// ADAPTACION PARA NUESTRA APP: 

const [idNombresEspecialidad, setIdNombresEspecialidad] = useState<string[]>([]);

  //use state para guardar un listado de solamente NOMBRES de familiares (sin el id) y poder mostrarlos en el select para que elija el usuario:
  const [nombresDeFamiliares, setNombresDeFamiliares] = useState<string[]>([]);

  //useStates para la almacenar los datos de EL  Familiar (solo un familiar) seleccionado: state 1 (FamiliaresObtenidosObjeto): familiares obtenidos de la consulta. state 2(selectedFamiliarNombre): nombre del familiar seleccionado. state3(FamiliarSeleccionadoDatos) : nombre y id del familiar seleccionado: 
   
  const [FamiliaresObtenidosObjeto, setFamiliaresObtenidosObjeto] = useState<string[]>([]); // 
  const [selectedFamiliarNombre, setSelectedFamiliarNombre] = useState<string | null>(null);
  const [FamiliarSeleccionadoDatos, setFamiliarSeleccionadoDatos] = useState<string[]>([]); // 

  const handleSelect3 = (itemValue: string | number, itemIndex: number) => {
    setSelectedFamiliarNombre(nombresDeFamiliares[itemIndex]);  
    const familiarEncontrado: any  = FamiliaresObtenidosObjeto.find(familiar => familiar.apellidoYNombre === itemValue);
    if (familiarEncontrado) {
      setFamiliarSeleccionadoDatos(familiarEncontrado)
      // Guardar el objeto encontrado en unas variables para posterior uso
      const { apellidoYNombre, idAfiliado }: { apellidoYNombre: string, idAfiliado: string } = familiarEncontrado;
      
      // Hacer lo que necesites con el objeto encontrado
      console.log('Apellido y Nombre:', apellidoYNombre);
      console.log('ID de Afiliado:', idAfiliado);
  
    } else {
      console.log('No se encontró el familiar');
      
    }
    
  };


  const [idEspecialidad, setIdEspecialidad] = useState<string[]>([]); 
  
  



  useEffect(() => {

    console.log('el familiar seleccionado y guardado el el useState selectedFamiliarNombre es:', selectedFamiliarNombre);
    console.log('el familiar FamiliaresObtenidosObjeto --x--x-x-->:', FamiliaresObtenidosObjeto);
    console.log('el familiar FamiliarSeleccionadoDatos --x--x-x-->:', FamiliarSeleccionadoDatos);
    const obtenerFamiliaresConsulta = async () => {

    
      try {
        if (idAfiliado !== undefined) {
          const FamiliaresObtenidosObjeto = await ObtenerFamiliares(idAfiliado);
          console.log('estos son los idsesFamiliaresObtenidos desde el effect de CONSULTAScreen', FamiliaresObtenidosObjeto);
          setFamiliaresObtenidosObjeto(FamiliaresObtenidosObjeto);
          const nombresFamiliares = FamiliaresObtenidosObjeto.map((familiar) => familiar.apellidoYNombre);
          console.log('estos son los idsesFamiliaresObtenidos desde el effect de CONSULTAScreen', nombresFamiliares);
          setNombresDeFamiliares(nombresFamiliares)

          return FamiliaresObtenidosObjeto
          /*  set({ idsFamiliares: idsesFamiliares }) */
        } else {
          console.error('idAfiliado es undefined. No se puede llamar a ObtenerFamiliares.');
        }
      } catch (error) {
        console.error('idAfiliado es undefined. No se puede llamar a ObtenerFamiliares desde el tramitesScreen.');
      }
    };
    const obtenerEspecialidadesConsulta = async () => {
      try {
        if (idAfiliado !== undefined && idAfiliadoTitular !== undefined) {
          const especialidadesObtenidas = await ObtenerEspecialidades(idAfiliado, idAfiliadoTitular);
          setIdEspecialidad(especialidadesObtenidas);
       
        /*   console.log('estE ES EL ARRAY DE ID ESPECIALDIDAD CON TODAS--->', idEspecialidad); */
          const nombresEspecialidades = idEspecialidad.map((especialidad) => especialidad.nombreParaAfiliado);
          setIdNombresEspecialidad(nombresEspecialidades)
          return {especialidadesObtenidas, nombresEspecialidades}

        } else {
          console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerFamiliares.');
        }
      } catch (error) {
        console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerFamiliares desde el ConsultaScreen.');
      }
    };
    obtenerFamiliaresConsulta();
    obtenerEspecialidadesConsulta()
  }, [selectedFamiliarNombre])


  
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View style={globalStyles.container}>

      <CustomHeader />

      <BackButton />

      <Text style={{ marginBottom: 20, marginTop: 0, fontSize: 20, textAlign: 'center', }}>Solicitar orden de consulta screenFinal</Text>
      <View
        style={{ marginBottom: 350,/*  alignItems: 'center' */ }}>

        <View style={{borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center'}}>
        <Text style={{  fontSize: 20, textAlign: 'center', marginBottom: 0 }}>Selecciona un familiar</Text>
       {/*  <PickerContainer style={{ padding: 0, margin: 10 }}></PickerContainer> */}
          <Picker
            style={{  fontSize: 10, textAlign: 'center', padding:0, marginTop: 0 }}/* esto no funciona */
            selectedValue={selectedFamiliarNombre !== null ? selectedFamiliarNombre : undefined}
            onValueChange={(itemValue: string | number, itemIndex: number) =>
              handleSelect3(itemValue, itemIndex)
            }
            itemStyle={{
              fontSize: 15,
              fontFamily: 'Quicksand-Light',
              marginVertical: 0,
              padding: 0,
              margin:0,
            }}
          >
            {nombresDeFamiliares.map((item, index) => (
              <Picker.Item style={{marginVertical: 0}} key={index} label={item} value={item}
            
              />
            ))}
          </Picker>
        </View>


        <PrimaryButton
          /*  onPress={() => navigation.navigate('MiOrdenConsulta')} */
          onPress={() => {
            console.log('se realizo la consulta de orden de consultaaaa');

          }}
    
          label=" Solicitar Orden de consulta pa"
        />
      </View>

    </View>
  )
}

