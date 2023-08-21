import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { colors } from '../../utils/styles';

function Message({firstText, type = ""}) {
	const [style, setStyle] = useState({});
	const componentStyle = (type) => {
		switch (type) {
			case "success":
				return {container: styles.successContainer, text: styles.successText}
			case "error":
				return {container: styles.errorContainer, text: styles.errorText}
			default:
				return {container: styles.defaultContainer, text: styles.defaultText}
		}
	}

	useEffect(() => {
		const {container, text} = componentStyle(type);
		setStyle({container, text});
	}, [])
	return (
		<View style={style['container']}>
			<Text style={style['text']}>{firstText}</Text>
		</View>
	);
}

export default Message;

const styles = StyleSheet.create({
	defaultText: {
		color: colors.primary,
		fontSize: 16,
		lineHeight: 30,
		textAlign: 'center'
	},
	defaultContainer: {
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 130,
		borderRadius: 10
	},
	errorContainer: {
		backgroundColor: "#f8d7da",
		borderColor: "#f5c6cb",
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		borderRadius: 10
	},
	errorText: {
		color: colors.error,
		fontSize: 16,
		textAlign: 'center'
	},
	successContainer: {
		backgroundColor: "#d4edda",
		borderColor: "#c3e6cb",
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		borderRadius: 10
	},
	successText: {
		color: colors.success,
		fontSize: 16,
		textAlign: 'center'
	},
})