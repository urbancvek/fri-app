// @flow
import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import Person from 'components/Person';
import HTMLContentView from 'components/HTMLContentView';

const Header = ({ company }: HeaderProps) => (
  <View>
    <Text style={[headerStyles.location, { color: company.accentColor }]}>
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
  location: {
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
      {company.personnel && company.personnel.map((person, index) => <Person key={index} person={person} />)}
    </ScrollView>
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    {company.content && <HTMLContentView content={company.content} />}
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
