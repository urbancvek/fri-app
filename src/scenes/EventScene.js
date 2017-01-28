// @flow
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import HTML from 'react-native-fence-html';

import { StyleSheet } from 'standard';

const { width } = Dimensions.get('window');

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

const html = `
<div>
  <img src="http://www-ti.fri.uni-lj.si/sites/default/files/patricio_buli%C4%87.png" width="190" height="240" />
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum lacus non nulla lacinia, id lobortis metus maximus. Maecenas finibus dui quam, iaculis volutpat purus ultrices non. Proin ut porttitor neque, sed bibendum velit.</p>
</div>
`;

const renderers = {
  img: (htmlAttribs, children, passProps) => {
    const widthOfContent = width - 16 - 20;
    const scale = widthOfContent / htmlAttribs.width;
    const height = htmlAttribs.height * scale;

    return (
      <Image
        source={{ uri: htmlAttribs.src, width: widthOfContent, height }}
        style={passProps.htmlStyles.img}
        {...passProps}
      />
    );
  },
};

const EventScene = ({ event }: Props, { navigation }: Context) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View>
        <View style={styles.additionalInfo}>
          <Text style={[styles.room, { color: event.color }]}>
            {event.room}
          </Text>
          <Text style={styles.time}>
            9:00 - 10:00
          </Text>
        </View>
        <Text style={styles.title}>
          {event.title.toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.popRoute()}
        style={styles.closeButtonContainer}
      >
        <Image
          source={require('assets/utils/close_button.png')}
          style={styles.closeButton}
        />
      </TouchableOpacity>
    </View>

    <ScrollView
      showsVerticalScrollIndicator={false}
    >
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
      <View style={styles.content}>
        <HTML
          html={html}
          htmlStyles={htmlStyles}
          renderers={renderers}
        />
      </View>
    </ScrollView>
  </View>
);

EventScene.contextTypes = {
  navigation: React.PropTypes.object,
};

type Props = {
  event: EventType,
};

type Context = {
  navigation: {
    popRoute: () => void,
  },
};

const htmlStyles = {
  p: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: '300',
    color: '#333333',
    letterSpacing: 0.3,
    lineHeight: 23,
    marginTop: 0,
    marginBottom: 0,
  },
  img: {
    marginBottom: 15,
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginHorizontal: 14,
    marginBottom: 15,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  closeButtonContainer: {
    height: 35,
    width: 35,
    alignItems: 'flex-end',
  },
  closeButton: {
    height: 25,
    width: 25,
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  room: {
    fontWeight: 'Bold',
    fontSize: 18,
    marginRight: 10,
  },
  time: {
    fontWeight: 'Regular',
    fontSize: 12,
    color: '#9a9a9a',
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
    marginBottom: 30,
  },
});

export default EventScene;
