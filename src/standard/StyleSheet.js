// @flow
import { StyleSheet, Platform } from 'react-native';

function create<T: Object>(styles: T): { [key: $Keys<T>]: number } {
  const newStyles: { [key: $Keys<T>]: any } = {};

  Object.keys(styles).forEach((key: string) => {
    const { ios, android, fontWeight, ...rest } = styles[key];

    const customStyles: { [key: $Keys<T>]: string | number } = {};

    if (fontWeight) customStyles.fontFamily = `Montserrat-${fontWeight}`;

    newStyles[key] = {
      backgroundColor: 'transparent',
      ...rest,
      ...Platform.select({
        ios,
        android,
      }),
      ...customStyles,
    };
  });

  return StyleSheet.create(newStyles);
}

export { create };
