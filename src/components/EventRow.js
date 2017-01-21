// @flow
import React from 'react';
import { View, Text } from 'react-native';

const EventRow = ({ event }: Props) => (
  <View>
    <Text>{event.title}</Text>
    <Text>{event.room}</Text>
    <Text>{event.duration}</Text>
  </View>
);

type Props = {
  event: EventType,
};

export default EventRow;
