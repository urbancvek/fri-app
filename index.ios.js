// @flow
import { Navigation } from 'react-native-navigation';
import registerScreens from 'screens';

const startApp = async () => {
  Navigation.startTabBasedApp({
    tabs: [{
      label: 'Urnik',
      screen: 'HomeTabScreen',
      icon: require('assets/tab_icons/home_tab.png'),
      selectedIcon: require('assets/tab_icons/home_tab_filled.png'),
    }, {
      label: 'Študij',
      screen: 'StudyTabScreen',
      icon: require('assets/tab_icons/study_tab.png'),
      selectedIcon: require('assets/tab_icons/study_tab_filled.png'),
    }, {
      label: 'Info',
      screen: 'InfoTabScreen',
      icon: require('assets/tab_icons/info_tab.png'),
      selectedIcon: require('assets/tab_icons/info_tab_filled.png'),
    }, {
      label: 'Shopster',
      screen: 'ShopsterTabScreen',
      icon: require('assets/tab_icons/shopster_tab.png'),
      selectedIcon: require('assets/tab_icons/shopster_tab_filled.png'),
    }],
    tabsStyle: {
      tabBarButtonColor: '#929292',
      tabBarSelectedButtonColor: 'black',
      tabBarBackgroundColor: 'white',
    },
  });
};

registerScreens();
startApp();
