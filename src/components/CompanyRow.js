// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const CompanyRow = ({ company: { accentColor, title, location, image }, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={[styles.accentColor, { backgroundColor: accentColor }]} />
      <View style={styles.info}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
        <Text style={[styles.location, { color: accentColor }]}>
          {location.toUpperCase()}
        </Text>
      </View>
      <Image
        source={{ uri: image.url }}
        style={[styles.logo, { height: image.height / 3, width: image.width / 3 }]}
      />
    </View>
  </TouchableOpacity>
);

type Props = {
  company: CompanyType,
  onPress: Function,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  accentColor: {
    position: 'absolute',
    // height is some arbitrary high number so that row height is never higher
    height: 150,
    width: 5,
  },
  info: {
    marginLeft: 27,
    marginVertical: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'Light',
  },
  location: {
    fontSize: 12,
    fontWeight: 'Regular',
  },
  logo: {
    marginRight: 36,
    resizeMode: 'contain',
  },
});

export default CompanyRow;
