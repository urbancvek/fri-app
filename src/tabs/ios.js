// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { TabBarIOS as TabBar, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { StyleSheet } from 'standard';
import HomeTabScene from 'scenes/HomeTabScene';
import StudyTabScene from 'scenes/StudyTabScene';
import MapTabScene from 'scenes/MapTabScene';
import InfoTabScene from 'scenes/InfoTabScene';
import ShopsterTabScene from 'scenes/ShopsterTabScene';
import { changeTabAction } from 'actions/navigationActions';

import type { ReducerType } from 'reducers';

const TabItem = TabBar.Item;

const icons = {
  HOME_TAB: {
    empty: require('assets/tab_icons/home_tab.png'),
    filled: require('assets/tab_icons/home_tab_filled.png'),
  },
  STUDY_TAB: {
    empty: require('assets/tab_icons/map_tab.png'),
    filled: require('assets/tab_icons/map_tab_filled.png'),
  },
  MAP_TAB: {
    empty: require('assets/tab_icons/map_tab.png'),
    filled: require('assets/tab_icons/map_tab_filled.png'),
  },
  INFO_TAB: {
    empty: require('assets/tab_icons/map_tab.png'),
    filled: require('assets/tab_icons/map_tab_filled.png'),
  },
  SHOPSTER_TAB: {
    empty: require('assets/tab_icons/map_tab.png'),
    filled: require('assets/tab_icons/map_tab_filled.png'),
  },
};

const { height } = Dimensions.get('window');

@autobind
class Tabs extends Component {
  props: Props;

  renderTabContent(key: string) {
    switch (key) {
      case 'HOME_TAB': return <HomeTabScene />;
      case 'STUDY_TAB': return <StudyTabScene />;
      case 'MAP_TAB': return <MapTabScene />;
      case 'INFO_TAB': return <InfoTabScene />;
      case 'SHOPSTER_TAB': return <ShopsterTabScene />;
      default: return <View />;
    }
  }

  renderTabItem(tab: { key: string, title: string }, index: number) {
    return (
      <TabItem
        style={styles.container}
        key={tab.key}
        title={tab.title}
        onPress={() => this.props.changeTab(index)}
        selected={this.props.currentTab === index}
        icon={icons[tab.key].empty}
        selectedIcon={icons[tab.key].filled}
      >
        <View style={{ height: height - 49 }}>
          {this.renderTabContent(tab.key)}
        </View>
      </TabItem>
    );
  }

  render() {
    const tabs = this.props.tabs.map(this.renderTabItem);

    return (
      <TabBar
        barTintColor="white"
        unselectedTintColor="black"
        tintColor="black"
      >
        {tabs}
      </TabBar>
    );
  }
}

type Props = {
  currentTab: number,
  tabs: Array<{key: string, title: string }>,
  changeTab: (index: number) => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const select = ({ navigationStore }: ReducerType) => ({
  currentTab: navigationStore.tabs.currentTab,
  tabs: navigationStore.tabs.availableTabs,
});

const actions = (dispatch: Dispatch) => ({
  changeTab: (tab: number) => dispatch(changeTabAction(tab)),
});

export default connect(select, actions)(Tabs);
