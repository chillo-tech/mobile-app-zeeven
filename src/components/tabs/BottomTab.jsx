import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import { ICONS, LABELS, colors } from '../../utils';
import React from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function BottomTab({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.blue }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = (name) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (name === 'event-scan') {
              //navigation.navigate({name: 'Signin', merge: true});
              navigation.navigate({ name: 'scan-ticket'});
            } else {
              navigation.navigate({ name: route.name });
            }
          }
        };

        const onLongPress = (name) => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={`button${index}`}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => onPress(route.name)}
            onLongPress={() => onLongPress(route.name)}
            style={{
              flex: 1,
              paddingVertical: 8,
              alignItems: 'center',
            }}
          >
            <MaterialIcons
              name={ICONS[route.name]}
              size={24}
              color={isFocused ? colors.white : colors.white}
            />
            <Text style={{ color: isFocused ? colors.white : colors.white }}>
              {LABELS[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTab;
