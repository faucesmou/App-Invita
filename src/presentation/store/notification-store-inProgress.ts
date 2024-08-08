import { create } from 'zustand';


    type Notification = {
      idOrden: string;
      visto: string;
    };

    type Notification2 = {
      idOrden: string;
      visto: string;
      afiliado?: string;
      fecSolicitud?: string;
      estado?: string;
      fecFinalizacion?: string;
      comentarioRechazo?: string;
      domicilio?: string;
    };

 
    type Store = {
      medicalNotifications: Notification2[];
      setMedicalNotifications: (notifications: Notification2[]) => void;
      orderNotifications: Notification2[];
      setOrderNotifications: (notifications: Notification2[]) => void;


/*    estos son los originales que funcionan correctamente en version base:   */
 combinedNotifications: Notification[];
      setCombinedNotifications: () => void; 

      /* agregamos un estado para saber si se ha activado el notificador en la primera carga de la vista: */
   /* esto es prueba */
        initialLoadComplete: boolean;
        setInitialLoadComplete: (value: boolean) => void;
    };
    
    export const useNotificationStore = create<Store>((set, get) => ({
      medicalNotifications: [],
      orderNotifications: [],
      combinedNotifications: [],
       setMedicalNotifications: (notifications) => {
        set({ medicalNotifications: notifications });
        get().setCombinedNotifications();
      }, 

   /*    combinedNotifications: [], */
      setCombinedNotifications: () => {
        const combined = [...get().medicalNotifications, ...get().orderNotifications];
        set({ combinedNotifications: combined });
      },



      initialLoadComplete: false,
      setInitialLoadComplete: (value: boolean) => {
        set({ initialLoadComplete: value });
      },

      setOrderNotifications: (newOrderNotifications) => {
        const existingOrderNotifications = get().orderNotifications;
    
        const updatedOrderNotifications = newOrderNotifications.map((newNotification) => {
          const existingNotification = existingOrderNotifications.find(
            (notification) => notification.idOrden === newNotification.idOrden
          );
    
          if (existingNotification) {
            // Verifica si alguna otra propiedad cambió
            const hasChanges = Object.keys(newNotification).some((key) => {
              if (key === 'visto' || !existingNotification.hasOwnProperty(key)) {
                return false;
              }
              return existingNotification[key] !== newNotification[key];
            });
    
            if (hasChanges) {
              return { ...newNotification, visto: 'no visto' };
            } else {
              return { ...newNotification, visto: existingNotification.visto };
            }
          } else {
            return newNotification;
          }
        });
    
        const finalOrderNotifications = [
          ...existingOrderNotifications.filter(
            (notification) =>
              !newOrderNotifications.some((newNotification) => newNotification.idOrden === notification.idOrden)
          ),
          ...updatedOrderNotifications,
        ];
    
        set({ orderNotifications: finalOrderNotifications });
        get().setCombinedNotifications();
      },
      
    }));




    /*      setMedicalNotifications: (newMedicalNotifications) => {
        const existingMedicalNotifications = get().medicalNotifications;
    
        const updatedMedicalNotifications = newMedicalNotifications.map((newNotification) => {
          const existingNotification = existingMedicalNotifications.find(
            (notification) => notification.idOrden === newNotification.idOrden
          );
    
          if (existingNotification) {
         
            const hasChanges = Object.keys(newNotification).some((key) => {
              if (key === 'visto' || !existingNotification.hasOwnProperty(key)) {
                return false;
              }
              return existingNotification[key] !== newNotification[key];
            });
    
            if (hasChanges) {
              return { ...newNotification, visto: 'no visto' };
            } else {
              return { ...newNotification, visto: existingNotification.visto };
            }
          } else {
            return newNotification;
          }
        });
    
        const finalMedicalNotifications = [
          ...existingMedicalNotifications.filter(
            (notification) =>
              !newMedicalNotifications.some((newNotification) => newNotification.idOrden === notification.idOrden)
          ),
          ...updatedMedicalNotifications,
        ];
    
        set({ medicalNotifications: finalMedicalNotifications });
        get().setCombinedNotifications();
      }, */

/*       setOrderNotifications: (notifications) => {
        set({ orderNotifications: notifications });
       
        
        get().setCombinedNotifications();
      }, */


         /*    combinedNotifications: Notification2[]; */
    /*   setCombinedNotifications: () => void; */

    /*      setCombinedNotifications: () => {
           const existingNotifications = get().combinedNotifications;
           const newMedicalNotifications = get().medicalNotifications;
           const newOrderNotifications = get().orderNotifications;
           
           const combinedNewNotifications = [...newMedicalNotifications, ...newOrderNotifications];
           
           const updatedNotifications = combinedNewNotifications.map((newNotification) => {
             const existingNotification = existingNotifications.find(
               (notification) => notification.idOrden === newNotification.idOrden
               );
             return existingNotification ? { ...existingNotification, ...newNotification } : newNotification;
           });
           
           const finalCombinedNotifications = [
             ...existingNotifications.filter(
               (notification) =>
               !combinedNewNotifications.some((newNotification) => newNotification.idOrden === notification.idOrden)
             ),
             ...updatedNotifications,
           ];
       
           set({ combinedNotifications: finalCombinedNotifications });
         }, */
         
    /*  setCombinedNotifications: () => {
       const existingNotifications = get().combinedNotifications;
       const newMedicalNotifications = get().medicalNotifications;
       const newOrderNotifications = get().orderNotifications;
   
       const combinedNewNotifications = [...newMedicalNotifications, ...newOrderNotifications];
   
       const updatedNotifications = combinedNewNotifications.map((newNotification) => {
         const existingNotification = existingNotifications.find(
           (notification) => notification.idOrden === newNotification.idOrden
         );

       
         if (existingNotification && existingNotification.visto === 'visto') {
           return { ...newNotification, visto: 'visto' };
         }

         return existingNotification ? { ...existingNotification, ...newNotification } : newNotification;
       });
   
       const finalCombinedNotifications = [
         ...existingNotifications.filter(
           (notification) =>
             !combinedNewNotifications.some((newNotification) => newNotification.idOrden === notification.idOrden)
         ),
         ...updatedNotifications,
       ];
   
       set({ combinedNotifications: finalCombinedNotifications });
     }, */
    
