import React from 'react';
import { Stack } from './navigationConfig'; // Importa Stack Navigator desde tu archivo de configuración de navegación
// Importa SideMenuNavigator

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* Aquí decides qué componente renderizar en función del estado de autenticación */}
      {/* Por ejemplo, si el usuario está autenticado, renderiza SideMenuNavigator */}
      {/* De lo contrario, renderiza la pantalla de inicio de sesión (LoginScreen) */}
      <Stack.Screen name="Main" component={SideMenuNavigator} />
      {/* Otras rutas si es necesario */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
