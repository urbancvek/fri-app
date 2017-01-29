// @flow
import React from 'react';
import { View } from 'react-native';

import { StyleSheet } from 'standard';

const Spacer = () => <View style={styles.spacer} />;

const styles = StyleSheet.create({
  spacer: {
    height: 200,
  },
});

export default Spacer;
