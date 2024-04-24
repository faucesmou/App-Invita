// CustomHeader.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '../theme/theme';

const CustomHeader = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: globalColors.primary, 
        height: 130,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: 28, // tamaño título del header
      },
    });
  }, []);

  return null; 
};

export default CustomHeader;
