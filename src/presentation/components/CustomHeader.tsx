// CustomHeader.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '../theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  color?: string;
  titleSize?: number;
}

const CustomHeader = ( {color, titleSize} : Props) => {
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
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: titleSize? titleSize : 35, // tamaño título del header
        marginBottom: 25,
        
      },
    });
  }, [navigation, backColor, titleSize, adjustedHeaderHeight]);

  return null; 
};

export default CustomHeader;
