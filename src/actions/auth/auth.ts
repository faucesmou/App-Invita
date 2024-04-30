
import axios from "axios";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";
import { tesloApi } from "../../presentation/config/api/tesloApi";
/* colocar el type luego del import mejora la velocidad y el bundle size de la aplicacion */

const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles,
    }
    return {
        user: user,
        token: data.token,
    }
}
//esta es mi funcion de prueba de login integrada con andes salud
export const login2 = async(data: object) => {
 
    const response = await axios.post('https://cotizador.createch.com.ar/login', data)
   return response.data
}

export const authLogin = async (email: string, password: string) => {

    email = email.toLowerCase();

    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);

    } catch (error) {
        console.log({error});
        return null
        
    }
}

export const register = async (email: string, password: string, fullName: string) => {

    email = email.toLowerCase();

    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email,
            password,
            fullName,
        });

        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        throw error;
    }
}