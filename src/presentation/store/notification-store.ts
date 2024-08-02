import { create } from 'zustand';

type Notification = {
  idOrden: string;
  afiliado: string;
  fecSolicitud: string;
  estado: string;
  fecFinalizacion: string;
  comentarioRechazo?: string;
  visto: string;
};

type Store = {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
};

export const useNotificationStore = create<Store>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
}));
