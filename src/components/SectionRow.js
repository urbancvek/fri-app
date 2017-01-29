// @flow
import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'standard';

const SectionRow = ({ title }: Props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {title}
    </Text>
  </View>
);

type Props = {
  title: string,
};

const styles = StyleSheet.create({
  container: {
    height: 31,
    backgroundColor: '#f0f1f3',
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
  },
  text: {
    color: '#9a9a9a',
    fontWeight: 'Light',
    fontSize: 13,
    marginRight: 15,
  },
});

export default SectionRow;
