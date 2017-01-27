// @flow
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

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

const EventScene = ({ event }: Props, context) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View>
        <Text style={[styles.room, { color: event.color }]}>
          {event.room}
        </Text>
        <Text style={styles.title}>
          {event.title.toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => context.navigation.popRoute()}>
        <View style={styles.closeButton} />
      </TouchableOpacity>
    </View>

    <View>
      <Text style={styles.heading1}>
        PREDSTAVNIKI
      </Text>
      <ScrollView
        contentContainerStyle={styles.personnel}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Person person={{ firstName: 'Luka', lastName: 'Čehovin Zajc', imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/rok_%C4%8Ce%C5%A1novar.png' }} />
        <Person person={{ firstName: 'Branko', lastName: 'Šter', imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/branko_%C5%A0ter_2.png' }} />
        <Person person={{ firstName: 'Patricio', lastName: 'Bulić', imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/patricio_buli%C4%87.png' }} />
        <Person person={{ firstName: 'Branko', lastName: 'Šter', imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/branko_%C5%A0ter_2.png' }} />
        <Person person={{ firstName: 'Patricio', lastName: 'Bulić', imageUrl: 'http://www-ti.fri.uni-lj.si/sites/default/files/patricio_buli%C4%87.png' }} />
      </ScrollView>
      <Text style={styles.heading1}>
        PREDSTAVITEV
      </Text>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum lacus non nulla lacinia, id lobortis metus maximus. Maecenas finibus dui quam, iaculis volutpat purus ultrices non. Proin ut porttitor neque, sed bibendum velit.
      </Text>
    </View>
  </View>
);

EventScene.contextTypes = {
  navigation: React.PropTypes.object,
};

type Props = {
  event: EventType,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    height: 20,
    width: 20,
    backgroundColor: 'green',
  },
  room: {
    fontWeight: 'Bold',
    fontSize: 18,
  },
  title: {
    fontWeight: 'Bold',
    fontSize: 22,
    color: '#444444',
  },
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
  content: {
    fontSize: 13,
    fontWeight: 'Light',
    color: '#333333',
    letterSpacing: 0.3,
    lineHeight: 23,
  },
});

export default EventScene;
