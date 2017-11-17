// @flow
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { StyleSheet } from 'standard';
import CardView from 'components/CardView';
import Person from 'components/Person';
import HTMLContentView from 'components/HTMLContentView';

type Props = {
  event: EventType,
};

const EventCardScreen = (props: Props) => (
  <CardView header={<Header event={props.event} />} {...props}>
    {props.event.personnel && (
      <View>
        <Text style={styles.heading1}>
          PREDSTAVNIKI
        </Text>
        <ScrollView
          contentContainerStyle={styles.personnel}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {props.event.personnel && props.event.personnel.map((person, index) => <Person key={index} person={person} />)}
        </ScrollView>
      </View>
    )}
    <Text style={styles.heading1}>
      PREDSTAVITEV
    </Text>
    {props.event.content && <HTMLContentView content={props.event.content.join()} />}
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

const Header = ({ event }: HeaderProps) => (
  <View>
    <Text style={[headerStyles.location, { color: event.accentColor }]}>
      {event.location}
    </Text>
    <Text style={headerStyles.title}>
      {event.title.toUpperCase()}
    </Text>
  </View>
);

type HeaderProps = {
  event: EventType,
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

export default EventCardScreen;
