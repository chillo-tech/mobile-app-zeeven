import {StyleSheet} from 'react-native';

export const colors = {
	success: '#146608',
	lightGreen: '#8BED4F',
	primary: '#30698C',
	error: '#F22727',
	darkgray: "#545454FF",
	lightgray: "#cccccc",
	black: "#000000",
	warning: "#F2785C",
	warningLight: "#f6ece7",
	white: "#ffffff",
	blue: "#041d3f",
	yellow: "#fcde6d",
}

export const globalStyles = StyleSheet.create({
	bacgroundImage: {
		flex: 1,
		justifyContent: "center",
	},
	button: {
		backgroundColor: colors.warning,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 20,
		paddingVertical: 10
	},
	container: {
		marginTop: 0,
		flex: 1,
		justifyContent: 'space-around'
	},
	error: {
		color: colors.error,
		fontSize: 18,
		marginBottom: 20
	},
	inputField: {
		paddingVertical: 15,
		paddingHorizontal: 0,
		width: '100%'
	},
	inputGroupDefault: {
		marginBottom: 15,
	},
	inputGroupError: {
		borderBottomWidth: 1,
		borderColor: colors.error,
	},
	inputGroup: {
		borderBottomWidth: 1,
		borderColor: colors.primary,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputIcon: {
		textAlign: 'center',
		padding: 10,
		width: 40,
		height: 40,
		backgroundColor: colors.lightgray,
		borderTopLeftRadius: 11,
		borderBottomLeftRadius: 11,
		display: 'none'
	},
	inputTextarea: {
		borderBottomWidth: 1,
		borderColor: colors.primary
	},
	inputTextAreaPadding: {
		paddingTop: 20,
		paddingBottom: 20,
	},
	inputTitle: {
		fontWeight: '700',
		fontSize: 20,
		color: colors.primary
	},
	textBlue: {
		color: colors.primary
	},
	creationContainer: {
		flex: 1,
		justifyContent: 'space-between'
	},
	creationHeader: {
		paddingHorizontal: 10,
		paddingBottom: 10,
		flex: 1,
    alignItems: 'center'
	},
	creationTitle: {
		fontSize: 30,
		color: colors.white
	},
	creationBody: {
		backgroundColor: colors.white,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	creationBodyContent: {
		paddingHorizontal: 10,
		paddingVertical: 60
	},
	creationBodyFieldGroup: {
		borderColor: colors.lightgray,
		borderRadius: 5,
		marginVertical: 5,
		borderWidth: 2,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden'
	},
	creationBodyField: {
		flexGrow: 1,
		paddingVertical: 10,
		paddingLeft: 10
	},
	fieldFont: {
		fontStyle: 'normal',
		fontSize: 20,
		color: colors.black,
	},
	placaholderFieldFont: {
		fontStyle: 'normal',
		fontSize: 20,
		color: colors.lightgray,
	},
	fieldIcon: {
		fontSize: 20,
		color: colors.black,
		paddingHorizontal: 10
	},
	wrapper: {
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		flex: 1,
		justifyContent: 'flex-end',
		padding: 10
	},
})