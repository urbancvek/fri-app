// @flow
import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'standard';

const SectionRow = ({ title }: Props) => (
  <View style={styles.sectionView}>
    <Text style={styles.sectionText}>
      {title}
    </Text>
  </View>
);

type Props = {
  title: string,
};

const styles = StyleSheet.create({
  sectionView: {
    height: 31,
    backgroundColor: '#f0f1f3',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  sectionText: {
    color: '#9a9a9a',
    fontSize: 13,
  },
});

export default SectionRow;
