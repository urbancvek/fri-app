// @flow
import { Navigation } from 'react-native-navigation';

import HomeTabScreen from 'screens/HomeTabScreen';
import StudyTabScreen from 'screens/StudyTabScreen';
import MapTabScreen from 'screens/MapTabScreen';
import InfoTabScreen from 'screens/InfoTabScreen';
import ShopsterTabScreen from 'screens/ShopsterTabScreen';

import CompanyCardScreen from 'screens/CompanyCardScreen';
import EventCardScreen from 'screens/EventCardScreen';
import StudyProgramCardScreen from 'screens/StudyProgramCardScreen';
import LabCardScreen from 'screens/LabCardScreen';

const registerScreens = () => {
  Navigation.registerComponent('HomeTabScreen', () => HomeTabScreen);
  Navigation.registerComponent('StudyTabScreen', () => StudyTabScreen);
  Navigation.registerComponent('MapTabScreen', () => MapTabScreen);
  Navigation.registerComponent('InfoTabScreen', () => InfoTabScreen);
  Navigation.registerComponent('ShopsterTabScreen', () => ShopsterTabScreen);

  Navigation.registerComponent('CompanyCardScreen', () => CompanyCardScreen);
  Navigation.registerComponent('EventCardScreen', () => EventCardScreen);
  Navigation.registerComponent('StudyProgramCardScreen', () => StudyProgramCardScreen);
  Navigation.registerComponent('LabCardScreen', () => LabCardScreen);
};

export default registerScreens;
