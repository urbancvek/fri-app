// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const EventRow = ({ event, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={[styles.color, { backgroundColor: event.accentColor }]} />
      <View style={styles.info}>
        <Text style={styles.title}>
          {event.title.toUpperCase()}
        </Text>
        <Text style={[styles.location, { color: event.accentColor }]}>
          {event.location.toUpperCase()}
        </Text>
        {event.description && event.description.map((text, index) => (
          <Text style={styles.description} key={index}>
            - {text}
          </Text>
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

type Props = {
  event: EventType,
  onPress: Function,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  color: {
    position: 'absolute',
    // height is some arbitrary high number so that row height is never higher
    height: 150,
    width: 5,
  },
  info: {
    marginLeft: 27,
    marginVertical: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: 'Light',
  },
  location: {
    fontSize: 12,
    fontWeight: 'Regular',
  },
  description: {
    color: '#bdc0c9',
    fontWeight: 'Light',
    fontSize: 13,
  },
});

export default EventRow;
