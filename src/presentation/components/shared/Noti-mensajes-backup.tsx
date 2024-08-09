import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNotificationStore } from '../../store/notification-store';
import { IonIcon } from './IonIcon';



const NotificationBadge = ( {counter}) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{counter}</Text>
    </View>
  );
};


const NotiMensajesBackup = () => {
  /* const combinedNotifications = useNotificationStore((state) => state.combinedNotifications);
  const setCombinedNotifications = useNotificationStore((state) => state.setCombinedNotifications);
   */
  const medicalNotifications = useNotificationStore((state) => state.medicalNotifications);
  const orderNotifications = useNotificationStore((state) => state.orderNotifications);
  const combinedNotifications = useNotificationStore((state) => state.combinedNotifications);
  const setCombinedNotifications = useNotificationStore((state) => state.setCombinedNotifications);

  // Combinación de notificaciones de estudios médicos y órdenes de consulta
  useEffect(() => {
    const combined = [...medicalNotifications, ...orderNotifications];
    setCombinedNotifications();
  }, [medicalNotifications, orderNotifications, setCombinedNotifications]);
// Calcular el número de notificaciones no vistas
const unseenNotificationsCount = combinedNotifications.filter(notification => notification.visto === 'no visto').length;
/*   useEffect(() => {
    setCombinedNotifications();
  }, [setCombinedNotifications]); */
/* 
  const unseenNotificationsCount = combinedNotifications.filter(notification => notification.visto === 'no visto').length; */
  console.log('combined Notifications------------>', combinedNotifications);
  console.log('unseen Notifications Count------------>', unseenNotificationsCount);
  
  return (
    <View style={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>
      <IonIcon name='notifications-outline' color={'white'} size={35} />
      {unseenNotificationsCount > 0 && (
        <NotificationBadge counter={unseenNotificationsCount} />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5, // Ajustar según sea necesario
    right: -5, // Ajustar según sea necesario
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 4,
    zIndex: 1, // Asegurarse de que esté por encima del ícono
  },
  badgeText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NotiMensajesBackup;


    {/*  {unseenNotificationsCount > 0 ? (
       <>
         <Text style={{ color: 'white', marginLeft: 10 }}>
           {unseenNotificationsCount}
         </Text>
       </>
     ) : (
       <>
       </>
     )} */}