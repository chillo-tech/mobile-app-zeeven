import React, { useContext } from 'react';
import BaseScreen from '../shared/BaseScreen';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, globalStyles } from '../../utils';
import { ApplicationContext } from '../../context/ApplicationContextProvider';

function MoreScreen() {

  const { signOut } = useContext(ApplicationContext);
  return (
    <BaseScreen>
      <View style={[globalStyles.creationHeader, { marginTop: 20, alignItems: 'flex-start'  }]}>
        <Text style={[globalStyles.creationTitle, { fontSize: 20, alignItems: 'flex-start' }]}>
          Bienvenue
        </Text>
        <Text
          style={[
            globalStyles.creationTitle,
            { fontWeight: 900, fontSize: 60 },
          ]}
        >
          ZEEVEN
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.logout} onPress={() => signOut()}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}

export default MoreScreen;

const styles = StyleSheet.create({
  logout: {
    paddingTop: 40,
    marginHorizontal: 10,
    marginBottom: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
  },
  logoutText: {
    fontWeight: '600',
    fontSize: 18,
		borderBottomWidth: 1,
		color: colors.white,
		borderBottomColor: colors.white,
  },
	container: {
    flex: 1,
		justifyContent: "space-around",
		backgroundColor: colors.white,
    paddingHorizontal: 15
	},
	listStyle: {
		marginHorizontal: 5,
	},
	sectionTitle: {
		marginTop: 25,
		color: colors.black,
		paddingHorizontal: 5,
		fontSize: 24,
		paddingVertical: 10,
		fontWeight: 'bold',
	}
})
