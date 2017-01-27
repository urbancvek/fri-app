// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const Tab = ({ title, onPress, selected }: TabProps) => (
  <TouchableOpacity onPress={onPress} style={[tabStyles.container, selected && { borderColor: 'white' }]}>
    <Text style={tabStyles.text}>
      {title}
    </Text>
  </TouchableOpacity>
);

type TabProps = {
  title: string,
  selected: boolean,
  onPress: () => void,
};

const tabStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 30,
    paddingVertical: 7,
    // Differrent paddings to account for font looks on the right
    paddingLeft: 16,
    paddingRight: 13,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: 'Light',
    color: 'white',
    backgroundColor: 'transparent',
  },
});

const SlidingChooser = ({ selectedPage, tabs, scrollToPage }: Props) => (
  <View style={styles.chooser}>
    {tabs.map((title: string, index: number) =>
      <Tab
        key={title}
        title={title}
        selected={index === selectedPage}
        onPress={() => scrollToPage(index)}
      />
    )}
  </View>
);

type Props = {
  tabs: Array<string>,
  selectedPage: number,
  scrollToPage: (index: number) => void,
};

const styles = StyleSheet.create({
  chooser: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SlidingChooser;
