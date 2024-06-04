import React, { useEffect, useState } from 'react'
import { Text, View, Alert } from 'react-native'
import { xml2js } from 'xml-js';
import { Picker } from '@react-native-picker/picker';

import { NavigationProp, useNavigation } from '@react-navigation/native'

import { IndexPath, Layout, Select, SelectItem, SelectGroup, Input, InputProps, Button } from '@ui-kitten/components'
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { RootStackParams } from '../../../routes/StackNavigator';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { BackButton } from '../../../components/shared/BackButton';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { MyIcon } from '../../../components/ui/MyIcon';



interface MyInputProps extends InputProps {
  placeholderStyle: {
    fontSize?: number; // Define las propiedades que necesitas
  };
}
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
  const [NombresDePrestadores, setNombresDePrestadores] = useState<string[]>([' Incluya al menos 3 caracteres']);
  const [SelectedPrestadorNombre, setSelectedPrestadorNombre] = useState<string | null>(null);
  const [PrestadorSeleccionadoDatos, setPrestadorSeleccionadoDatos] = useState<string[]>([]);
  const [IdPrestadorElegido, setIdPrestadorElegido] = useState<string>('');

  //--------------------- LOGICA PARA EL INPUT DE BÙSQUEDA DE PRESTADOR-------------------------------------->
  const [isPosting, setIsPosting] = useState(false)
  const [busqueda, setBusqueda] = useState({ cadena: '' })
  const [clickedSearch, setClickedSearch] = useState<boolean>(false);

  const obtenerPrestadoresConsulta = async () => {

  /*   if (busqueda.cadena.length > 1 && busqueda.cadena.length < 3) {
      Alert.alert('Error', 'La bùsqueda debe incluir al menos 3 caracteres');
      return false;
    }; */

    try {

      if (idAfiliado !== undefined && busqueda.cadena !== '') {
        const PrestadoresObtenidos: any = await ObtenerPrestadoresEstudiosMedicos(idAfiliado, busqueda.cadena);
        setPrestadoresObtenidosObjeto(PrestadoresObtenidos);

        const nombresPrestadores = PrestadoresObtenidos.map((prestador: any) => {
          if (Array.isArray(prestador.nombre)) {
            return prestador.nombre[0];
          } else {
            return prestador.nombre;
          }
        });

        if (nombresPrestadores[0] === "No se encontraron prestadores para la busqueda indicada.") {
          setNombresDePrestadores(["Elija familiar y prestador"]);
        } else {
          setNombresDePrestadores(nombresPrestadores);
           // Si solo hay un prestador, seleccionarlo automáticamente
           if (nombresPrestadores.length === 1) {
            handleSelectPrestador(nombresPrestadores[0], 0);
          }
          console.log('nombresPrestadores:---->', nombresPrestadores);
          
        }
       
        return true;

      } else {
     
        console.log('idAfiliado  o cadena esta vacio. No se puede llamar a ObtenerPrestadoresEstudiosMedicos.');
        return false;
      }
    } catch (error) {
      console.log(' No se puede llamar a ObtenerPrestadoresEstudiosMedicos desde el EstudiosMedicosScreen.');
    }
  };

  const HandleBuscarPrestador = async () => {

    setIsPosting(true);
    const respuestaExitosa = await obtenerPrestadoresConsulta()
    setIsPosting(false);
    if (!respuestaExitosa) {
      Alert.alert('Error', 'Dificultades tecnicas en la busqueda');
      return;
    }
    return;
  }


    const handleSelectPrestador = (itemValue: string | number, itemIndex: number) => {
      console.log('entrando a handleSelectPrestador--->', itemValue, itemIndex );
      setSelectedPrestadorNombre(NombresDePrestadores[itemIndex]);

      console.log('SelectedPrestadorNombre--->', SelectedPrestadorNombre );
      console.log('PrestadoresObtenidosObjeto--->', PrestadoresObtenidosObjeto );
      
      // Asegúrate de que `itemValue` es una cadena
      const selectedNombre = typeof itemValue === 'string' ? itemValue : itemValue.toString();

      const PrestadorEncontrado: any = PrestadoresObtenidosObjeto.find(prestador => prestador.nombre === selectedNombre);
      if (PrestadorEncontrado) {
        setPrestadorSeleccionadoDatos(PrestadorEncontrado)
        const { nombre, idConvenio }: { nombre: string, idConvenio: string } = PrestadorEncontrado;
        console.log('Nombre del Prestador:', nombre);
        console.log('ID del convenio del Prestador:', idConvenio);
        setIdPrestadorElegido(idConvenio)
        GuardarIdPrestador(idConvenio)
      } else {
        console.log('No se encontró la especialidad');
      }
    }; 

    useEffect(() => {
      obtenerPrestadoresConsulta();
    }, [idAfiliado, busqueda.cadena]);
  
    useEffect(() => {
      // Si solo hay un prestador y no hay uno seleccionado, seleccionarlo automáticamente
      if (NombresDePrestadores.length === 1 && !SelectedPrestadorNombre) {
        handleSelectPrestador(NombresDePrestadores[0], 0);
      }
    }, [NombresDePrestadores]);

  useEffect(() => {

    console.log('FamiliarSeleccionadoDatos------>>>', FamiliarSeleccionadoDatos);
   
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
        style={{  /* backgroundColor: 'black', */  flex: 1, marginBottom: 30, marginTop: 35 }}>

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
            placeholder="Escriba un prestador para buscar"
            autoCapitalize="none"
            value={busqueda.cadena}
            onChangeText={(cadena) => setBusqueda({ cadena })}
            accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
            style={{ marginBottom: 10 }}
         
          
          />
        </Layout>

{/* BOTON OPCIONAL PARA EJECUTAR LA BÙSQUEDA: */}

        {/* <Layout style={{
          marginHorizontal: 90,
        }}>
          <PrimaryButton
            onPress={() => HandleBuscarPrestador()}
            label=" Buscar Prestador"
            disabled={isPosting}
          />
        </Layout> */}




        {/* -----------------PRESTADOR---------------- */}

        <View style={{ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', marginBottom: 25 }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Prestadores encontrados:</Text>
          <View style={globalStyles.pickerWrapper}>
            <Picker
              style={globalStyles.inputIOS}
               selectedValue={SelectedPrestadorNombre !== null ? SelectedPrestadorNombre : undefined}
              onValueChange={(itemValue: string | number, itemIndex: number) =>
                 handleSelectPrestador(itemValue, itemIndex)
               }  
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

/* BOTON OPCIONAL PARA MANEJAR LA BÙSQUEDA:  */

{/*  <Layout style={{
                   marginTop: 5,
                   borderRadius: 25,
                   marginBottom: 5,
                   marginHorizontal: 80,
                   marginVertical:90,
                   paddingHorizontal: 0,
                   paddingVertical:0,
                 }}>
                   <Button
                     disabled={isPosting}
                     accessoryRight={<MyIcon name="arrow-forward-outline" white />}
                     onPress={HandleBuscarPrestador}
                     style={{ ...globalStyles.searchButton, backgroundColor: globalColors.profile2 }}
                    
                   >
                      {() => (
                   <Text   style={globalStyles.searchButtonText}>
                     Buscar Prestador
                   </Text>
                 )}
                
                   </Button>
         
                 </Layout> */}