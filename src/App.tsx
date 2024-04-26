import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { AuthProvider } from './presentation/providers/AuthProvider';

import { SideMenuNavigator } from './presentation/routes/SideMenuNavigator';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
/* import { StackNavigator } from './presentation/routes/StackNavigator'; */





export const App = () => {


  return (

<>
<IconRegistry icons={EvaIconsPack} />

    <ApplicationProvider {...eva} theme={eva.light}>
      
      <NavigationContainer>

        <AuthProvider>
  
        <SideMenuNavigator />

        </AuthProvider>

      </NavigationContainer>

    </ApplicationProvider>
</>



  )
}

{/*   <StackNavigator/> */ }
{/*  <BottomTabsNavigator /> */ }