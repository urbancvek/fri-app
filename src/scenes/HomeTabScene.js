// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import { StyleSheet } from 'standard';
import SlidingChooser from 'components/SlidingChooser';
import EventList from 'components/EventList';

const { width } = Dimensions.get('window');

@autobind
class HomeTabScene extends Component {
  state: State;
  scrollView: ScrollViewType;

  state: State = {
    selectedPage: 0,
  };

  onScroll(event: ScrollEventType) {
    const { selectedPage } = this.state;
    const offsetX = event.nativeEvent.contentOffset.x;

    const pageToSelect = Math.round(offsetX / 375);
    if (pageToSelect !== selectedPage) this.setState({ selectedPage: pageToSelect });
  }

  scrollToPage(index: number) {
    this.scrollView.scrollTo({ x: width * index });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SlidingChooser
            tabs={['Petek, 10.2.', 'Sobota, 11.2.', 'Nedelja, 12.2']}
            selectedPage={this.state.selectedPage}
            scrollToPage={this.scrollToPage}
          />
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
  page: {
    flex: 1,
    width,
  },
});

export default HomeTabScene;
