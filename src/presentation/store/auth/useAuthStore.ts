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
  loginGonzaMejorado: (email: string, password: string, dni: string) => Promise<boolean>;
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