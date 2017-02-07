// @flow
import React from 'react';
import { Image, Dimensions } from 'react-native';
import HTML from 'react-native-fence-html';

const { width } = Dimensions.get('window');

const htmlStyles = {
  h1: {
    fontFamily: 'Montserrat',
  },
  h2: {
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginBottom: 0,
    color: '#444',
  },
  p: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    color: '#333333',
    letterSpacing: 0.3,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 0,
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
    lineHeight: 23,
  },
};

const renderers = {
  img: (htmlAttribs, children, passProps) => {
    const widthOfContent = width - 16 - 20;
    const scale = widthOfContent / htmlAttribs.width;
    const height = htmlAttribs.height * scale;

    return (
      <Image
        source={{ uri: htmlAttribs.src, width: widthOfContent, height }}
        style={passProps.htmlStyles.img}
        {...passProps}
      />
    );
  },
};

const HTMLContentView = ({ content }: Props) => (
  <HTML
    html={content}
    htmlStyles={htmlStyles}
    renderers={renderers}
  />
);

type Props = {
  content: string,
};

export default HTMLContentView;
