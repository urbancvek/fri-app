// @flow
import { Navigation } from 'react-native-navigation';

import HomeTabScreen from 'screens/HomeTabScreen';
import StudyTabScreen from 'screens/StudyTabScreen';

const registerScreens = () => {
  Navigation.registerComponent('HomeTabScreen', () => HomeTabScreen);
  Navigation.registerComponent('StudyTabScreen', () => StudyTabScreen);
};

export default registerScreens;
