// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';

import { StyleSheet } from 'standard';

const Person = ({ person }: PersonProps) => (
  <View style={personStyles.container}>
    <View style={personStyles.imageWrapper}>
      <Image
        source={{ uri: person.imageUrl }}
        style={personStyles.image}
      />
    </View>
    <Text style={personStyles.name}>
      {person.firstName}
    </Text>
    <Text style={personStyles.name}>
      {person.lastName}
    </Text>
  </View>
);

type PersonProps = {
  person: {
    firstName: string,
    lastName: string,
    imageUrl: string,
  },
};

const personStyles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    marginRight: 10,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    overflow: 'hidden',
    borderRadius: 32,
    marginVertical: 6,
  },
  image: {
    width: 64,
    height: 90,
  },
  name: {
    fontWeight: 'Light',
    fontSize: 12,
    color: '#333333',
  },
});

export default Person;
