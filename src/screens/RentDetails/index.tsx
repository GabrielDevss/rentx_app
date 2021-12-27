import React, { useEffect, useState } from 'react';
import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { CarDTO } from '../../dtos/CarsDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native'; 

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  RentTotalContent,
  RentTotal,
  RentContainer,
  Daily,
  Total,
  Icon
} from './styles';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  startFormated: string;
  endFormated: string;
}

export function RentDetails() {
  const [loading, setLoading ] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleRentedCar() {
    setLoading(true);
    const response = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...response.data.unavailable_dates,
      ...dates,
    ];

    await api.post('schedules_byuser', { 
      user_id: 1,
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => navigation.navigate('ScheduleCompleted'))
    .catch(() => { 
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    });

  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startFormated: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormated: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);


  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleBack}
        />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(acessory =>
            <Accessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)} />
          )}
        </Accessories>

        <RentPeriod>
          <Icon>
            <Feather
              name='calendar'
              size={24}
              color={theme.colors.shape}
            />
          </Icon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormated}</DateValue>
          </DateInfo>


          <Feather
            name="chevron-right"
            size={24}
            color={theme.colors.text_detail}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormated}</DateValue>
          </DateInfo>
        </RentPeriod>

        <RentTotalContent>
          <Total>TOTAL</Total>
          <RentContainer>
            <Daily>{`R$ ${car.rent.price} x${dates.length} diárias`}</Daily>
            <RentTotal>R$ {rentTotal}</RentTotal>
          </RentContainer>
        </RentTotalContent>
      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleRentedCar}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}