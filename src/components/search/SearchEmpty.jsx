import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../utils';
import Message from '../../components/messages/Message';

function SearchEmpty() {
	return (
		<View style={styles.container}>
			<Message
				firstText="Désolé, aucune publication ne correspond à vos critères de recherche."
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 5,
		overflow: 'hidden',
		padding: 10,
	},
});
export default SearchEmpty;