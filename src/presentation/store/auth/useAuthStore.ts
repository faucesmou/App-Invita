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
  loginGonzaMejorado: (email: string, password: string, dni: string) => Promise<boolean>;
  ObtenerFamiliares: (idAfiliado: string)=> Promise<string[]>;
  ObtenerEspecialidades: (idAfiliado: string, idAfiliadoTitular:string)=> Promise<any[]>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  registerUser: (email: string, password: string, fullName: string) => Promise<void>;
}


export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
  idAfiliado: undefined,
  idAfiliadoTitular: undefined,
  idsFamiliares:[],
  idsEspecialidades:undefined,


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
  ObtenerFamiliares: async (idAfiliado: string): Promise<string[]> => {
    //funcion para manejar la respuesta de la API y guardar solo los ids de cada familiar
    const obtenerIdsFamiliares = (respuestaApi:string) =>{
      try{
      const respuesta = JSON.parse(respuestaApi);
      const idsFamiliares:string[] = [];
      respuesta.data.forEach((familiar: { idAfiliado: string }) =>{
        idsFamiliares.push(familiar.idAfiliado)
      });
      
      return idsFamiliares;
    } catch(error){
      console.log('error en la funcion obtenerIdsFamiliares');
      return []
    }}

    try {
      const grupoFamiliar = await axios.get(`https://andessalud.createch.com.ar/api/obtenerFamiliares?idAfiliado=${idAfiliado}`)
      
    const idsFamiliares2 = obtenerIdsFamiliares(JSON.stringify(grupoFamiliar.data))
    set({ idsFamiliares: idsFamiliares2 })/* esto no esta funcionando resolver */
    return idsFamiliares2; 
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
      const idsEspecialidades:any[] = [];       

      respuesta.data.forEach((especialidad: any ) => {
        const especialidadObj = {
          idPrestacion: especialidad.idPrestacion,
          nombreParaAfiliado: especialidad.nombreParaAfiliado
      };
      idsEspecialidades.push(especialidadObj);
      /*   const arrayEspecialidad = [especialidad.idPrestacion, especialidad.nombreParaAfiliado,]
        idsEspecialidades.push(arrayEspecialidad); */
       
      });
      
      return idsEspecialidades;
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