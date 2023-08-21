import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventListScreen from '../screens/protected/events/EventListScreen';
import EventItemStack from '../screens/protected/events/EventItemStack';
import ScanScreen from '../screens/protected/ScanScreen';
function ProtectedStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='events'>
      <Stack.Screen name="events" component={EventListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="event" component={EventItemStack} options={{ headerShown: false }} />
      <Stack.Screen name="scan-ticket" component={ScanScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ProtectedStack;
