// @flow
import React from 'react';
import { Text, View, ScrollView } from 'react-native';

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

const Header = ({ company }: HeaderProps) => (
  <View>
    <Text style={[headerStyles.room, { color: company.accentColor }]}>
      {company.location.toUpperCase()}
    </Text>
    <Text style={headerStyles.title}>
      {company.title.toUpperCase()}
    </Text>
  </View>
);

type HeaderProps = {
  company: CompanyType,
};

const headerStyles = StyleSheet.create({
  room: {
    fontWeight: 'Bold',
    fontSize: 18,
  },
  title: {
    fontWeight: 'Bold',
    fontSize: 22,
    color: '#444444',
  },
});

const CompanyCardScene = ({ company }: Props) => (
  <CardView header={<Header company={company} />}>
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
  company: CompanyType,
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

export default CompanyCardScene;
