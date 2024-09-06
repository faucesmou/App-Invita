import React from 'react'

import { globalColors } from '../../theme/theme';
import { IonIcon } from './IonIcon';

import { StyleSheet, View, Text, Pressable, useWindowDimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
  onPress: () => void;
  label?: string;
  id?: any;
  color?: string;
  disabled?: boolean;
  iconName?: string;
  description?: string;
}

export const SecondaryButton2 = ({ onPress, label, color, disabled, iconName, description }: Props) => {
  // Eliminamos la desestructuración de width y height si no se usan
  const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.background);

  return (
    <View style={{maxWidth:'80%'}} > 

      <Pressable
        onPress={disabled ? undefined : onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed && !disabled ? 'lightgray' : backColor,
            opacity: disabled ? 0.5 : 1,
          },
          styles.secondaryButton
        ]}
      >
        <View style={{maxWidth:'70%'}} >
        
          <IonIcon name={iconName} size={hp('3%')} color="#505050" style={styles.icon} /> 

           {label && <Text >{label}</Text>}  
          
  
          {description && <Text >{description}</Text>} 
        </View>

      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    flex: 0.5,
  /*   minWidth: wp('20%'), */
    maxHeight: hp('10%'),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: wp('2%'),
    margin: wp('1%'),
    alignItems: 'flex-start',
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
/*     maxWidth: '60%', */
    padding: wp('1%'),
  },
  contentWrapper22: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
 /*    marginTop: hp('2%'), */
  },
  buttonText: {
    color: 'black',
    fontWeight: 'normal',
    marginBottom: hp('0.5%'),
/*     marginTop: hp('0.5%'), */
  },
  icon: {
    marginBottom: hp('0.5%'),
  },
  descriptionText: {
    color: '#505050',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
});