// @flow
import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'standard';

const EventRow = ({ event }: Props) => (
  <View style={styles.container}>
    <View style={[styles.color, { backgroundColor: event.color }]} />
    <View style={styles.info}>
      <Text style={styles.title}>
        {event.title.toUpperCase()}
      </Text>
      <Text style={[styles.room, { color: event.color }]}>
        {event.room.toUpperCase()}
      </Text>
    </View>
  </View>
);

type Props = {
  event: EventType,
};

const styles = StyleSheet.create({
  container: {
    height: 59,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    // 1px more than height to account for the space made by separator
    height: 60,
    width: 5,
  },
  info: {
    marginLeft: 27,
  },
  title: {
    fontSize: 15,
    fontWeight: 'Light',
  },
  room: {
    fontSize: 12,
    fontWeight: 'Regular',
  },
});

export default EventRow;
