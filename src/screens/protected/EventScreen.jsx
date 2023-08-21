import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import ProfileScreen from './ProfileScreen';

function EventScreen() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ paddingBottom: 48 }}
  >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
  )
}

export default EventScreen
