import AsyncStorage from "@react-native-async-storage/async-storage";

//Este es el Store que creamos con ASYNC STORAGE para guardar datos del usuario y poder habilitarlo a usar la aplicacion, sin tener que hacer el login cada vez que hay que hacer una peticiòn o acceder a un recurso mientras navega por ella. 


export class StorageAdapter {

    static async getItem(key: string): Promise<string|null> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }
    
    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            throw new Error(`Error setting item ${key}  ${value}`)
        }
    }

    static async removeItem ( key: string ): Promise<void>  {

        try {
            await AsyncStorage.removeItem(key);
            
        } catch (error) {
            console.log(error);
            throw new Error(`Error removing item ${ key }`);

        }
    }  
    }
/* Esto es basicamente un adaptador. Adaptamos un codigo de terceros a nuestra app */

/* Esta es una adaptacion, si en el futuro queremos cambiarlo por otro paquete: cambiamos AsyncStorage.getItem y no hace falta cambiar ninguna otra parte del codigo */