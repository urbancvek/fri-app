// @flow
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const LabRow = ({ lab: { title, image, location }, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.labForText}>
          LABORATORIJ ZA
        </Text>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
        <Text style={styles.location}>
          {location.toUpperCase()}
        </Text>
      </View>
      <Image
        source={{ uri: image.url }}
        style={styles.backgroundImage}
      />
      <Image
        source={require('assets/utils/gradient.png')}
        style={styles.gradient}
      />
    </View>
  </TouchableOpacity>
);

type Props = {
  lab: LabType,
  onPress: Function,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 84,
  },
  info: {
    marginLeft: 27,
    marginRight: 80,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  labForText: {
    fontSize: 12,
    color: '#989898',
    fontWeight: 'Regular',
  },
  title: {
    fontSize: 14,
    fontWeight: 'Light',
    maxWidth: 210,
    color: '#333333',
  },
  location: {
    fontSize: 12,
    fontWeight: 'Regular',
    color: '#989898',
  },
  gradient: {
    position: 'absolute',
    right: -10,
    height: 84,
    width: 165,
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: 0,
    right: -10,
    height: 84,
    width: 165,
  },
});

export default LabRow;
