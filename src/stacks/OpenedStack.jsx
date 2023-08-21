import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet} from 'react-native';
import SignInScreen from '../screens/opened/SignInScreen';
import { colors } from '../utils/styles';

function OpenedStack() {
	const Stack = createNativeStackNavigator();

	return (
		<LinearGradient
			start={{x: 0, y: 0}}
			end={{x: 1, y: 1}}
			colors={[colors.warning, colors.primary]}
			style={styles.container}
		>
			<Stack.Navigator>
				<Stack.Screen
					name="signup"
					component={SignInScreen}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</LinearGradient>
	)
}


const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 0,
		flex: 1,
		flexDirection: 'column'
	}
});

export default OpenedStack;
