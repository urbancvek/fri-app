// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const StudyProgramRow = ({ studyProgram, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>
          {studyProgram.title.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>
          {studyProgram.subtitle.toUpperCase()}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

type Props = {
  studyProgram: StudyProgramType,
  onPress: Function,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  info: {
    marginLeft: 27,
    marginVertical: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: 'Light',
    color: '#333333',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'Regular',
    color: '#989898',
  },
});

export default StudyProgramRow;
