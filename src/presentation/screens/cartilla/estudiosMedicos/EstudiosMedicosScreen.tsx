import React, { useEffect, useState } from 'react'
import { Text, View, Alert } from 'react-native'
import { xml2js } from 'xml-js';
import { Picker } from '@react-native-picker/picker';

import { NavigationProp, useNavigation } from '@react-navigation/native'

import { IndexPath, Layout, Select, SelectItem, SelectGroup, Input, Button } from '@ui-kitten/components'
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { RootStackParams } from '../../../routes/StackNavigator';
import { globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { BackButton } from '../../../components/shared/BackButton';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { MyIcon } from '../../../components/ui/MyIcon';



export const EstudiosMedicosScreen = () => {

  const { ObtenerFamiliares, idAfiliado, idAfiliadoTitular, cadena, ObtenerEspecialidades, ObtenerPrestadores, ObtenerPrestadoresEstudiosMedicos, GuardarIdPrestador, GuardarIdFamiliarSeleccionado } = useAuthStore();


  //---------------------LOGICA PARA EL SELECT DE FAMILIAR ELEGIDO-------------------------------------->
  //useStates: State 1 (nombresDeFamiliares): para guardar un listado de solamente NOMBRES de Familiares (sin el id) y poder mostrarlos en el select para que elija el usuario. State2 (FamiliaresObtenidosObjeto): datos de los familiares obtenidos de la consulta (nombre y id). State 3(selectedFamiliarNombre): nombre del familiar seleccionado. State4(FamiliarSeleccionadoDatos) : nombre y id del familiar seleccionado. 
  const [nombresDeFamiliares, setNombresDeFamiliares] = useState<string[]>([]);
  const [FamiliaresObtenidosObjeto, setFamiliaresObtenidosObjeto] = useState<string[]>([]); // 
  const [selectedFamiliarNombre, setSelectedFamiliarNombre] = useState<string | null>(null);
  const [FamiliarSeleccionadoDatos, setFamiliarSeleccionadoDatos] = useState<string[]>([]); // 

  const handleSelectFamiliar = (itemValue: string | number, itemIndex: number) => {
    setSelectedFamiliarNombre(nombresDeFamiliares[itemIndex]);
    const familiarEncontrado: any = FamiliaresObtenidosObjeto.find(familiar => familiar.apellidoYNombre === itemValue);
    if (familiarEncontrado) {
      setFamiliarSeleccionadoDatos(familiarEncontrado)
      const { apellidoYNombre, idAfiliado }: { apellidoYNombre: string, idAfiliado: string } = familiarEncontrado;
      console.log('Apellido y Nombre:', apellidoYNombre);
      console.log('ID de Afiliado:', idAfiliado);
      GuardarIdFamiliarSeleccionado(idAfiliado);
    } else {
      console.log('No se encontró el familiar');

    }

  };









  
  //---------------------LOGICA PARA EL SELECT DE PRESTADOR ELEGIDO-------------------------------------->
  const [PrestadoresObtenidosObjeto, setPrestadoresObtenidosObjeto] = useState<string[]>([]);
  const [NombresDePrestadores, setNombresDePrestadores] = useState<string[]>([]);
  const [SelectedPrestadorNombre, setSelectedPrestadorNombre] = useState<string | null>(null);
  const [PrestadorSeleccionadoDatos, setPrestadorSeleccionadoDatos] = useState<string[]>([]);
  const [IdPrestadorElegido, setIdPrestadorElegido] = useState<string>('');

  //--------------------- LOGICA PARA EL INPUT DE BÙSQUEDA DE PRESTADOR-------------------------------------->
  const [isPosting, setIsPosting] = useState(false)
  const [busqueda, setBusqueda] = useState({ cadena: ''})
  const obtenerPrestadoresConsulta = async () => {

    if ( busqueda.cadena.length < 2) {
      Alert.alert('Error', 'La bùsqueda debe incluir al menos 3 caracteres');
      return false;
    }; 
   
    try {

      if (idAfiliado !== undefined && busqueda.cadena !== '' ) {
        const PrestadoresObtenidos: any = await ObtenerPrestadoresEstudiosMedicos(idAfiliado, busqueda.cadena);
        setPrestadoresObtenidosObjeto(PrestadoresObtenidos);
        const nombresPrestadores = PrestadoresObtenidos.map((prestador: any) => prestador.nombre);
        if (nombresPrestadores[0] === "No se encontraron prestadores para la busqueda indicada.") {
          setNombresDePrestadores(["Elija familiar y prestador"]);
        } else {
          setNombresDePrestadores(nombresPrestadores);
        }

        return true;

      } else {
        Alert.alert('Error', 'El ID de afiliado o la cadena están vacíos. No se puede realizar la búsqueda.');
        console.error('idAfiliado  o cadena esta vacio. No se puede llamar a ObtenerPrestadoresEstudiosMedicos.');
       return false;
      }
    } catch (error) {
      console.error(' No se puede llamar a ObtenerPrestadoresEstudiosMedicos desde el EstudiosMedicosScreen.');
    }
  };

  const HandleBuscarPrestador = async () => {
    
    setIsPosting(true); 
    const respuestaExitosa = await obtenerPrestadoresConsulta()
    setIsPosting(false);
    if (!respuestaExitosa){
      Alert.alert('Error', 'Dificultades tecnicas en la busqueda');
      return;
    }
    return;
  }


  //--------------------- LOGICA PARA EL SELECT DE ESPECIALIDAD ELEGIDA-------------------------------------->
  //
  //useStates: State 1 (NombresDeEspecialidades): para guardar un listado de solamente NOMBRES de especialidades (sin el id) y poder mostrarlos en el select para que elija el usuario. State2 (EspecialidadesObtenidasObjeto): datos de las especialidades obtenidas de la consulta (nombre y id). state 3(SelectedEspecialidadNombre): nombre de la especialidad seleccionada. state4(EspecialidadSeleccionadaDatos) : nombre y id de la especialidad seleccionada. 
  const [NombresDeEspecialidades, setNombresDeEspecialidades] = useState<string[]>([]);
  const [EspecialidadesObtenidasObjeto, setEspecialidadesObtenidasObjeto] = useState<string[]>([]); // 
  const [SelectedEspecialidadNombre, setSelectedEspecialidadNombre] = useState<string | null>(null);
  const [EspecialidadSeleccionadaDatos, setEspecialidadSeleccionadaDatos] = useState<string[]>([]);
  const [IdEspecialidadElegida, setIdEspecialidadElegida] = useState<string>('');

  const handleSelectEspecialidad = (itemValue: string | number, itemIndex: number) => {
    setSelectedEspecialidadNombre(NombresDeEspecialidades[itemIndex]);
    const EspecialidadEncontrada: any = EspecialidadesObtenidasObjeto.find(especialidad => especialidad.nombreParaAfiliado === itemValue);
    if (EspecialidadEncontrada) {
      setEspecialidadSeleccionadaDatos(EspecialidadEncontrada)
      const { nombreParaAfiliado, idPrestacion }: { nombreParaAfiliado: string, idPrestacion: string } = EspecialidadEncontrada;
      //podemos luego guardar estas constantes en el context.
      setIdEspecialidadElegida(idPrestacion)

    }


  };


/*   const handleSelectPrestador = (itemValue: string | number, itemIndex: number) => {
    setSelectedPrestadorNombre(NombresDePrestadores[itemIndex]);
    const PrestadorEncontrado: any = PrestadoresObtenidosObjeto.find(prestador => prestador.prestador === itemValue);
    if (PrestadorEncontrado) {
      setPrestadorSeleccionadoDatos(PrestadorEncontrado)
      const { prestador, idPrestador }: { prestador: string, idPrestador: string } = PrestadorEncontrado;
      console.log('Nombre del Prestador:', prestador);
      console.log('ID del Prestador:', idPrestador);
      setIdPrestadorElegido(idPrestador)
      GuardarIdPrestador(idPrestador)
    } else {
      console.log('No se encontró la especialidad');

    }

  }; */





  useEffect(() => {

    console.log('FamiliarSeleccionadoDatos------>>>', FamiliarSeleccionadoDatos);
    console.log('EspecialidadSeleccionadaDatos------>>>', EspecialidadSeleccionadaDatos);
    console.log('PrestadorSeleccionadoDatos CONCHITUMADREEEE------>>>', PrestadorSeleccionadoDatos);

    const obtenerFamiliaresConsulta = async () => {

      try {
        if (idAfiliado !== undefined) {
          const FamiliaresObtenidosObjeto = await ObtenerFamiliares(idAfiliado);
          /*      console.log('familiares obtenidos objeto datos--->', FamiliaresObtenidosObjeto); */

          setFamiliaresObtenidosObjeto(FamiliaresObtenidosObjeto);
          const mensajePredeterminado = 'Desliza hacia abajo';
          const nombresFamiliares = [mensajePredeterminado, ...FamiliaresObtenidosObjeto.map((familiar) => familiar.apellidoYNombre)];
          /* const nombresFamiliares = FamiliaresObtenidosObjeto.map((familiar) => familiar.apellidoYNombre); */
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
          setEspecialidadesObtenidasObjeto(especialidadesObtenidas);
          const mensajePredeterminado = 'Desliza hacia abajo';
          const nombresEspecialidades = [mensajePredeterminado, ...especialidadesObtenidas.map((especialidad) => especialidad.nombreParaAfiliado)];
          setNombresDeEspecialidades(nombresEspecialidades)
          return especialidadesObtenidas

        } else {
          console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerEspecialidades.');
        }
      } catch (error) {
        console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerEspecialidades desde el ConsultaScreen.');
      }
    };
   
    obtenerFamiliaresConsulta();
/*     obtenerEspecialidadesConsulta();
    obtenerPrestadoresConsulta(); */
  }, [/* selectedFamiliarNombre, */ /* SelectedEspecialidadNombre, */ /* IdEspecialidadElegida,*/ /* SelectedPrestadorNombre */])



  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View style={globalStyles.container}>

      <CustomHeader />

      <BackButton />

      <Text style={{ marginBottom: 10, marginTop: 20, fontSize: 25, textAlign: 'center', /* backgroundColor: 'orange' */ }}>Solicitar Estudio Médico</Text>

      <View
        style={{ /* backgroundColor: 'green', */ flex: 1, marginBottom: 30, marginTop: 35 }}>

          {/* -----------------FAMILIAR---------------- */}

        <View style={{ /*  backgroundColor: 'yellow', */ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center' }}>
          <Text style={{ /* backgroundColor: 'yellow', */ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 5 }}>Selecciona un familiar</Text>
          <View style={globalStyles.pickerWrapper}>
            <Picker
              style={globalStyles.inputIOS}
              selectedValue={selectedFamiliarNombre !== null ? selectedFamiliarNombre : undefined}
              onValueChange={(itemValue: string | number, itemIndex: number) =>
                handleSelectFamiliar(itemValue, itemIndex)
              }         
              itemStyle={globalStyles.itemStyle}
            >
              {nombresDeFamiliares.map((item, index) => (
                <Picker.Item style={{ marginVertical: 0 }} key={index} label={item} value={item}
                />
              ))}
            </Picker>
          </View>
        </View>
      

        {/* -----------------INPUT PARA ESCRIBIR EL PRESTADOR---------------- */}

        <Layout style={{ marginTop: 20 }}>
      
          <Input
            placeholder="Escriba un prestador"
            autoCapitalize="none"
            value={busqueda.cadena}
            onChangeText={(cadena) => setBusqueda({ cadena })}
            accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={HandleBuscarPrestador}
          >
            Buscar Prestador
          </Button>

        </Layout>




        {/* -----------------PRESTADOR---------------- */}

        <View style={{ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', marginBottom: 25 }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Prestadores encontrados:</Text>
          <View style={globalStyles.pickerWrapper}>
            <Picker
              style={globalStyles.inputIOS}
             /*  selectedValue={SelectedPrestadorNombre !== null ? SelectedPrestadorNombre : undefined}
              onValueChange={(itemValue: string | number, itemIndex: number) =>
                handleSelectPrestador(itemValue, itemIndex)
              } */
              itemStyle={globalStyles.itemStyle}
            >
              {NombresDePrestadores.map((item, index) => (
                <Picker.Item style={{ marginVertical: 0 }} key={index} label={item} value={item}

                />
              ))}
            </Picker>
          </View>
        </View>


        <PrimaryButton
          onPress={() => navigation.navigate('MiOrdenConsulta')}
          label=" Solicitar Estudios Medicos"
        />
      </View>

    </View>
  )
}

