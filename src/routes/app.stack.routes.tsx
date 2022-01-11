import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Confirmation } from '../screens/Confirmation';
import { CarsDetails } from '../screens/CarsDetails';
import { RentDetails } from '../screens/RentDetails';
import { Scheduling } from '../screens/Scheduling';
import { MyCars } from '../screens/MyCars';

import { Home } from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen
        name="Home"
        component={Home}
      />

      <Screen
        name="CarsDetails"
        component={CarsDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />

      <Screen
        name="RentDetails"
        component={RentDetails}
      />

      <Screen
        name="Confirmation"
        component={Confirmation}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}
