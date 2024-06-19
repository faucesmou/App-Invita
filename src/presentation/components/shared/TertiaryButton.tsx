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
    description?: string;
}


export const TertiaryButton = ( { onPress, label, color, disabled, iconName, description }: Props) => {
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
    backgroundColor: 'white',
    minWidth: '80%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    padding: 10,
    margin: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:5,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 5,
  },
  iconWrapper: {
    justifyContent: 'flex-end',
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
  },
  descriptionText: {
    color: 'gray',
    fontSize: 18,
  },
});