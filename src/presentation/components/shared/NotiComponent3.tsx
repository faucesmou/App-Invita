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
  const { idAfiliado } = useAuthStore();
  const setMedicalNotifications = useNotificationStore((state) => state.setMedicalNotifications);
  const setOrderNotifications = useNotificationStore((state) => state.setOrderNotifications);
  const combinedNotifications = useNotificationStore((state) => state.combinedNotifications);

  useEffect(() => {
    const fetchNotifications = async () => {
  const ProductsRequest = async () => {
    console.log('Ingresando en ProductsRequest-->>>>>>>');
    try {
   
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENPRAC?idAfiliado=${idAfiliado}&IMEI=`);
      const xmlData = response.data;
      const result = xml2js(xmlData, { compact: true });

      const tablaDatos = result.Resultado?.tablaDatos;
      const tablaDetalle = result.Resultado?.tablaDetalle;


            // @ts-ignore
            const notificacionesData = result.Resultado?.tablaDatos;

            if (!notificacionesData) {
              console.log('En ProductsRequest notificacionesData es undefined: No hay notificaciones para este usuario.');
              return;
            }
    
            // Mapear los datos 
            const mappedNotificaciones: Notificacion[] = Array.isArray(notificacionesData.idOrden) ? notificacionesData.idOrden.map((_: any, index: number) => ({
              idOrden: notificacionesData.idOrden[index]._text,
              visto: 'no visto'
            })) : [];
            setMedicalNotifications(mappedNotificaciones);     
    } catch (error) {
      console.error('Error en ProductsRequest de NOTI COMPONENT error:', error);
    }
  };

  const CombinedData2 = async () => {
    console.log('Ingresando en CombinedData2 de NOTI COMPONENT3 -->>>>>>>');
    try {
   
      const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENAMB?idAfiliado=${idAfiliado}&IMEI=`);
      const xmlData = response.data;
      const result = xml2js(xmlData, { compact: true });

      const tablaDatos = result.Resultado?.tablaDatos;
      const tablaDetalle = result.Resultado?.tablaDetalle;

      if (!tablaDatos || !tablaDetalle) {
        console.log('En CombinedData2 tablaDatos o tablaDetalle es undefined: No hay datos disponibles.');
      
        return;
      }

      const idOrden = tablaDatos.idOrden.map((item: any) => (item._text || '').trim());
    /*   const prestador = tablaDatos.prestador.map((item: any) => (item._text || '').trim()); */
      // ... (otros campos)
      const combinedData = idOrden.map((id: string, index: number) => ({
        idOrden: id,
        // ... (otros campos)
        visto: 'no visto',
      }));

      setOrderNotifications(combinedData);
    
    } catch (error) {
      console.error('Error en Noti Component 3. en CombinedData2:', error);

    }
  }

    await ProductsRequest();
    await CombinedData2();

  }
  const intervalId = setInterval(fetchNotifications, 50000); // Intervalo de 50 segundos

  return () => clearInterval(intervalId);
}, [idAfiliado, setMedicalNotifications, setOrderNotifications]);

return null;
}
/* const unseenCount = combinedNotifications.filter((notification) => notification.visto === 'no visto').length; */

export default NotiComponent3;
