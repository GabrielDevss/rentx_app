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
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Alert, StatusBar } from 'react-native';
import { format } from 'date-fns';

import ArrowSvg from '../../assets/arrow.svg';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarsDTO';

interface RentalPeriod {
  startFormated: string;
  endFormated: string;
}

interface Params {
  car: CarDTO;
}


export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
      navigation.navigate('RentDetails', {
        car,
        dates: Object.keys(markedDates)
      });
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

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormated: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormated: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
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
            <DateValue selected={!!rentalPeriod.startFormated}>
              {rentalPeriod.startFormated}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormated}>
              {rentalPeriod.endFormated}
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
          enabled={!!rentalPeriod.startFormated}
        />
      </Footer>
    </Container>
  );
}