// @flow
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import Person from 'components/Person';
import HTMLContentView from 'components/HTMLContentView';

const html = `
<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum lacus non nulla lacinia, id lobortis metus maximus. Maecenas finibus dui quam, iaculis volutpat purus ultrices non. Proin ut porttitor neque, sed bibendum velit.</p>
</div>
`;

const personnel = [
  {
    firstName: 'Luka',
    lastName: 'Čehovin Zajc',
    imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/rok_%C4%8Ce%C5%A1novar.png',
  },
  {
    firstName: 'Branko',
    lastName: 'Šter',
    imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/branko_%C5%A0ter_2.png',
  },
  {
    firstName: 'Patricio',
    lastName: 'Bulić',
    imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/patricio_buli%C4%87.png',
  },
  {
    firstName: 'Branko',
    lastName: 'Šter',
    imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/branko_%C5%A0ter_2.png',
  },
  {
    firstName: 'Patricio',
    lastName: 'Bulić',
    imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/patricio_buli%C4%87.png',
  },
];

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

const LabCardScene = ({ lab }: Props) => (
  <CardView header={<Header lab={lab} />}>
    <Text style={styles.heading1}>
      PREDSTAVNIKI
    </Text>
    <ScrollView
      contentContainerStyle={styles.personnel}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {personnel.map((person, index) => <Person key={index} person={person} />)}
    </ScrollView>
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    <HTMLContentView content={html} />
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

export default LabCardScene;
