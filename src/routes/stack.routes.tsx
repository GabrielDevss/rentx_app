import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ScheduleCompleted } from '../screens/ScheduleCompleted';
import { CarsDetails } from '../screens/CarsDetails';
import { RentDetails } from '../screens/RentDetails';
import { Scheduling } from '../screens/Scheduling';
import { Home } from '../screens/Home';

const { Navigator, Screen} = createStackNavigator();

export function StackRoutes() {
  return (
      <Navigator headerMode="none">
        <Screen
          name="Home"
          component={Home} />
        <Screen

          name="CarsDetails"
          component={CarsDetails} />
        <Screen
          name="Scheduling"
          component={Scheduling} />

        <Screen
          name="RentDetails"
          component={RentDetails} />

        <Screen
          name="ScheduleCompleted"
          component={ScheduleCompleted} />
      </Navigator>
  )
}
