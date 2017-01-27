// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated } from 'react-native';

import { StyleSheet } from 'standard';
import AnimatedHeader from 'components/AnimatedHeader';
import SlidingChooser from 'components/SlidingChooser';
import EventList from 'components/EventList';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 97;

@autobind
class HomeTabScene extends Component {
  state: State;
  scrollView: ScrollViewType;

  state: State = {
    selectedPage: 0,
    offsetY: new Animated.Value(0),
  };

  scrollViews: Array<ScrollViewType> = [];

  onScroll(event: ScrollEventType) {
    const { selectedPage } = this.state;
    const offsetX = event.nativeEvent.contentOffset.x;

    const pageToSelect = Math.round(offsetX / width);
    if (pageToSelect !== selectedPage) {
      this.setState({ selectedPage: pageToSelect });
    }
  }

  scrollToPage(index: number) {
    this.scrollView.scrollTo({ x: width * index });
  }

  handleListScroll(index: number, event: ScrollEventType) {
    if (index !== this.state.selectedPage) return;
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)) {
      this.scrollViews.forEach((scrollView, idx) => {
        if (idx !== this.state.selectedPage) {
          scrollView.scrollTo({ y: offsetY, animated: false });
        }
      });

      this.state.offsetY.setValue(Math.min(offsetY, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)));
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
        <AnimatedHeader
          headerHeight={headerHeight}
          selectedPage={this.state.selectedPage}
        >
          <SlidingChooser
            tabs={['10.2. DOP', '10.2. POP', '11.2. DOP']}
            selectedPage={this.state.selectedPage}
            scrollToPage={this.scrollToPage}
          />
        </AnimatedHeader>
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
                handleScroll={event => this.handleListScroll(0, event)}
              />
            </View>
            <View style={styles.page}>
              <EventList
                ref={(scrollView: ScrollViewType) => this.scrollViews[1] = scrollView}
                handleScroll={event => this.handleListScroll(1, event)}
              />
            </View>
            <View style={styles.page}>
              <EventList
                ref={(scrollView: ScrollViewType) => this.scrollViews[2] = scrollView}
                handleScroll={event => this.handleListScroll(2, event)}
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
  offsetY: Animated.Value,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  page: {
    flex: 1,
    width,
  },
});

export default HomeTabScene;
