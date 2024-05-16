import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../../theme/theme'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../routes/StackNavigator'
import CustomHeader from '../../components/CustomHeader'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { IndexPath, Layout, Select, SelectItem, SelectGroup, } from '@ui-kitten/components'
import { BackButton } from '../../components/shared/BackButton'


export const ConsultaScreenFinal = () => {

  const { ObtenerFamiliares, idAfiliado, idAfiliadoTitular, ObtenerEspecialidades, ObtenerPrestadores } = useAuthStore();


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
      console.log('Nombre de la prestacion:', nombreParaAfiliado);
      console.log('ID de la Prestacion:', idPrestacion);
      setIdEspecialidadElegida(idPrestacion)
      
    } else {
      console.log('No se encontró la especialidad');

    }

  };

  //---------------------LOGICA PARA EL SELECT DE PRESTADOR ELEGIDO-------------------------------------->
  const [PrestadoresObtenidosObjeto, setPrestadoresObtenidosObjeto] = useState<string[]>([]); 
  const [NombresDePrestadores, setNombresDePrestadores] = useState<string[]>([]);
  const [SelectedPrestadorNombre, setSelectedPrestadorNombre] = useState<string | null>(null);
  const [PrestadorSeleccionadoDatos, setPrestadorSeleccionadoDatos] = useState<string[]>([]);
  const [IdPrestadorElegido, setIdPrestadorElegido] = useState<string>('');

  const handleSelectPrestador = (itemValue: string | number, itemIndex: number) => {
    setSelectedPrestadorNombre(NombresDePrestadores[itemIndex]);
    const PrestadorEncontrado: any = PrestadoresObtenidosObjeto.find(prestador => prestador.prestador === itemValue);    
    if (PrestadorEncontrado) {
      setPrestadorSeleccionadoDatos(PrestadorEncontrado)
      const { prestador, idPrestador }: { prestador: string, idPrestador: string } = PrestadorEncontrado;
      console.log('Nombre del Prestador:', prestador);
      console.log('ID del Prestador:', idPrestador);
      setIdPrestadorElegido(idPrestador)
    } else {
      console.log('No se encontró la especialidad');

    }

  };





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
    } else {
      console.log('No se encontró el familiar');

    }

  };

 //---------------------FAMILIAR ELEGIDO- HASTA ACÀ------------------------------------->



  useEffect(() => {
/*     console.log('el familiar FamiliarSeleccionadoDatos --x--x-x-->:', FamiliarSeleccionadoDatos); 
    console.log('la especialidad EspecialidadSeleccionadaDatos --x--x-x-->:', EspecialidadSeleccionadaDatos);  */
    console.log('los nombresPrestadores --x--x-x-->:', NombresDePrestadores); 
    console.log('el useState IdPrestadorElegido --x--x-x-->:', IdPrestadorElegido); 
    console.log('el useState PrestadoresObtenidosObjeto --x--x-x-->:', PrestadoresObtenidosObjeto); 
    console.log('el useState IdEspecialidadElegida--x--x-x-->:', IdEspecialidadElegida); 
 
    const obtenerFamiliaresConsulta = async () => {

      try {
        if (idAfiliado !== undefined) {
          const FamiliaresObtenidosObjeto = await ObtenerFamiliares(idAfiliado);
     /*      console.log('familiares obtenidos objeto datos--->', FamiliaresObtenidosObjeto); */
          
          setFamiliaresObtenidosObjeto(FamiliaresObtenidosObjeto);
          const nombresFamiliares = FamiliaresObtenidosObjeto.map((familiar) => familiar.apellidoYNombre);
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
          const nombresEspecialidades = especialidadesObtenidas.map((especialidad) => especialidad.nombreParaAfiliado);
          setNombresDeEspecialidades(nombresEspecialidades)
          return especialidadesObtenidas

        } else {
          console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerEspecialidades.');
        }
      } catch (error) {
        console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerEspecialidades desde el ConsultaScreen.');
      }
    };
    const obtenerPrestadoresConsulta = async () => {
      try {
        console.log('----x----x------idAfiliado --x--x-x-->:', idAfiliado); 
    console.log('x----x------idAfiliadoTitular --x--x-x-->:', idAfiliadoTitular); 
    console.log('x----x------IdEspecialidadElegida--x--x-x-->:', IdEspecialidadElegida); 
        if (idAfiliado !== undefined && idAfiliadoTitular !== undefined && IdEspecialidadElegida !== undefined) {
          const PrestadoresObtenidos = await ObtenerPrestadores(idAfiliado, idAfiliadoTitular, IdEspecialidadElegida);
          setPrestadoresObtenidosObjeto(PrestadoresObtenidos);
          const nombresPrestadores = PrestadoresObtenidos.map((prestador:any) => prestador.nombreParaAfiliado);
          setNombresDePrestadores(nombresPrestadores)
          return PrestadoresObtenidos

        } else {
          console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerEspecialidades.');
        }
      } catch (error) {
        console.error('idAfiliado  o idAfiliadoTitular es undefined. No se puede llamar a ObtenerEspecialidades desde el ConsultaScreen.');
      }
    };
    obtenerFamiliaresConsulta();
    obtenerEspecialidadesConsulta();
    obtenerPrestadoresConsulta();
  }, [selectedFamiliarNombre, SelectedEspecialidadNombre, IdEspecialidadElegida,SelectedPrestadorNombre])



  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View style={globalStyles.container}>

      <CustomHeader />

      <BackButton />

      <Text style={{ marginBottom: 20, marginTop: 20, fontSize: 20, textAlign: 'center', backgroundColor: 'orange'}}>Solicitar orden de consulta screenFinal</Text>
      
      <View
        style={{ flex: 1, backgroundColor: 'green', marginBottom: 25/*  alignItems: 'center' */ }}>

        <View style={{ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', backgroundColor: 'yellow', }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 10 }}>Selecciona un familiar</Text>

          <Picker
            style={globalStyles.inputIOS}/* esto no funciona */
            selectedValue={selectedFamiliarNombre !== null ? selectedFamiliarNombre : undefined}
            onValueChange={(itemValue: string | number, itemIndex: number) =>
              handleSelectFamiliar(itemValue, itemIndex)
            }
            itemStyle={{
              fontSize: 15,
              fontFamily: 'Quicksand-Light',
              flex: 1,
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              color: 'black',
              alignItems: 'center',            
            }}
           
          >
            {nombresDeFamiliares.map((item, index) => (
              <Picker.Item style={{ marginVertical: 0 }} key={index} label={item} value={item}

              />
            ))}
          </Picker>
        </View>
        {/* -----------------ESPECIALIDAD---------------- */}
        <View style={{ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', backgroundColor: 'yellow', }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 10 }}>Selecciona una Especialidad</Text>

          <Picker
            style={globalStyles.inputIOS}
            selectedValue={SelectedEspecialidadNombre !== null ? SelectedEspecialidadNombre : undefined}
            onValueChange={(itemValue: string | number, itemIndex: number) =>
              handleSelectEspecialidad(itemValue, itemIndex)
            }
            itemStyle={{
              fontSize: 15,
              fontFamily: 'Quicksand-Light',
              flex: 1,
              padding: 0,
              margin: 0,
              color: 'black',
              alignItems: 'center'
            }}
          >
            {NombresDeEspecialidades.map((item, index) => (
              <Picker.Item style={{ marginVertical: 0 }} key={index} label={item} value={item}

              />
            ))}
          </Picker>
        </View>
        {/* -----------------PRESTADOR---------------- */}
        <View style={{ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', backgroundColor: 'yellow', }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 5, marginTop: 10 }}>Selecciona un Prestador</Text>

          <Picker
            style={globalStyles.inputIOS}
            selectedValue={SelectedPrestadorNombre !== null ? SelectedPrestadorNombre : 'seleccione familiar y especialidad'}
            onValueChange={(itemValue: string | number, itemIndex: number) =>
              handleSelectPrestador(itemValue, itemIndex)
            }
            itemStyle={{
              fontSize: 15,
              fontFamily: 'Quicksand-Light',
              flex: 1,
              padding: 0,
              margin: 0,
              color: 'black',
              alignItems: 'center'
            }}
          >
            {NombresDePrestadores.map((item, index) => (
              <Picker.Item style={{ marginVertical: 0 }} key={index} label={item} value={item}

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

