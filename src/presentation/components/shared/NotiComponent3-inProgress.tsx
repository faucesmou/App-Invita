import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { xml2js } from 'xml-js';
import { useNotificationStore } from '../../store/notification-store';
import { useAuthStore } from '../../store/auth/useAuthStore';


interface Notificacion {
  idOrden: string;
  visto: string;
}

const NotiComponent3 = () => {
  console.log('entrando a noti component3--->', );
 
  
  const { idAfiliado } = useAuthStore();
/*   const setMedicalNotifications = useNotificationStore((state) => state.setMedicalNotifications); */
/*   const setOrderNotifications = useNotificationStore((state) => state.setOrderNotifications); */
/*   const { orderNotifications, medicalNotifications } = useNotificationStore(); */
  const combinedNotifications = useNotificationStore((state) => state.combinedNotifications);
 
  const { initialLoadComplete, setInitialLoadComplete } = useNotificationStore();
//este es el ultimo:
  const { medicalNotifications, setMedicalNotifications, orderNotifications, setOrderNotifications } = useNotificationStore.getState();
  
  useEffect(() => {
    const fetchNotifications = async () => {
  const ProductsRequest = async () => {
    console.log('Ingresando en ProductsRequest-->>>>>>>');
    try {
   
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENPRAC?idAfiliado=${idAfiliado}&IMEI=`);
      const xmlData = response.data;
      const result = xml2js(xmlData, { compact: true });
        // @ts-ignore
      const tablaDatos = result.Resultado?.tablaDatos;
       // @ts-ignore
      const tablaDetalle = result.Resultado?.tablaDetalle;


            // @ts-ignore
            const notificacionesData = result.Resultado?.tablaDatos;

            if (!notificacionesData) {
              console.log('En ProductsRequest notificacionesData es undefined: No hay notificaciones de Estudios Medicos para este usuario.');
              setMedicalNotifications([]);  
              
              return;
            }
    
            /* paso previo vemos como estan las notificaciones en el context actualmente:  */

            const existingNotifications = medicalNotifications; // Obtener el estado actual

            //mapear los datos teniendo en cuenta los anteriores cambio nuevo: 
            const mappedNotificaciones: Notificacion[] = Array.isArray(notificacionesData.idOrden) ? notificacionesData.idOrden.map((_: any, index: number) => {
              const idOrden = notificacionesData.idOrden[index]._text;
              const existingNotification = existingNotifications.find(notif => notif.idOrden === idOrden);
    
              return {
                idOrden: idOrden,
                visto: existingNotification ? existingNotification.visto : 'no visto',
              };
            }) : [];
    
            setMedicalNotifications(mappedNotificaciones);  

            // Mapear los datos 
         /*    const mappedNotificaciones: Notificacion[] = Array.isArray(notificacionesData.idOrden) ? notificacionesData.idOrden.map((_: any, index: number) => ({
              idOrden: notificacionesData.idOrden[index]._text,
              visto: 'no visto'
            })) : [];


            setMedicalNotifications(mappedNotificaciones);  */ 
            console.log('medicalNotifications es: ---------------->', medicalNotifications);

    } catch (error) {
      console.error('Error en ProductsRequest de NOTI COMPONENT Estudios Medicos notificacion error:', error);
    }
  };

  const CombinedData2 = async () => {
    console.log('Ingresando en CombinedData2 de NOTI COMPONENT3 notificaciones de orden de consulta -->>>>>>>');
    try {
   
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENAMB?idAfiliado=${idAfiliado}&IMEI=`);
      const xmlData = response.data;
      const result = xml2js(xmlData, { compact: true });
       // @ts-ignore
      const tablaDatos = result.Resultado?.tablaDatos;
       // @ts-ignore
      const tablaDetalle = result.Resultado?.tablaDetalle;

      if (!tablaDatos || !tablaDetalle) {
        console.log('En CombinedData2 tablaDatos o tablaDetalle es undefined: No hay notificaciones de ordenes de consulta para este afiliado.');
        setOrderNotifications([]);
        return;
      }

      const idOrden = tablaDatos.idOrden.map((item: any) => (item._text || '').trim());
    /*   const prestador = tablaDatos.prestador.map((item: any) => (item._text || '').trim()); */
      
/* paso previo consultar el estado anterior de las notificaciones y compararlas para no superponer con las entrantes: */
    const existingNotifications = orderNotifications; // Obtener el estado actual
    const combinedData = idOrden.map((id: string, index: number) => {
      const existingNotification = existingNotifications.find(notif => notif.idOrden === id);

      return {
        idOrden: id,
        visto: existingNotification ? existingNotification.visto : 'no visto',
      };
    });

    setOrderNotifications(combinedData);
  

     /*  const combinedData = idOrden.map((id: string, index: number) => ({
        idOrden: id,
        visto: 'no visto',
      }));

      setOrderNotifications(combinedData); */
   /*    console.log('orderNotifications es: ---------------->', orderNotifications); */
    } catch (error) {
      console.error('Error en Noti Component 3. en CombinedData2:', error);

    }
  }

    await ProductsRequest();
    await CombinedData2();
    console.log('idAfiliado--->', idAfiliado);
    console.log('se actualizaron las notificaciones--->', );
  }
  fetchNotifications()

/*  if (!initialLoadComplete) {
     console.log('initialLoadComplete esta en false asique se activa el notificador 1 vez--->', );
    fetchNotifications()
    setInitialLoadComplete(true);
    console.log('initialLoadComplete se seteo en true-->', );
  } */


  const intervalId = setInterval(fetchNotifications, 500000); // Intervalo de 50 segundos

  return () => clearInterval(intervalId);
}, [idAfiliado,  setMedicalNotifications, setOrderNotifications ]);


return null; 
}
/* const unseenCount = combinedNotifications.filter((notification) => notification.visto === 'no visto').length; */

export default NotiComponent3;
