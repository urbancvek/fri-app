// @flow
import React from 'react';
import { Text, View } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import HTMLContentView from 'components/HTMLContentView';

const Header = ({ studyProgram }: HeaderProps) => (
  <View>
    <Text style={headerStyles.title}>
      {studyProgram.title.toUpperCase()}
    </Text>
    <Text style={headerStyles.subtitle}>
      {studyProgram.subtitle.toUpperCase()}
    </Text>
  </View>
);

type HeaderProps = {
  studyProgram: StudyProgramType,
};

const headerStyles = StyleSheet.create({
  title: {
    fontWeight: 'Bold',
    fontSize: 22,
    color: '#444444',
  },
  subtitle: {
    fontWeight: 'Bold',
    fontSize: 15,
    color: '#b4b4b4',
  },
});

const StudyProgramCardScene = ({ studyProgram }: Props) => (
  <CardView header={<Header studyProgram={studyProgram} />}>
    <Text style={styles.heading1}>
      NAZIV
    </Text>
    <Text style={styles.paragraph}>
      {studyProgram.gradTitle}
    </Text>
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    {studyProgram.content && <HTMLContentView content={studyProgram.content} />}
  </CardView>
);

type Props = {
  studyProgram: StudyProgramType,
};

const styles = StyleSheet.create({
  heading1: {
    fontWeight: 'Bold',
    fontSize: 15,
    color: '#444444',
    marginTop: 20,
    marginBottom: 6,
  },
  paragraph: {
    fontWeight: 'Light',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default StudyProgramCardScene;
