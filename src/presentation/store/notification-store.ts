import { create } from 'zustand';

/* type Notification = {
  idOrden: string;
  afiliado: string;
  fecSolicitud: string;
  estado: string;
  fecFinalizacion: string;
  comentarioRechazo?: string;
  visto: string;
}; */
    type Notification = {
      idOrden: string;
      visto: string;
    };

  /*   type Store = {
      notifications: Notification[];
      setNotifications: (notifications: Notification[]) => void;
      orderNotifications: Notification[];
      setOrderNotifications: (notifications: Notification[]) => void;
    }; */
    type Store = {
      medicalNotifications: Notification[];
      setMedicalNotifications: (notifications: Notification[]) => void;
      orderNotifications: Notification[];
      setOrderNotifications: (notifications: Notification[]) => void;
      combinedNotifications: Notification[];
      setCombinedNotifications: () => void;
    };
    
    export const useNotificationStore = create<Store>((set, get) => ({
      medicalNotifications: [],
      setMedicalNotifications: (notifications) => {
        set({ medicalNotifications: notifications });
        get().setCombinedNotifications();
      },
      orderNotifications: [],
      setOrderNotifications: (notifications) => {
        set({ orderNotifications: notifications });
        get().setCombinedNotifications();
      },
      combinedNotifications: [],
      setCombinedNotifications: () => {
        const combined = [...get().medicalNotifications, ...get().orderNotifications];
        set({ combinedNotifications: combined });
      },
    }));