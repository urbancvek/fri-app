// @flow
import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'standard';

const CompanyRow = ({ company }: Props) => (
  <View style={styles.container}>
    <View style={[styles.color, { backgroundColor: company.color }]} />
    <View style={styles.info}>
      <Text style={styles.title}>
        {company.title.toUpperCase()}
      </Text>
    </View>
  </View>
);

type Props = {
  company: CompanyType,
};

const styles = StyleSheet.create({
  container: {
    height: 74,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    // 1px more than height to account for the space made by separator
    height: 75,
    width: 5,
  },
  info: {
    marginLeft: 27,
  },
  title: {
    fontSize: 15,
    fontWeight: 'Light',
  },
});

export default CompanyRow;
