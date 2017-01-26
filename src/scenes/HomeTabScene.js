// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated } from 'react-native';

import { StyleSheet } from 'standard';
import SlidingChooser from 'components/SlidingChooser';
import EventList from 'components/EventList';

const { width } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;

@autobind
class HomeTabScene extends Component {
  state: State;
  scrollView: ScrollViewType;

  state: State = {
    selectedPage: 0,
    controlingOffset: true,
    offsetY: new Animated.Value(0),
  };

  scrollViews: Array<ScrollViewType> = [];

  onScroll(event: ScrollEventType) {
    const { selectedPage } = this.state;
    const offsetX = event.nativeEvent.contentOffset.x;

    const pageToSelect = Math.round(offsetX / width);
    if (pageToSelect !== selectedPage) {
      this.setState({ selectedPage: pageToSelect, controlingOffset: false });
      this.scrollViews.forEach(scrollView =>
        scrollView.scrollTo({ y: 0, animated: false })
      );
    }
  }

  scrollToPage(index: number) {
    this.scrollView.scrollTo({ x: width * index });
  }

  handleListScroll(event: ScrollEventType) {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY >= this.state.offsetY._value && !this.state.controlingOffset) {
      this.setState({ controlingOffset: true });
    }

    if (this.state.controlingOffset) {
      this.state.offsetY.setValue(Math.min(offsetY, 140));
    }
  }

  render() {
    const headerHeight = this.state.offsetY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <SlidingChooser
            tabs={['Petek, 10.2.', 'Sobota, 11.2.', 'Nedelja, 12.2']}
            selectedPage={this.state.selectedPage}
            scrollToPage={this.scrollToPage}
          />
        </Animated.View>
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
              <EventList
                ref={(scrollView: ScrollViewType) => this.scrollViews[0] = scrollView}
                handleScroll={this.handleListScroll}
                headerHeight={headerHeight}
              />
            </View>
            <View style={styles.page}>
              <EventList
                ref={(scrollView: ScrollViewType) => this.scrollViews[1] = scrollView}
                handleScroll={this.handleListScroll}
                headerHeight={headerHeight}
              />
            </View>
            <View style={styles.page}>
              <EventList
                ref={(scrollView: ScrollViewType) => this.scrollViews[2] = scrollView}
                handleScroll={this.handleListScroll}
                headerHeight={headerHeight}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

type State = {
  selectedPage: number,
  controlingOffset: boolean,
  offsetY: Animated.Value,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width,
    zIndex: 1,
    backgroundColor: 'pink',
    justifyContent: 'flex-end',
  },
  page: {
    flex: 1,
    width,
  },
});

export default HomeTabScene;
