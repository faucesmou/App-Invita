// Divider.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/theme';

const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 0.4,
    backgroundColor: globalColors.gray2,
    marginHorizontal: 40,
    alignSelf: 'stretch',
    marginBottom:10,
    marginTop:10,
  },
});

export default Divider;
