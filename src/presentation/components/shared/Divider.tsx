// Divider.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/theme';

interface Prop {
  marginTopDivider?: number
}

const Divider: React.FC<Prop> = ({marginTopDivider}: Prop) => {
  return <View style={[styles.divider, {marginTop: marginTopDivider || 10}]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 0.4,
    backgroundColor: globalColors.gray2,
    marginHorizontal: 40,
    alignSelf: 'stretch',
    marginBottom:10,
 /*    marginTop:10, */
  },
});

export default Divider;
