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
import { icons } from 'config/styles';

import type { ReducerType } from 'reducers';

const TabItem = TabBar.Item;

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
        key={tab.key}
        title={tab.title}
        onPress={() => this.props.changeTab(index)}
        selected={this.props.currentTab === index}
        titleStyle={styles.title}
        selectedTitleStyle={styles.selectedTitle}
        renderIcon={() => (
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={icons[tab.key].filled}
            tintColor="#C5C3C5"
          />
        )}
        renderSelectedIcon={() => (
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={icons[tab.key].filled}
            tintColor="#444"
          />
        )}
      >
        {this.renderTabContent(tab.key)}
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
  tabs: Array<{ key: string, title: string }>,
  changeTab: (index: number) => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    position: 'absolute',
    backgroundColor: '#FEFEFE',
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
