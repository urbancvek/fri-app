// @flow
import React from 'react';
import { Text, View } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import HTMLContentView from 'components/HTMLContentView';

type Props = {
  studyProgram: StudyProgramType,
};

const StudyProgramCardScene = (props: Props) => (
  <CardView header={<Header studyProgram={props.studyProgram} />} {...props}>
    <Text style={styles.heading1}>
      NAZIV
    </Text>
    <Text style={styles.paragraph}>
      {props.studyProgram.gradTitle}
    </Text>
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    {props.studyProgram.content && <HTMLContentView content={props.studyProgram.content.join()} />}
  </CardView>
);

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

type HeaderProps = {
  studyProgram: StudyProgramType,
};

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

export default StudyProgramCardScene;
