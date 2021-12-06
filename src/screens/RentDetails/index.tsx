import React from 'react';
import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accesory } from '../../components/Accesory';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'; 

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
  Accesories,
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

import { CarDTO } from '../../dtos/CarsDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}

export function RentDetails() {
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params; 
  const navigation = useNavigation();

  function handleRentedCar() {
    navigation.navigate('ScheduleCompleted');
  }

  function handleBack() {
    navigation.goBack();
  }


  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleBack}
        />
      </Header>
      <CarImages>
        <ImageSlider
          imageUrl={ car.photos }
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

        <Accesories>
          {
            car.accessories.map(accessories => {
              <Accesory
              key={accessories.type}
               name={accessories.name}
               icon={getAccessoryIcon(accessories.type)} />
            })
          }     
        </Accesories>

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
            <DateValue>18/06/2021</DateValue>
          </DateInfo>


          <Feather
            name="chevron-right"
            size={24}
            color={theme.colors.text_detail}
          />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>20/06/2021</DateValue>
          </DateInfo>
        </RentPeriod>

        <RentTotalContent>
          <Total>TOTAL</Total>
          <RentContainer>
            <Daily>R$ 580 x3 diárias</Daily>
            <RentTotal>R$ 2.900</RentTotal>
          </RentContainer>
        </RentTotalContent>
      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleRentedCar}
        />
      </Footer>
    </Container>
  );
}