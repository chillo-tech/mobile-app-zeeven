import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { colors } from '../../utils/styles';


function IconButton({icon, onclick, size = 18, color = colors.primary}) {
	return (
		<TouchableOpacity activeOpacity={1} onPress={onclick} style={styles.button}>
			<AntDesign name={icon} size={size} color={color}/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.white,
		borderRadius: 50,
		marginLeft: 10,
		width: 40,
		height: 40,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		color: colors.primary,
	}
});
export default IconButton;