// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated } from 'react-native';

import { StyleSheet } from 'standard';
import AnimatedHeader from 'components/AnimatedHeader';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 97;

@autobind
class ParallaxScrollView extends Component {
  props: Props;
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
    const { selectedPage } = this.state;
    const HEADER_DIFFERENCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    if (index !== selectedPage) return;
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY < HEADER_DIFFERENCE) {
      this.scrollViews.forEach((scrollView, idx) =>
        idx !== selectedPage && scrollView.scrollTo({ y: offsetY, animated: false })
      );
    }

    this.state.offsetY.setValue(Math.min(offsetY, HEADER_DIFFERENCE));
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
          title={this.props.title}
          tabs={this.props.tabs}
          headerHeight={headerHeight}
          imageWidth={450}
          selectedPage={this.state.selectedPage}
          scrollToPage={this.scrollToPage}
          backgroundImage={this.props.backgroundImage}
        />
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
            {React.Children.map(this.props.children, ((element, index) => (
              <View style={styles.page}>
                {
                  React.cloneElement(element, {
                    ref: (scrollView: ScrollViewType) => this.scrollViews[index] = scrollView,
                    handleScroll: event => this.handleListScroll(index, event),
                  })
                }
              </View>
            )))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

type Props = {
  children?: any,
  tabs: Array<string>,
  title: string,
  backgroundImage: any,
};

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

export default ParallaxScrollView;
