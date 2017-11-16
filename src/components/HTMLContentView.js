// @flow
import React from 'react';
import { Image, Dimensions, View, Text } from 'react-native';
import HTML from 'react-native-render-html';

import { StyleSheet } from 'standard';

const { width } = Dimensions.get('window');

type Props = {
  content: string,
};

const HTMLContentView = ({ content }: Props) => console.log(content) || (
  <HTML
    html={content}
    renderers={renderers}
    baseFontStyle={{}}
  />
);

const renderers = {
  img: (htmlAttribs, children, passProps) => {
    const widthOfContent = width - 16 - 20;
    const scale = widthOfContent / htmlAttribs.width;
    const height = htmlAttribs.height * scale;

    return (
      <Image
        key={Math.random()}
        source={{ uri: htmlAttribs.src, width: widthOfContent, height }}
        style={styles.img}
      />
    );
  },
  h1: (htmlAttribs, children) => <Text key={Math.random()} style={styles.h1}>{children}</Text>,
  h2: (htmlAttribs, children) => <Text key={Math.random()} style={styles.h2}>{children}</Text>,
  p: (htmlAttribs, children) => <Text key={Math.random()} style={styles.p}>{children}</Text>,
  li: (htmlAttribs, children) => <Text key={Math.random()} style={styles.li}>{children}</Text>,
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  h2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    color: '#444',
  },
  p: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    color: '#333333',
    letterSpacing: 0.3,
    lineHeight: 20,
    marginBottom: 10,
  },
  img: {
    marginTop: 15,
    marginBottom: 15,
  },
  li: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    color: '#333333',
    letterSpacing: 0.3,
    lineHeight: 20,
    marginBottom: 5,
  },
});

export default HTMLContentView;
