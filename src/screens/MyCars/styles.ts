import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
 flex: 1;
 background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${({ theme }) => theme.colors.header};
  justify-content: center;
  padding-top: ${getStatusBarHeight() + 30}px;
  padding: 24px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 18px;
  margin-top: 22px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;


export const AppointmentsMade = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;

`;

export const Appointments = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const NumberAppointments = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const CarListContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const CarWapper = styled.View`
  margin-bottom: 16px;
`;

export const RentalPeriod = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: -10px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  margin-left: 24px;
`;

export const DateValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.title};
  padding: 10px;
`;

