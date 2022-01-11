import styled from 'styled-components/native';
import { Dimensions } from 'react-native';


export const Container = styled.View`
 width: 100%;
 margin-top: 16px;
 
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;


export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 85px;

  align-items: center;
  justify-content: center;

  margin: 32px 0;

`;

export const CarImage = styled.Image`
  width: 280px;
  height: 133px;
`;

