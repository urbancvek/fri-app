// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const EventRow = ({ event, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
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
  </TouchableOpacity>
);

type Props = {
  event: EventType,
  onPress: Function,
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
