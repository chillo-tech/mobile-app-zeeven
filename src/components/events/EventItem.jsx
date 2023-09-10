import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { colors, getDisplayedDate } from '../../utils';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

function EventItem({ item, displayItem }) {
  const [loading, setLoading] = useState(false);
  const goto = (item) => {
    setLoading(!loading);
    displayItem(item);
  };
  return (
    <>
        <TouchableHighlight
          style={styles.item}
          underlayColor={'transparent'}
          onPress={() => goto(item)}
        >
          <View style={[styles.itemContainer]}>
            <>
              <View style={styles.descriptionContainer}>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="ios-people" size={24} color={colors.primary} />
                    <Text style={styles.infosName}>{item.guests.length}</Text>
                  </View>
                </View>
                {/*item?.messages[0].schedules && item?.messages[0].schedules.length ? (
                  <View style={styles.schedules}>
                    <FontAwesome5 name="calendar-alt" size={24} color={colors.warning} />

                    <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                      {item?.messages[0].schedules?.map((schedule, index) => (
                        <View
                          key={`schedule-${index}`}
                          style={{ flexDirection: 'column', paddingVertical: 2 }}
                        >
                          <Text style={{ fontWeight: 'normal' }}>
                            {getDisplayedDate(schedule.date)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                      ) : null*/}
              </View>
            </>
          </View>
        </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    backgroundColor: colors.primary,
  },
  iconLabel: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 35,
    paddingHorizontal: 0,
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
  infosName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  itemContainer: {
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: colors.warning,
    borderWidth: 1,
    borderColor: colors.warning,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  profileData: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  datesData: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  dateItem: {
    color: colors.darkgray,
    fontSize: 14,
    fontWeight: 'normal',
    textTransform: 'capitalize',
  },
  profile: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  profileInfos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'normal',
  },
  profileInfosText: {
    color: colors.darkgray,
    fontSize: 20,
    marginHorizontal: 10,
  },
  schedules: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
export default EventItem;
