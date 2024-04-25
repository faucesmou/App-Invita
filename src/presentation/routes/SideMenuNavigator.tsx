import { View, useWindowDimensions } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './StackNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { globalColors } from '../theme/theme';

import { IonIcon } from '../components/shared/IonIcon';



const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {


const dimensions = useWindowDimensions()

  return (
    <Drawer.Navigator 
    drawerContent={ (props)=> <CustomDrawerContent {...props}/>}
/* esta parte de screenOptions no està funcionando */
    screenOptions={{
        headerShown: true,
        drawerType: (dimensions.width >= 758) ? 'permanent': 'slide',
        drawerActiveBackgroundColor: globalColors.orange,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: globalColors.orange,
        drawerItemStyle: {
            borderRadius: 100,
            paddingHorizontal: 20,
        }
    }}>
  {/*  <Drawer.Screen name="StackNavigator" component={StackNavigator} /> */}
   
     {/*  <Drawer.Screen 
      options={{ drawerIcon: ({ color })=> ( <IonIcon name= 'caret-forward-circle-outline' color={ color } /> ) }} 
      name="Innvita" component={ BottomTabsNavigator} /> */}
      
      <Drawer.Screen 
      options={{ drawerIcon: ({ color })=> ( <IonIcon name= 'caret-forward-circle-outline' color={ color } /> ) }} 
      name="Categorias" component={ StackNavigator} />
      
      <Drawer.Screen 
      options={{ drawerIcon: ({ color })=> ( <IonIcon name= 'person-circle-outline' color={ color } /> ) }} 
      name="Mi Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props: DrawerContentComponentProps ) =>{

    return (
        <DrawerContentScrollView>
        <View 
        style={{
        height: 200,
        backgroundColor: globalColors.orange,
        margin: 30,
        borderRadius: 50,
        }}
        />

        <DrawerItemList {...props } />
       {/*  <Text>
        Hola mundo
        </Text> */}
        
        </DrawerContentScrollView>
    )

}