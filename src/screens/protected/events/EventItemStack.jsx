import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useContext, useState } from 'react';
import BottomTab from '../../../components/tabs/BottomTab';
import EventGuests from './EventGuests';
import EventReports from './EventReports';
import EventScan from './EventScan';
import { colors } from '../../../utils';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';

const Tab = createBottomTabNavigator();

function EventItemStack({ route, navigation }) {
  const {
    params: { publicId },
  } = route;
  const {
    state: { event },
  } = useContext(ApplicationContext);
  useEffect(() => {
    if (!event){
      navigation.navigate('events');
    }
    if (event && !(event.publicId === publicId)){
      navigation.navigate('events');
    }
    
  }, [publicId, event]);
  return (
    <>
      {event ? (
        <Tab.Navigator
          initialRouteName="event-guests"
          tabBar={(props) => <BottomTab {...props} />}
          screenOptions={({ route }) => ({
            backgroundColor: colors.black,
            headerStyle: {
              backgroundColor: colors.blue,
              elevation: 0,
              shadowOpacity: 0,
            },
            title: event.name,
            headerTintColor: colors.white,


            headerTitleStyle: {
              fontWeight: 'bold',
              textTransform: 'uppercase'
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="event-guests" component={EventGuests} initialParams={{ event }} />
          <Tab.Screen 
            name="event-scan" 
            component={EventScan} 
            initialParams={{ event }} 
            
          />
          <Tab.Screen name="event-report" component={EventReports} initialParams={{ event }} />
        </Tab.Navigator>
      ) : null}
    </>
  );
}

export default EventItemStack;
