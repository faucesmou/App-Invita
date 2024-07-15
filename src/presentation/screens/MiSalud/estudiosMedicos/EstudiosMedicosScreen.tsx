import React, { useEffect, useState } from 'react'
import { Text, View, Alert, TextInput, ScrollView, Image  } from 'react-native'
import { xml2js } from 'xml-js';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { RootStackParams } from '../../../routes/StackNavigator';
import { globalColors, globalStyles } from '../../../theme/theme';
import CustomHeader from '../../../components/CustomHeader';
import { BackButton } from '../../../components/shared/BackButton';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import UploadImage from '../../../components/shared/UploadImage';
/* import { ScrollView } from 'react-native-gesture-handler'; */
import { TertiaryButton } from '../../../components/shared/TertiaryButton';
import { IonIcon } from '../../../components/shared/IonIcon';
import Divider from '../../../components/shared/Divider';




export const EstudiosMedicosScreen = () => {


  const { ObtenerFamiliares, idAfiliado, idAfiliadoTitular, cadena, ObtenerPrestadoresEstudiosMedicos, GuardarIdPrestador, GuardarIdFamiliarSeleccionado, GuardarImagenes } = useAuthStore();

  //---------------------LOGICA PARA BORRAR CUALQUIER DATO RESIDUAL QUE HAY A QUEDADO EN EL CONTEXT-------------------------------------->
  useEffect(() => {
    const resetContextValues = async () => {
      try {
        // Restablecer los valores en el contexto
        await GuardarImagenes([null, null, null, null, null]);
        await GuardarIdPrestador('');
        await GuardarIdFamiliarSeleccionado('');

        const { imagenes, idPrestador, idAfiliadoSeleccionado } = useAuthStore.getState();

        if (imagenes.every(img => img === null) && idPrestador === '' && idAfiliadoSeleccionado === '') {
          console.log('ENTRANDO A ESTUDIOS MEDICOS: Todos los valores: imagenes, idPrestador y idAfiliadoSeleccionado fueron borrados del contexto.');
        } else {
          console.log('Algunos valores NO fueron borrados del contexto idPrestador: ', idPrestador);
        }

        if (idPrestador === '') {
          console.log('idPrestador fue borrado correctamente:', idPrestador);
        } else {
          console.log('idPrestador NO fue borrado:', idPrestador);
        }
      } catch (error) {
        console.log('Error en la carga inicial de la vista y borrado de datos iniciales:', error);
      }
    };

    resetContextValues();
  }, []);


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
      GuardarIdFamiliarSeleccionado(idAfiliado);
      console.log('datos FamiliarSeleccionadoDatos', FamiliarSeleccionadoDatos);
      console.log('datos de familiar encontrado: apellidoYNombre + idAfiliado -->-->-->--> ', apellidoYNombre, idAfiliado);
      
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
  const [NumeroPrestadoresEncontrados, setNumeroDePrestadoresEncontrados] = useState<number>(0);
 

  //--------------------- LOGICA PARA EL INPUT DE BÙSQUEDA DE PRESTADOR-------------------------------------->
  const [isPosting, setIsPosting] = useState(false)
  const [busqueda, setBusqueda] = useState({ cadena: '' })



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
        console.log('nombresPrestadores-->', nombresPrestadores);
        

        if (nombresPrestadores.length === 0) {
          setNombresDePrestadores(["No se encontraron prestadores"]);
          setNumeroDePrestadoresEncontrados(0)
             } else {
          setNombresDePrestadores(nombresPrestadores);
          let CantidadDePrestadoresEncontrados = nombresPrestadores.length;
          setNumeroDePrestadoresEncontrados(CantidadDePrestadoresEncontrados)
          // Si solo hay un prestador, seleccionarlo automáticamente:
          if (nombresPrestadores.length === 1) {
            handleSelectPrestador(nombresPrestadores[0], 0);
            setNumeroDePrestadoresEncontrados(1)
          }          
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
/* Por el momento no se usa este handle porque he quitado el botón "buscar prestador" y se busca automaticamente mientras el usuario escribe. */
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

    setSelectedPrestadorNombre(NombresDePrestadores[itemIndex]);


    // Asegúrate de que `itemValue` es una cadena
    const selectedNombre = typeof itemValue === 'string' ? itemValue : itemValue.toString();

    const PrestadorEncontrado: any = PrestadoresObtenidosObjeto.find(prestador => prestador.nombre === selectedNombre);
    if (PrestadorEncontrado) {
      setPrestadorSeleccionadoDatos(PrestadorEncontrado)
      const { nombre, idConvenio }: { nombre: string, idConvenio: string } = PrestadorEncontrado;
      setIdPrestadorElegido(idConvenio)
      GuardarIdPrestador(idConvenio)
      console.log('datos de PrestadorEncontrado:-->-->-->--> nombre + idConvenio', nombre, idConvenio);
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
  }, [NombresDePrestadores, IdPrestadorElegido, ]);

  useEffect(() => {

    const obtenerFamiliaresConsulta = async () => {

      try {
        if (idAfiliado !== undefined) {
          const FamiliaresObtenidosObjeto = await ObtenerFamiliares(idAfiliado);
       
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
  }, [/* selectedFamiliarNombre, */ /* SelectedEspecialidadNombre, */ /* IdEspecialidadElegida,*/ /* SelectedPrestadorNombre *//* IdPrestadorElegido */])



  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View style={globalStyles.container}>

      <CustomHeader color={globalColors.gray2} titleSize={33} />

      <BackButton />

  {/*     <Text style={{ marginBottom: 5, marginTop: 10, fontSize: 25, textAlign: 'center'}}>Solicitar Estudio Médico</Text> */}

      <View
        style={{   /* backgroundColor: 'green', */ flex: 1, marginBottom: 60, marginTop: 10 }}>
        {/*   <ScrollView> */}

        {/* -----------------FAMILIAR---------------- */}

        <View style={{  /*  backgroundColor: 'orange', */  borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', marginBottom: 10 }}>
          <Text style={{ /* backgroundColor: 'yellow', */ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 5 }}>Selecciona un familiar</Text>
          <View style={globalStyles.pickerWrapper2}>
          <View style={{  marginTop: 10 }}>
          <IonIcon name='chevron-down-outline' size={30} color="#505050" /* style={globalStyles.icon} */ />
            </View>
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

      


        {/* -----------------INPUT 2 PARA ESCRIBIR EL PRESTADOR---------------- */}
        <Divider />


        <View style={globalStyles.containerInput2} >
        <Text style={{ /* backgroundColor: 'yellow', */ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 15 }}>Selecciona un prestador</Text>
          <TextInput
            style={globalStyles.estilosInput2}
            placeholder="Escriba aquí el prestador deseado"
            placeholderTextColor="gray"
            value={busqueda.cadena}
            onChangeText={(cadena) => setBusqueda({ cadena })}

          />
        </View>

         {/* -----------------PRESTADOR---------------- */}

        <View style={{ borderRadius: 10, overflow: 'hidden', marginVertical: 5, justifyContent: 'center', marginBottom: 25 }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Prestadores encontrados: {NumeroPrestadoresEncontrados} </Text>
        {/*   <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Desliza verticalmente para visualizarlos:</Text> */}
          
          <View style={globalStyles.pickerWrapper2}>
       {/*    <Image 
            source={require('../../../assets/images/logogris.png')} 
            style={globalStyles.arrowImage} 
            resizeMode="contain" // Ajusta la imagen manteniendo su relación de aspecto
            /> */}
             <View style={{  marginTop: 10 }}>
          <IonIcon name='chevron-down-outline' size={30} color="#505050" /* style={globalStyles.icon} */ />
            </View>
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
          <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Prestador Seleccionado:</Text>

        <View
            style={{ borderRadius: 15,
              paddingHorizontal: 10, 
              paddingVertical: 5,
              marginHorizontal: 40,
              backgroundColor: SelectedPrestadorNombre ? globalColors.gray3 : 'white' 
            }}
            >
          <Text style={{ 
            fontSize: 15, 
            textAlign: 'center', 
            marginBottom: 5, 
            marginTop: 5, 
            
             }}
             >{SelectedPrestadorNombre} </Text>

      
          </View>
        </View>

        {/* componente para cargar imagenes: */}
        <Divider />
        <UploadImage />
 

         <TertiaryButton
          onPress={() => navigation.navigate('Estudios enviados')}
          label="Solicitar mi estudio"
          color={globalColors.profile2}
          iconName='medkit-outline'
         description='Presiona aquí para continuar' 
        />
        
      </View>
      
    </View>
  )
}

       {/*  <PrimaryButton
          onPress={() => navigation.navigate('EstudiosMedicosEnviados')}
          label=" Solicitar Estudios Medicos"
        /> */}
       {/* -----------------INPUT 1 POSIBLE PARA ESCRIBIR EL PRESTADOR (VARIANTE)---------------- */}
{/* La desventaja de este input es que no logro customisar el placeholder */}
       
        {/*   <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder="Escriba un prestador para buscar"
            autoCapitalize="none"
            value={busqueda.cadena}
            onChangeText={(cadena) => setBusqueda({ cadena })}
            accessoryLeft={<MyIcon name="arrowhead-right-outline" />}
            style={{ marginBottom: 10}}         
          />
        </Layout> */}
        
        {/* BOTON OPCIONAL 1 PARA EJECUTAR LA BÙSQUEDA: */}

        {/* <Layout style={{
          marginHorizontal: 90,
        }}>
          <PrimaryButton
            onPress={() => HandleBuscarPrestador()}
            label=" Buscar Prestador"
            disabled={isPosting}
          />
        </Layout> */}

/* BOTON OPCIONAL 2 PARA EJECUTAR LA BÙSQUEDA:  */

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