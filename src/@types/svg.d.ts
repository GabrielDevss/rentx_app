declare module "*.svg" {
  import React from 'react';
  import { svgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
};