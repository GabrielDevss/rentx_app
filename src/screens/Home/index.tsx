import React, { useEffect, useState } from 'react';
import { StatusBar, Button } from 'react-native';
import { LoadAnimated } from '../../components/LoadAnimated';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { synchronize } from '@nozbe/watermelondb/sync';
import { CarDTO } from '../../dtos/CarsDTO';
import { Car } from '../../components/Car';
import { database } from '../../database';
import { api } from '../../services/api';

import { Car as ModelCar } from '../../database/model/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

import Logo from '../../assets/logo.svg';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<ModelCar[]>([]);
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarsDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0} `);

        const { changes, lastPulledVersion } = response.data;
        return { changes, timestamp: lastPulledVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCars() {
      try {
        // const response = await api.get('/cars');
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
        throw new Error('Não foi possível carregar!');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    }
  }, []);

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
          {
            !isLoading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      <Button title='sincronizar' onPress={offlineSynchronize} />

      {isLoading ? <LoadAnimated /> :

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