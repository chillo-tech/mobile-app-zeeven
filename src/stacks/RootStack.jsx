import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationContext } from '../context/ApplicationContextProvider';
import { useContext } from 'react';
import OpenedStack from './OpenedStack';
import ProtectedStack from './ProtectedStack';
function RootStack() {
  const Stack = createNativeStackNavigator();
  const { state } = useContext(ApplicationContext);
  const { authenticatedUser = {} } = state;
  const { accessToken} = authenticatedUser;
  return (
    <Stack.Navigator>
      {accessToken? (
        <Stack.Screen
          name="Protected"
          component={ProtectedStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen name="Unprotected" component={OpenedStack} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RootStack;
