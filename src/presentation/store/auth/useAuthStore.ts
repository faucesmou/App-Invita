import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, register } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/storageAdapter";
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import axios from "axios";
//Este es el Store que creamos con zustand para tener un Context de los datos y acceder a los mismos desde cualquier parte de la aplicacion.
import { USUARIO, PASSWORD, ADMINISTRADORA, STAGE } from '@env';



export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  queryIdAfiliado?: string;
  idAfiliado?: string;
  idAfiliadoTitular?: string;
  idsFamiliares?:string[];
  idsEspecialidades?:string;
  idPrestacion?: string;
  idPrestador?: string;
  idAfiliadoSeleccionado?:string;
  idCartillaSeleccionada?:string;
  loginGonzaMejorado: (email: string, password: string, dni: string) => Promise<boolean>;
 /*  ObtenerFamiliares: (idAfiliado: string)=> Promise<string[]>; */
  ObtenerFamiliares: (idAfiliado: string, apellidoYNombre:string)=> Promise<any[]>;
  ObtenerEspecialidades: (idAfiliado: string, idAfiliadoTitular:string)=> Promise<any[]>;
  ObtenerPrestadores: (idAfiliado: string, idAfiliadoTitular:string, idPrestacion: string)=> Promise<any[]>;
  GuardarIdPrestador: (idPrestador: string)=> Promise<any[]>;
  GuardarIdFamiliarSeleccionado: (idAfiliado: string)=> Promise<any[]>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  registerUser: (email: string, password: string, fullName: string) => Promise<void>;
  GuardarIdCartillaSeleccionada:(idCartilla: string)=> Promise<any[]>;

}


export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
  idAfiliado: undefined,
  idAfiliadoTitular: undefined,
  idsFamiliares:[],
  idsEspecialidades:undefined,
  idPrestacion:undefined,
  idAfiliadoSeleccionado:undefined,
  idCartillaSeleccionada:undefined,


  loginGonzaMejorado: async (email: string, password: string, dni: string) => {
    try {

      let data = {
        email: email,
        pass: password,
        dni: dni,
      }
      console.log('email y password recibido en loginGonza:', email, password);
      console.log('usuario, password y administradora: en loginGonzaMejorado:', USUARIO, PASSWORD, ADMINISTRADORA);

      const respuestaFrancoMejorada = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/consultarAfiliadoJson?usuario=${USUARIO}&password=${PASSWORD}&administradora=${ADMINISTRADORA}&datosAfiliado=${dni}`);
      console.log('esta es la respuesta de Franco: ', respuestaFrancoMejorada);

      if (respuestaFrancoMejorada && respuestaFrancoMejorada.data && respuestaFrancoMejorada.data.length > 0) {
          const idAfiliado = respuestaFrancoMejorada.data[0].idAfiliado;
          const idAfiliadoTitular = respuestaFrancoMejorada.data[0].idAfiliadoTitular;
         
        console.log('idAfiliado', idAfiliado);
        console.log('idAfiliadoTitular', idAfiliadoTitular);

        console.log('Ingreso aprobado');
        set({ status: 'authenticated', idAfiliado: idAfiliado, idAfiliadoTitular: idAfiliadoTitular });
        return true;
      } else {
        console.log('El servidor respondió con un estado diferente a 200');
        set({ status: 'unauthenticated' })
        return false
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false; 
    }
  },
  ObtenerFamiliares: async (idAfiliado: string): Promise<any[]> => {
    //funcion para manejar la respuesta de la API y guardar solo los ids de cada familiar
    const obtenerFamiliaresObjeto = (respuestaApi:string) =>{
      try{
      const respuesta = JSON.parse(respuestaApi);
      const idsFamiliares:string[] = [];
      const infoFamiliares:any[] = [];  
      respuesta.data.forEach((familiar: { idAfiliado: string, apellidoYNombre:string }) =>{
        idsFamiliares.push(familiar.idAfiliado)
        const familiaresObj = {
          idAfiliado: familiar.idAfiliado,
          apellidoYNombre: familiar.apellidoYNombre
      };
      infoFamiliares.push(familiaresObj);
      });
      
      return infoFamiliares;
    } catch(error){
      console.log('error en la funcion obtenerIdsFamiliares');
      return []
    }}

    try {
      const grupoFamiliar = await axios.get(`https://andessalud.createch.com.ar/api/obtenerFamiliares?idAfiliado=${idAfiliado}`)
      
      
    const Familiares2 = obtenerFamiliaresObjeto(JSON.stringify(grupoFamiliar.data))

    
    /* set({ Familiares: Familiares2 }) *//* esto no esta funcionando resolver */
    return Familiares2; 
  } catch (error) {
      console.log('ha ocurrido un error al obtener los familiares');
     return [];
    }
  },
  ObtenerEspecialidades: async (idAfiliado: string, idAfiliadoTitular: string): Promise<string[]> => {
    //funcion para manejar la respuesta de la API y guardar solo los ids de cada familiar
    const obtenerIdsEspecialidades = (respuestaApi:string) =>{
      try{
      const respuesta = JSON.parse(respuestaApi);
      const infoEspecialidades:any[] = [];       

      respuesta.data.forEach((especialidad: any ) => {
        const especialidadObj = {
          idPrestacion: especialidad.idPrestacion,
          nombreParaAfiliado: especialidad.nombreParaAfiliado
      };
      infoEspecialidades.push(especialidadObj);
      /*   const arrayEspecialidad = [especialidad.idPrestacion, especialidad.nombreParaAfiliado,]
        idsEspecialidades.push(arrayEspecialidad); */
       
      });
      
      return infoEspecialidades;
    } catch(error){
      console.log('error en la funcion obtenerIdsFamiliares');
      return []
    }}

    try {
      const grupoEspecialidades = await axios.get(`https://andessalud.createch.com.ar/api/obtenerEspecialidad?idAfiliado=${idAfiliado}&idAfiliadoTitular=${idAfiliadoTitular}`)
      
    const idsEspecialidades = obtenerIdsEspecialidades(JSON.stringify(grupoEspecialidades.data))
    return idsEspecialidades; 
  } catch (error) {
      console.log('ha ocurrido un error al obtener los familiares');
     return [];
    }
  },
  ObtenerPrestadores: async (idAfiliado: string, idAfiliadoTitular: string, idPrestacion: string): Promise<string[]> => {
    //funcion para manejar la respuesta de la API y guardar solo los ids de cada familiar
    //guardo el id de la especialidad elegida en el context para recuperarla luego en la orden de consulta.
    set({ idPrestacion: idPrestacion })
    const obtenerPrestadoresObjeto = (respuestaApi:string) =>{
      try{
      const respuesta = JSON.parse(respuestaApi);
      const infoPrestadores:any[] = [];       

      respuesta.data.forEach((prestador: any ) => {
        const prestadoresObj = {
          idPrestador: prestador.idPrestador,
          prestador: prestador.prestador
      };
      infoPrestadores.push(prestadoresObj);
      /*   const arrayEspecialidad = [especialidad.idPrestacion, especialidad.nombreParaAfiliado,]
        idsEspecialidades.push(arrayEspecialidad); */
       
      });
      
      return infoPrestadores;
    } catch(error){
      console.log('error en la funcion obtenerPrestadoresObjeto');
      return []
    }}

    try {

      const grupoPrestadores = await axios.get(`https://andessalud.createch.com.ar/api/obtenerPrestador?idAfiliado=${idAfiliado}&idAfiliadoTitular=${idAfiliadoTitular}&idPrestacion=${idPrestacion}`)
    const informacionPrestadores = obtenerPrestadoresObjeto(JSON.stringify(grupoPrestadores.data))
    /* console.log('el useState informacionPrestadores --&&&----&&--&&-->:', informacionPrestadores); */
    return informacionPrestadores; 
  } catch (error) {
      console.log('ha ocurrido un error al obtener informacionPrestadores');
     return [];
    }
  },
  GuardarIdPrestador: async ( idPrestador: string): Promise<string[]> => {
    try {
      set({ idPrestador: idPrestador })
 
    return []; 
  } catch (error) {
      console.log('ha ocurrido un error al guardar idPrestador en el useAuthStore');
     return [];
    }
  },
  GuardarIdFamiliarSeleccionado: async ( idAfiliado: string): Promise<string[]> => {
    try {
      set({ idAfiliadoSeleccionado: idAfiliado })
 
    return []; 
  } catch (error) {
      console.log('ha ocurrido un error al guardar idAfiliado en el useAuthStore');
     return [];
    }
  },
  GuardarIdCartillaSeleccionada: async ( idCartilla: string): Promise<string[]> => {
    try {
      set({ idCartillaSeleccionada: idCartilla })
 
    return []; 
  } catch (error) {
      console.log('ha ocurrido un error al guardar idCartilla en el useAuthStore');
     return [];
    }
  },

  /* set({ idsEspecialidades: idsEspecialidades })esto no esta funcionando resolver */
  registerUser: async (email: string, password: string, fullName: string) => {
    try {
      const resp = await register(email, password, fullName);
      console.log('Respuesta de la petición de registro:', resp);
      if (!resp) {
        set({ status: 'unauthenticated', token: undefined, user: undefined })
        throw new Error('Registro fallido perro');
      }
      //TODO: Save token and user in storage 
      /*    await StorageAdapter.setItem( 'token', resp.token ); */

      set({ status: 'registered', token: resp.token, user: resp.user });

    } catch (err) {
      console.error('Error en el registro:', err);
      throw err;
    }

  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined })
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },

  logout: async () => {
    await StorageAdapter.removeItem('token')
    set({ status: 'unauthenticated', token: undefined, user: undefined })
    console.log('se cerró la sesion');
    return

  },


}))

/* navigation.closeDrawer(); */
/*    navigation.navigate('LoginScreen'); */