// @flow
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { StyleSheet } from 'standard';
import HTMLContentView from 'components/HTMLContentView';

class AboutFRIView extends Component {
  props: Props;

  scrollView: ScrollViewType;

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollTo(options);
  }

  render() {
    const { content } = this.props;

    return (
      <ScrollView
        ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
        contentContainerStyle={styles.content}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ top: 200 }}
      >
        <HTMLContentView content={content} />
      </ScrollView>
    );
  }
}

type Props = {
  content: string,
  handleScroll?: Function,
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 210,
  },
});

export default AboutFRIView;
