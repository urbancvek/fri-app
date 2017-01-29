// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import TabBar from 'react-native-tab-navigator';

import { StyleSheet } from 'standard';
import HomeTabScene from 'scenes/HomeTabScene';
import StudyTabScene from 'scenes/StudyTabScene';
import MapTabScene from 'scenes/MapTabScene';
import InfoTabScene from 'scenes/InfoTabScene';
import ShopsterTabScene from 'scenes/ShopsterTabScene';
import { changeTabAction } from 'actions/navigationActions';

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

  renderTabItem(tab: string, index: number) {
    return (
      <TabItem
        key={tab}
        title={tab}
        onPress={() => this.props.changeTab(index)}
        selected={this.props.currentTab === index}
        titleStyle={styles.title}
        selectedTitleStyle={styles.selectedTitle}
        renderIcon={() => (
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={icons[tab].empty}
            tintColor="black"
          />
        )}
        renderSelectedIcon={() => (
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={icons[tab].filled}
            tintColor="black"
          />
        )}
      >
        {this.renderTabContent(tab)}
      </TabItem>
    );
  }

  render() {
    const tabs = this.props.tabs.map(this.renderTabItem);

    return (
      <TabBar
        tabBarStyle={styles.tabbar}
        hidesTabTouch
      >
        {tabs}
      </TabBar>
    );
  }
}

type Props = {
  currentTab: number,
  tabs: Array<string>,
  changeTab: (index: number) => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    position: 'absolute',
  },
  title: {
    color: 'black',
    fontSize: 11,
  },
  selectedTitle: {
    color: 'black',
  },
  icon: {
    backgroundColor: 'transparent',
    top: 3,
    height: 27,
  },
});

const select = ({ navigationStore }: ReducerType) => ({
  currentTab: navigationStore.tabs.currentTab,
  tabs: navigationStore.tabs.availableTabs,
});

const actions = (dispatch: Dispatch) => ({
  changeTab: (tab) => dispatch(changeTabAction(tab)),
});

export default connect(select, actions)(Tabs);
