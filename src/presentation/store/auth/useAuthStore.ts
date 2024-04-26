import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, register } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/storageAdapter";

//Este es el Store que creamos con zustand para tener un Context de los datos y acceder a los mismos desde cualquier parte de la aplicacion.



export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string)=> Promise<boolean>;
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
            
            return;
           
    },


}))