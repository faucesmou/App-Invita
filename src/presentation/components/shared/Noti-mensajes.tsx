import React from 'react';
import { View, Text } from 'react-native';
import { useNotificationStore } from '../../store/notification-store';
import { IonIcon } from './IonIcon';

const NotiMensajes = () => {
  const combinedNotifications = useNotificationStore((state) => state.combinedNotifications);
  const unseenNotificationsCount = combinedNotifications.filter(notification => notification.visto === 'no visto').length;

  return (
    <View style={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>
      <IonIcon name='notifications-outline' color={'white'} size={35} />
      {unseenNotificationsCount > 0 ? (
        <>
          <Text style={{ color: 'white', marginLeft: 10 }}>
            {unseenNotificationsCount}
          </Text>
        </>
      ) : (
        <>
        </>
       /*  <Text style={{ color: 'white' }}>
          
        </Text> */
      )}
    </View>
  );
};
export default NotiMensajes;

