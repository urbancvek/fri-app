// @flow
type IconsType = {
  'HOME_TAB': {
    empty: any,
    filled: any,
  },
  'STUDY_TAB': {
    empty: any,
    filled: any,
  },
  'MAP_TAB': {
    empty: any,
    filled: any,
  },
  'INFO_TAB': {
    empty: any,
    filled: any,
  },
  'SHOPSTER_TAB': {
    empty: any,
    filled: any,
  },
};

const icons: IconsType = {
  HOME_TAB: {
    empty: require('assets/tab_icons/home_tab.png'),
    filled: require('assets/tab_icons/home_tab_filled.png'),
  },
  STUDY_TAB: {
    empty: require('assets/tab_icons/study_tab.png'),
    filled: require('assets/tab_icons/study_tab_filled.png'),
  },
  MAP_TAB: {
    empty: require('assets/tab_icons/map_tab.png'),
    filled: require('assets/tab_icons/map_tab_filled.png'),
  },
  INFO_TAB: {
    empty: require('assets/tab_icons/info_tab.png'),
    filled: require('assets/tab_icons/info_tab_filled.png'),
  },
  SHOPSTER_TAB: {
    empty: require('assets/tab_icons/shopster_tab.png'),
    filled: require('assets/tab_icons/shopster_tab_filled.png'),
  },
};

export { icons };
