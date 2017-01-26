// @flow
import { Platform } from 'react-native';

const Tabs = Platform.select({
  ios: () => require('tabs/ios').default,
  android: () => require('tabs/android').default,
})();

export default Tabs;
