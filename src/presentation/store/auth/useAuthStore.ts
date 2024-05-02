import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, register } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/storageAdapter";
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import axios from "axios";
//Este es el Store que creamos con zustand para tener un Context de los datos y acceder a los mismos desde cualquier parte de la aplicacion.



export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string)=> Promise<boolean>;
    loginGonza: (email: string, password: string)=> Promise<boolean>;
    checkStatus: ()=> Promise<void>;
    logout: ()=> Promise<void>;
    registerUser: (email: string, password: string, fullName: string)=> Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get)=> ({
    status:'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => { 
        
        const resp = await authLogin( email, password);

        if( !resp){
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return false;
        }

        //TODO: Save token and user in storage 
      
        await StorageAdapter.setItem( 'token', resp.token );

      /*    esta es una prueba para ver si funciona : */
        const storedToken =  await StorageAdapter.getItem( 'token' );
        console.log({storedToken});
       /*  console.log({ resp }); */
        
        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    },
    loginGonza: async (email: string, password: string) => { 
        try {

            let data= {
                email: email,
                pass: password,
              }
              console.log('email y password recibido en loginGonza:', email, password);
              
              const respuestaFranco = await axios.post('https://cotizador.createch.com.ar/login', data);
console.log('esta es la respuesta de Franco: ', respuestaFranco );

              if (respuestaFranco.data.status === 200) {
                console.log('Ingreso aprobado');
                set({ status: 'authenticated' });
                return true; 
              } else {
                console.log('El servidor respondió con un estado diferente a 200');
                set({ status: 'unauthenticated'})
                return false
              }
        }catch (error) {
            console.error('Error al iniciar sesión:', error);
            return false; // Devolver false en caso de error
          }
        },
     /*    const respuestaFranco = await axios.post('https://cotizador.createch.com.ar/login');

        if (respuestaFranco.data.status === 200) {
            console.log('ingreso aprobado');
            set({ status: 'authenticated' });

        return true;
           }  */
      /*   if( respuestaFranco.data.status !== 200){
            set({ status: 'unauthenticated'})
            return false;
        } */
 
       /*  await StorageAdapter.setItem( 'token', resp.token ); */
//vas a tener que guardar el correo y contraseña para hacer otras consultas mientras usa la app asique TODO : Guardarlas en store siguiendo este modelo: 

       /*  const storedToken =  await StorageAdapter.getItem( 'token' );
        console.log({storedToken}); */
       /*  console.log({ resp }); */
   /*     return false;   
    }, */

    registerUser: async (email: string, password: string, fullName: string) => { 
        try {

            const resp = await register( email, password, fullName);
            console.log('Respuesta de la petición de registro:', resp);
            if( !resp){
                set({ status: 'unauthenticated', token: undefined, user: undefined })
                throw new Error('Registro fallido perro');
           
            }
            //TODO: Save token and user in storage 
         /*    await StorageAdapter.setItem( 'token', resp.token ); */
           
            set({ status: 'registered', token: resp.token, user: resp.user });

        } catch(err){
            console.error('Error en el registro:', err); 
            throw err;
        }

    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp){
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return;
        }      
        await StorageAdapter.setItem( 'token', resp.token );
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