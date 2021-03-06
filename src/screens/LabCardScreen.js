// @flow
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import Person from 'components/Person';
import HTMLContentView from 'components/HTMLContentView';

const LabCardScene = (props: Props) => (
  <CardView header={<Header lab={props.lab} />} {...props}>
    {props.lab.personnel && (
      <View>
        <Text style={styles.heading1}>
          PREDSTAVNIKI
        </Text>
        <ScrollView
          contentContainerStyle={styles.personnel}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {props.lab.personnel && props.lab.personnel.map((person, index) => <Person key={index} person={person} />)}
        </ScrollView>
      </View>
    )}
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    {props.lab.content && <HTMLContentView content={props.lab.content.join()} />}
  </CardView>
);

type Props = {
  lab: LabType,
};

const styles = StyleSheet.create({
  heading1: {
    fontWeight: 'Bold',
    fontSize: 15,
    color: '#444444',
    marginTop: 20,
    marginBottom: 6,
  },
  personnel: {
    flexDirection: 'row',
  },
});

const Header = ({ lab }: HeaderProps) => (
  <View>
    <Text style={headerStyles.location}>
      {lab.location}
    </Text>
    <Text style={headerStyles.preTitle}>
      LABORATORIJ ZA
    </Text>
    <Text style={headerStyles.title}>
      {lab.title.toUpperCase()}
    </Text>
  </View>
);

type HeaderProps = {
  lab: LabType,
};

const headerStyles = StyleSheet.create({
  location: {
    fontWeight: 'Bold',
    fontSize: 18,
    color: '#b4b4b4',
  },
  preTitle: {
    fontWeight: 'Bold',
    fontSize: 18,
    color: '#b4b4b4',
  },
  title: {
    fontWeight: 'Bold',
    fontSize: 22,
    color: '#444444',
    backgroundColor: 'transparent',
  },
});

export default LabCardScene;
