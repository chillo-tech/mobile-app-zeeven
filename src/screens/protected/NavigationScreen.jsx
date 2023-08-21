import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTab from '../../components/tabs/BottomTab';
import EventGuests from './events/EventGuests';

const Tab = createBottomTabNavigator();

function NavigationScreen() {
  return (
    <Tab.Navigator initialRouteName="event-guests" tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="event-guests" component={EventGuests} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default NavigationScreen;
