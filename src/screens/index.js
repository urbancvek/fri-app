// @flow
import { Navigation } from 'react-native-navigation';

import HomeTabScreen from 'screens/HomeTabScreen';
import StudyTabScreen from 'screens/StudyTabScreen';
import InfoTabScreen from 'screens/InfoTabScreen';
import ShopsterTabScreen from 'screens/ShopsterTabScreen';

const registerScreens = () => {
  Navigation.registerComponent('HomeTabScreen', () => HomeTabScreen);
  Navigation.registerComponent('StudyTabScreen', () => StudyTabScreen);
  Navigation.registerComponent('InfoTabScreen', () => InfoTabScreen);
  Navigation.registerComponent('ShopsterTabScreen', () => ShopsterTabScreen);
};

export default registerScreens;
