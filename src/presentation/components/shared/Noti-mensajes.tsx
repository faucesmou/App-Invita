import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNotificationStore } from '../../store/notification-store';
import { IonIcon } from './IonIcon';



const NotificationBadge = ( {counter }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{counter}</Text>
    </View>
  );
};


const NotiMensajes = () => {
  const combinedNotifications = useNotificationStore((state) => state.combinedNotifications);
  const unseenNotificationsCount = combinedNotifications.filter(notification => notification.visto === 'no visto').length;

  return (
    <View style={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>
      <IonIcon name='notifications-outline' color={'white'} size={35} />
      {unseenNotificationsCount > 0 && (
        <NotificationBadge counter={unseenNotificationsCount} />
      )}
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

export default NotiMensajes;

