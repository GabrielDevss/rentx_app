import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../../components/Car';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarsDTO';

import Logo from '../../assets/logo.svg';
import { Load } from '../../components/Load';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const navigation = useNavigation();
  
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarsDetails', { car });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
        throw new Error('Não foi possível carregar!');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [])


  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {isLoading ? <Load /> :

        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

    </Container>
  );
}