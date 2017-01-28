// @flow
import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'standard';

const LabRow = ({ lab }: Props) => (
  <View style={styles.container}>
    <View style={styles.info}>
      <Text style={styles.title}>
        {lab.title.toUpperCase()}
      </Text>
    </View>
  </View>
);

type Props = {
  lab: LabType,
};

const styles = StyleSheet.create({
  container: {
    height: 84,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 27,
    marginRight: 128,
  },
  title: {
    fontSize: 15,
    fontWeight: 'Light',
    color: '#1a313e',
  },
});

export default LabRow;
