// @flow
import { Navigation } from 'react-native-navigation';

import HomeTabScreen from 'screens/HomeTabScreen';
import StudyTabScreen from 'screens/StudyTabScreen';
import InfoTabScreen from 'screens/InfoTabScreen';

const registerScreens = () => {
  Navigation.registerComponent('HomeTabScreen', () => HomeTabScreen);
  Navigation.registerComponent('StudyTabScreen', () => StudyTabScreen);
  Navigation.registerComponent('InfoTabScreen', () => InfoTabScreen);
};

export default registerScreens;
