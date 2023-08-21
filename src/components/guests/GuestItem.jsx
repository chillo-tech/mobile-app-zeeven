import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { colors } from '../../utils'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

function GuestItem(props) {
  const {item, index} = props;
  return (
    <View style={[styles.wrapper, index%2 === 1 ? {backgroundColor: "#f0f0f5"} : '']}>
        <View style={styles.titleWrapper}>
           {item.civility === 'Mme' && <SimpleLineIcons style={styles.icon} name="user-female" size={24} color="black" />}
           {item.civility === 'MLLE' && <SimpleLineIcons style={styles.icon} name="user-female" size={24} color="black" />}
           {item.civility === 'MR' && <SimpleLineIcons style={styles.icon} name="user" size={24} color="black" />}
           {item.civility === 'MR_MRS' && <Feather style={styles.icon} name="users" size={24} color="black" />}
          <Text style={styles.title}> 
           {item.firstName} {item.lastName}
          </Text>
        </View>
        <View>
           <Text>{index}</Text>
        </View>
    </View>
  )
}
export const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 8
  }, 
  title: {
    fontWeight: '600',
    fontSize: 18,
    verticalAlign: 'middle',
    alignContent: 'center'
  },
	wrapper: {
    borderBottomColor: colors.lightgray,
		backgroundColor: colors.white,
    borderBottomWidth: 1,
    paddingVertical:15,
    paddingHorizontal: 15,
		justifyContent: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
	}
})
export default GuestItem
