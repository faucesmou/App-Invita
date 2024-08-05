import { useEffect } from 'react';
import axios from 'axios';
import { xml2js } from 'xml-js';
import { useNotificationStore } from '../../store/notification-store';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Notificacion {
  idOrden: string;
  afiliado: string;
  fecSolicitud: string;
  estado: string;
  domicilio?: string;
  fecFinalizacion: string;
  comentarioRechazo?: string;
  visto: string;
}

const NotificationComponent = () => {

  const { idAfiliado } = useAuthStore();
  const setNotifications = useNotificationStore((state) => state.setNotifications);
  const notifications = useNotificationStore((state) => state.notifications);

  useEffect(() => {
    const intervalId = setInterval(async () => {

      console.log('Comprobando si hay notificaciones de estudios medicos nuevas---------->');
      const ProductsRequest =  async () => {
      try {
        const response = await axios.get(`https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuzonActualizarORDENPRAC?idAfiliado=${idAfiliado}&IMEI=`);

        const xmlData = response.data;

        // Convertir XML a JSON
        const result = xml2js(xmlData, { compact: true });

        // @ts-ignore
        const notificacionesData = result.Resultado?.tablaDatos;

        if (!notificacionesData) {
          console.log('En ProductsRequest notificacionesData es undefined: No hay notificaciones para este usuario.');
          return;
        }

        // Mapear los datos 
        const mappedNotificaciones: Notificacion[] = Array.isArray(notificacionesData.idOrden) ? notificacionesData.idOrden.map((_: any, index: number) => ({
          idOrden: notificacionesData.idOrden[index]._text,
          afiliado: notificacionesData.afiliado[index]._text,
          fecSolicitud: notificacionesData.fecSolicitud[index]._text,
          estado: notificacionesData.estado[index]._text,
          fecFinalizacion: notificacionesData.fecFinalizacion[index]._text,
          comentarioRechazo: notificacionesData.comentarioRechazo[index]._text,
          visto: 'no visto'
        })) : [];

        // Filtrar y ordenar las notificaciones
        const parseDate = (dateString: string) => {
          const [datePart, timePart] = dateString.split(' ');
          const [day, month, year] = datePart.split('/').map(Number);
          const [hours, minutes, seconds] = timePart.split(':').map(Number);
          return new Date(year, month - 1, day, hours, minutes, seconds);
        };

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const filteredNotificaciones = mappedNotificaciones.filter((notificacion) => parseDate(notificacion.fecFinalizacion) >= oneWeekAgo);
        const notificacionesOrdenadas = filteredNotificaciones.reverse();

        // Agrega notificaciones simuladas para pruebas
        const simulatedNotificaciones = [
          {
            idOrden: '99999',
            afiliado: 'Simulated User',
            fecSolicitud: '23/07/2024 12:00:00',
            estado: 'Pendiente',
            fecFinalizacion: '30/07/2024 12:00:00',
            comentarioRechazo: '',
            visto: 'no visto'
          },
          {
            idOrden: '99998',
            afiliado: 'Simulated User 2',
            fecSolicitud: '24/07/2024 12:00:00',
            estado: 'Pendiente',
            fecFinalizacion: '31/07/2024 12:00:00',
            comentarioRechazo: '',
            visto: 'no visto'
          },
          {
            idOrden: '999999',
            afiliado: 'Simulated User 2',
            fecSolicitud: '24/07/2024 12:00:00',
            estado: 'Pendiente',
            fecFinalizacion: '31/07/2024 12:00:00',
            comentarioRechazo: '',
            visto: 'no visto'
          },
         
       
        ];

        const combinedNotificaciones = [...simulatedNotificaciones, ...notificacionesOrdenadas];
       /*  console.log('combinedNotificaciones_-->', combinedNotificaciones); */
        

        // Comparar notificaciones nuevas con las existentes
        const newNotifications = combinedNotificaciones.filter((newNotification) =>
          !notifications.some((notification) => notification.idOrden === newNotification.idOrden)
        );
console.log('combinedNotificaciones----', combinedNotificaciones);

        // Si hay notificaciones nuevas, actualiza el estado
        if (newNotifications.length > 0) {
          setNotifications(combinedNotificaciones);
        }
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    }
ProductsRequest();

    }, 50000); // Intervalo de 5 segundos

    return () => clearInterval(intervalId);
  }, [idAfiliado, notifications, setNotifications]);

  return null;
};

export default NotificationComponent;


        // Asignamos las notificaciones filtradas al estado
      /*   setNotifications(notificacionesOrdenadas); */ //ESTO LO SILENCIO MOMENTANEAMENTE MIENTRAS PROBAMOS LAS NOTIFICACIONES CON EL COMBINEDNOTIFICACIONES