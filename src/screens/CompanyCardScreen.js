// @flow
import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import Person from 'components/Person';
import HTMLContentView from 'components/HTMLContentView';

type Props = {
  company: CompanyType,
};

const CompanyCardScene = (props: Props) => (
  <CardView header={<Header company={props.company} />} {...props}>
    {props.company.personnell && (
      <View>
        <Text style={styles.heading1}>
          PREDSTAVNIKI
        </Text>
        <ScrollView
          contentContainerStyle={styles.personnel}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {props.company.personnel && props.company.personnel.map((person, index) =>
            <Person key={index} person={person} />
          )}
        </ScrollView>
      </View>
    )}
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    {props.company.content && <HTMLContentView content={props.company.content.join()} />}
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
  personnel: {
    flexDirection: 'row',
  },
});

type HeaderProps = {
  company: CompanyType,
};

const Header = ({ company }: HeaderProps) => (
  <View>
    <Text style={[headerStyles.location, { color: company.accentColor }]}>
      {company.location.toUpperCase()}
    </Text>
    <Text style={headerStyles.title}>
      {company.title.toUpperCase()}
    </Text>
    <Image
      source={{ uri: company.image.url }}
      style={[
        headerStyles.image,
        { height: company.image.height / 3, width: company.image.width / 3 },
      ]}
    />
  </View>
);

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
  image: {
    marginTop: 10,
  },
});

export default CompanyCardScene;
