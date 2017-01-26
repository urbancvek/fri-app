// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'standard';

const Tab = ({ title, onPress, selected }: TabProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={selected && { backgroundColor: 'green' }}>
      {title}
    </Text>
  </TouchableOpacity>
);

type TabProps = {
  title: string,
  selected: boolean,
  onPress: () => void,
};

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
    justifyContent: 'space-around',
  },
});

export default SlidingChooser;
