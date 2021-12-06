import React, { useState } from 'react';

import {
  Container,
  Header,
  Title,
  RentPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Alert, StatusBar } from 'react-native';
import { format } from 'date-fns';

import ArrowSvg from '../../assets/arrow.svg';
import { getPlataformDate } from '../../utils/getPlataformDate';

interface RentalPeriod {
  start: number;
  startFormat: string;
  end: number;
  endFormat: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirmRental() {
    if (rentalPeriod.start || rentalPeriod.end)
      Alert.alert('Selecione o intervalo para alugar!');
    else
      navigation.navigate('RentDetails');
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    // const firstDate = Object.keys(interval)[0];
    // const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    // setRentalPeriod({
    //   start: start.timestamp,
    //   end: end.timestamp,
    //   startFormat: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
    //   endFormat: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
    // })
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormat}>
              {rentalPeriod.startFormat}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormat}>
              {rentalPeriod.endFormat}
            </DateValue>
          </DateInfo>
        </RentPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}