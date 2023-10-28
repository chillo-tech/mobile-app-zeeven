import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationContext} from '../context/ApplicationContextProvider';
import {useContext} from 'react';
import OpenedStack from './OpenedStack';
import ProtectedStack from './ProtectedStack';
import {colors} from "../utils";

function RootStack() {
    const Stack = createNativeStackNavigator();
    const {state} = useContext(ApplicationContext);
    const {authenticatedUser = {}} = state;
    const {accessToken} = authenticatedUser;
    return (
        <Stack.Navigator screenOptions={{
            statusBarStyle: 'light',
            statusBarColor: colors.blue,
        }}>
            {accessToken ? (
                <Stack.Screen
                    name="Protected"
                    component={ProtectedStack}
                    options={{headerShown: false}}
                />
            ) : (
                <Stack.Screen name="Unprotected" component={OpenedStack} options={{headerShown: false}}/>
            )}
        </Stack.Navigator>
    );
}

export default RootStack;
