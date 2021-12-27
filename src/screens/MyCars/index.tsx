import React, { useEffect, useState } from 'react';
import { LoadAnimated } from '../../components/LoadAnimated';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarsDTO';
import { Car } from '../../components/Car';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  AppointmentsMade,
  Appointments,
  NumberAppointments,
  CarListContainer,
  RentalPeriod,
  Period,
  DateValueContainer,
  DateValue,
  CarWapper,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

interface RentalPeriod {
  startFormated: string;
  endFormated: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
        throw new Error('Não foi possível carregar!');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Title>
          Seus agendamentos,{'\n'}
          estão aqui.
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {isLoading ? <LoadAnimated /> :
          <CarListContainer>
          <AppointmentsMade>
            <Appointments>
              Agendamentos feitos
            </Appointments>
            <NumberAppointments>{cars.length}</NumberAppointments>
          </AppointmentsMade>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWapper>
                <Car data={item.car} />
                <RentalPeriod>
                  <Period>Periodo</Period>
                  <DateValueContainer>
                    <DateValue>{item.startDate}</DateValue>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.text_detail}
                    />
                    <DateValue>{item.endDate}</DateValue>
                  </DateValueContainer>
                </RentalPeriod>
              </CarWapper>
            )}
          />
        </CarListContainer>
      }
    </Container>
  );
}