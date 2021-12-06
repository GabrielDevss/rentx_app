import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Accesory } from '../../components/Accesory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarsDTO';
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
  About,
  Footer,
} from './styles';

import SpeedSvg from '../../assets/speed.svg';

interface Params {
  car: CarDTO;
}

export function CarsDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleSheduling() {
    navigation.navigate('Scheduling');
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
          { car.accessories.map(accessory => 
            <Accesory
             key={accessory.type}
             name={accessory.name}
             icon={getAccessoryIcon(accessory.type)}
            />
          )}
       
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title='Escolher período do aluguel'
          onPress={handleSheduling}
        />
      </Footer>
    </Container>
  );
}