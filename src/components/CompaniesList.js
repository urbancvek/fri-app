// @flow
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { FlatList } from 'react-native';

import ListSeparator from 'components/ListSeparator';
import CompanyRow from 'components/CompanyRow';

type Props = {
  companies: Array<CompanyType>,
  handleScroll?: Function,
};

@autobind
class CompaniesList extends Component<Props> {
  scrollView: ScrollViewType;

  renderItem(item: CompanyType) {
    const { item: company } = item;

    return (
      <CompanyRow
        company={company}
        onPress={() => this.props.navigator.showLightBox({
          screen: 'CompanyCardScreen',
          passProps: { company },
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
        data={this.props.companies}
        renderItem={this.renderItem}
        ItemSeparatorComponent={ListSeparator}
        onScroll={this.props.handleScroll}
        keyExtractor={item => item.title}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 200 }}
        scrollIndicatorInsets={{ top: 200 }}
      />
    );
  }
}

export default CompaniesList;
