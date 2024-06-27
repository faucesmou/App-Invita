// CustomHeader.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '../theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  color?: string;
}

const CustomHeader = ( {color} : Props) => {
  const navigation = useNavigation();


  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = 70; // Altura inicial del encabezado
  const adjustedHeaderHeight = headerHeight + top; // Ajusta la altura para tener en cuenta los márgenes seguros
  const backColor = color ? color : globalColors.profile2

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: backColor, 
        height: adjustedHeaderHeight,
        borderRadius: 15,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 35, // tamaño título del header
        marginBottom: 25,
        
      },
    });
  }, []);

  return null; 
};

export default CustomHeader;
