import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

interface ImageIndexProps {
  active?: boolean;
}

export const Container = styled.View`
 width: 100%;
 margin-top: 18px;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;

  background-color: ${({ theme, active }) =>
  active ? theme.colors.title : theme.colors.shape};

  margin-left: 8px;
  border-radius: 3px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  align-items: center;
  justify-content: center;

  margin: 32px 0;

`;

export const CarImage = styled.Image`
  width: 280px;
  height: 133px;
`;

