import React from 'react';
import { View, Text } from 'react-native';
import { useNotificationStore } from '../../store/notification-store';
import { IonIcon } from './IonIcon';

const NotificationBell = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const unseenNotificationsCount = notifications.filter(notification => notification.visto === 'no visto').length
  return (
    <View style={{display:'flex', flexWrap:'wrap', marginTop:15}}>
        <IonIcon name='notifications-outline' color={'white'} size={35} />
      {unseenNotificationsCount > 0? (
        <>
           <Text style={{ color: 'white', marginLeft:10  }}>
       {unseenNotificationsCount}
        </Text>
        <Text style={{ color: 'white' }}>
   
        </Text>
        
        
        </>
     
      ) : 
    ( <Text style={{ color: 'white' }}>
    adios
   </Text>)

    }
    
    </View>
  );
};

export default NotificationBell;

