// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { FlatList } from 'react-native';

import ListSeparator from 'components/ListSeparator';
import LabRow from 'components/LabRow';

type Props = {
  labs: Array<LabType>,
  handleScroll?: Function,
};

@autobind
class LabsList extends Component<Props> {
  scrollView: ScrollViewType;

  renderItem(item: LabType) {
    const { item: lab } = item;

    return (
      <LabRow
        lab={lab}
        onPress={() => this.props.navigator.showLightBox({
          screen: 'LabCardScreen',
          passProps: { lab },
          style: {
            backgroundBlur: 'dark',
          },
        })}
      />
    );
  }

  scrollTo(options: { x?: number, y?: number, animated?: boolean }) {
    this.scrollView.scrollToOffset({ offset: options.y });
  }

  render() {
    return (
      <FlatList
        ref={(scrollView: ScrollViewType) => this.scrollView = scrollView}
        data={this.props.labs}
        renderItem={this.renderItem}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={ListSeparator}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 200 }}
        scrollIndicatorInsets={{ top: 200 }}
      />
    );
  }
}

export default LabsList;
