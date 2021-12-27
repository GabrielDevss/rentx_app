import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ScheduleCompleted } from '../screens/ScheduleCompleted';
import { CarsDetails } from '../screens/CarsDetails';
import { RentDetails } from '../screens/RentDetails';
import { Scheduling } from '../screens/Scheduling';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName='Splash'>
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
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
        name="ScheduleCompleted"
        component={ScheduleCompleted}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}
