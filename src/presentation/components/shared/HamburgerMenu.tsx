import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { IonIcon } from './IonIcon';


export const HamburgerMenu = () => {

    const navigation = useNavigation();

   

    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Pressable onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer)}
            style={{marginLeft:20, zIndex: 2, }}
            >
           <IonIcon name='menu' color= { 'white' } size = {35}/> 
            </Pressable>  
          )
        })
        
      }, [navigation])

      return (<></>);
}
