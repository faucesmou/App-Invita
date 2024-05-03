import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, register } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/storageAdapter";
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import axios from "axios";

//Este es el Store que creamos con zustand para tener un Context de los datos y acceder a los mismos desde cualquier parte de la aplicacion.

export const useCredentialStore = create((set, get)=> ({
    status:'checking',
    token: undefined,
    user: undefined,


    consultaDatosCredencial: async (queryIdAfiliado: string, password: string) => { 
        
        let response = await axios({
            method: 'get',
            url: `https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscaDatoCredencial?IMEI=ADMCE09D187-8D2C-4592-AE43-87B0D657299C&idAfiliado=${queryIdAfiliado}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let data = await response.data
            let resultado = convert.xml2json(data, { compact: true, spaces: 4 })
            let parseado = JSON.parse(resultado)

            let nombreAfiliado = parseado.Resultado.fila.tablaEncabezado.nombreAfiliado._text
            let numAfiliado = parseado.Resultado.fila.tablaEncabezado.numAfiliado._text
            let fecVencimiento = parseado.Resultado.fila.tablaEncabezado.fecVencimiento._text
            let tipoTarjeta = parseado.Resultado.fila.tablaEncabezado.tipoTarjeta._text

            tipoTarjeta = tipoTarjeta.substring(tipoTarjeta.lastIndexOf(' ') + 1).toLowerCase()

            res.render('credencial', {
                plan: tipoTarjeta,
                nombreAfiliado,
                numAfiliado,
                fecVencimiento
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        },
    

    login3: async (email: string, password: string) => { 
        
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
    

 
    
   
        
        
    }))
    
