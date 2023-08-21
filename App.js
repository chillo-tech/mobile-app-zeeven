import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/stacks/RootStack';
import ApplicationContextProvider from './src/context/ApplicationContextProvider';
import SecurityContextProvider from './src/context/SecurityContextProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ApplicationContextProvider>
          <SecurityContextProvider>
            <RootStack />
          </SecurityContextProvider>
        </ApplicationContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
