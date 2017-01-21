// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';
import EventList from 'components/EventList';

const { width } = Dimensions.get('window');

@autobind
class HomeTabScene extends Component {
  state: State;

  state: State = {
    selectedPage: 0,
  };

  onScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x;

    if (this.state.selectedPage === 0 && offsetX > (width / 2)) {
      this.setState({ selectedPage: 1 });
    } else if (this.state.selectedPage === 1 && offsetX < (width / 2)) {
      this.setState({ selectedPage: 0 });
    }
  }

  render() {
    const { selectedPage } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.chooser}>
            <Text style={selectedPage === 0 && { backgroundColor: 'green' }}>
              PETEK, 10. 2.
            </Text>
            <Text style={selectedPage === 1 && { backgroundColor: 'green' }}>
              SOBOTA, 11. 2.
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <ScrollView
            ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
            pagingEnabled
            horizontal
            directionalLockEnabled

            automaticallyAdjustContentInsets={false}

            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}

            onScroll={this.onScroll}
            scrollEventThrottle={16}
          >
            <View style={styles.page}>
              <EventList />
            </View>
            <View style={styles.page}>
              <EventList />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

type State = {
  selectedPage: number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    backgroundColor: 'pink',
    justifyContent: 'flex-end',
  },
  chooser: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  page: {
    flex: 1,
    width,
  },
});

export default HomeTabScene;
