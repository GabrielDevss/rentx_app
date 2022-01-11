import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface OptionProps {
  active?: boolean;
}

export const Container = styled.View`
 background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  height: 227px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;
  align-items: center;
`;

export const ContentHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + 30}px;
`;


export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const  PhotoContainer = styled.View`
  height: 180px;
  width: 180px;
  border-radius: 90px;

  align-items: center;
  justify-content: center;  
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 50px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.main};

  align-items: center;
  justify-content: center;

  position: absolute;

  right: 4px;
  bottom: 4px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 16px;
  ${({ active }) => active && css`
  border-bottom-width: 3px;
  border-bottom-color: ${({ theme }) => theme.colors.main };
  `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-family: ${({ theme, active }) => 
  active ? theme.fonts.secondary_600 : theme.fonts.secondary_400};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) => 
  active ? theme.colors.title : theme.colors.text_detail};
`;

export const Section = styled.View``;