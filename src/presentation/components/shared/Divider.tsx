// Divider.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/theme';

const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 0.5,
    backgroundColor: globalColors.gray2,
    marginHorizontal: 40,
    alignSelf: 'stretch',
  },
});

export default Divider;
