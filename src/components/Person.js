// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';

import { StyleSheet } from 'standard';

const Person = ({ person }: PersonProps) => (
  <View style={styles.container}>
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: person.image.url }}
        style={styles.image}
      />
      <View style={styles.fixCircleClipping} />
    </View>
    <Text style={styles.name}>
      {person.firstName}
    </Text>
    <Text style={styles.name}>
      {person.lastName}
    </Text>
  </View>
);

type PersonProps = {
  person: PersonType,
};

const circleSize = 64;
const circleFixBorder = 20;

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    marginRight: 10,
  },
  imageWrapper: {
    width: circleSize,
    height: circleSize,
    overflow: 'hidden',
    borderRadius: circleSize / 2,
    marginVertical: 6,
  },
  image: {
    width: 64,
    height: 100,
  },
  // Hack to get images in circles
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: (circleSize / 2) + (circleFixBorder / 2),
    borderWidth: circleFixBorder,
    borderColor: 'white',
  },
  name: {
    fontWeight: 'Light',
    fontSize: 12,
    color: '#333333',
  },
});

export default Person;
