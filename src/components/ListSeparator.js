// @flow
import React from 'react';
import { View, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';

const { width } = Dimensions.get('window');

const ListSeparator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    alignSelf: 'center',
    width: width - 46,
    backgroundColor: '#e8e8e8',
  },
});

export default ListSeparator;
