import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors, getFormattedTime } from '../../utils';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

function GuestItem(props) {
  const { item, index, scans, invalidateScan } = props;
  const getScannedTime = () => {
      const itemInScans = scans.filter((entry) =>{
        const {guestPublicId, eventPublicId} = entry;
        const {publicId} = item;
        return guestPublicId === publicId;
      }) || [];
      if(itemInScans.length) {
        const {date} = itemInScans[0];
        return getFormattedTime(new Date(date));
      }
      return "";
  }

  return (
    <View>
      <View style={[styles.wrapper, index % 2 === 1 ? { backgroundColor: '#f0f0f5' } : '']}>
        <View>
          <View style={styles.titleWrapper}>
            {(item.civility === 'Mme' || item.civility === 'Mlle') && (
              <SimpleLineIcons style={styles.icon} name="user-female" size={24} color="black" />
            )}
            {item.civility === 'MLLE' && (
              <SimpleLineIcons style={styles.icon} name="user-female" size={24} color="black" />
            )}
            {(item.civility === 'MR' || item.civility === 'Mr') && (
              <SimpleLineIcons style={styles.icon} name="user" size={24} color="black" />
            )}
            {item.civility === 'MR_MRS' && (
              <Feather style={styles.icon} name="users" size={24} color="black" />
            )}
            <Text style={styles.title}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
          {item?.partner ? (
            <Text style={[styles?.title, { marginLeft: 35 }]}>
              {item?.partner}
            </Text>
          ) : null}
        </View>
        <View>
          {
            getScannedTime().length 
            ? (    
              <Pressable
                onPress={() => invalidateScan(item?.publicId)} 
                style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2}}>
                <Text style={{color: colors.success, fontWeight: 'bold', fontSize: 18}}>{getScannedTime()}</Text>
                <Entypo style={{marginLeft: 4}} name="circle-with-cross" size={24} color={colors.error} />
              </Pressable>
            ) 
            : null
          }
        </View>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    verticalAlign: 'middle',
    alignContent: 'center',
  },
  wrapper: {
    borderBottomColor: colors.lightgray,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
});
export default GuestItem;
