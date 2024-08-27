import React from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


interface Props{
    name: string;
    size?: number;
    color?: string;
    marginLeft?:string;
}



export const IonIcon = ({name, size = 33, color = 'black', marginLeft = '0%'}: Props ) => {
  return (
    
    <Icon 
    name= {name}
    size= { size }
    color= { color }
    marginLeft= { marginLeft }
    />
  )
}
