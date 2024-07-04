import { useNavigation } from '@react-navigation/native'; //supuestamente esto generaba anidacion( revisar )
import React from 'react'
import { Pressable, StyleSheet, Text, View  } from 'react-native';
import { globalColors, globalStyles } from '../../theme/theme';
import { IonIcon } from './IonIcon';

interface Props {
    onPress: () => void;
    label?: string;
    id?: any;
    color?: string;
    disabled?: boolean;
    iconName?: string;
    iconName2?: string;
    description?: string;
}


export const QuaternaryButton = ( { onPress, label, color, disabled, iconName,iconName2, description }: Props) => {
  const backColor = disabled ? globalColors.disabled : (color ? color : globalColors.background);
  console.log('backColor', backColor)  
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed && !disabled ? 'lightgray' : backColor,
          opacity: disabled ? 0.5 : 1,
        },
        styles.TertiaryButton
      ]}
    >
      <View style={styles.contentWrapper2}>
      {iconName2 && (
          <View style={styles.iconWrapper2}>
            <IonIcon name={iconName2} size={35} color="gray" />
          </View>
        )} 

        <View style={styles.textWrapper}>
          {label && (
            <Text style={styles.buttonText}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={styles.descriptionText}>
              {description}
            </Text>
          )}
        </View>
        {iconName && (
          <View style={styles.iconWrapper}>
            <IonIcon name={iconName} size={35} color="gray" />
          </View>
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  TertiaryButton: {
    /* backgroundColor: 'green', */
    minWidth: '80%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    padding: 10,
    margin: 5,
    marginBottom: 30,
    marginTop:5,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5,
/*     backgroundColor:'orange' */
  },
  textWrapper: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
  /*   backgroundColor:'green' */
  },
  iconWrapper: {
    justifyContent: 'flex-end',
    marginLeft: 10,
  /*   backgroundColor:'yellow' */
  },
  iconWrapper2: {
    justifyContent: 'flex-start',
    marginRight: 10,
   /*  backgroundColor:'yellow' */
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    justifyContent: 'center',
/*     backgroundColor:'blue' */
  },
  descriptionText: {
    color: 'gray',
    fontSize: 18,
    justifyContent: 'flex-start',
  },
});