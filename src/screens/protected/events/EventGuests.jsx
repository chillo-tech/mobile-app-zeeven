import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, RefreshControl, View, StyleSheet, Text } from 'react-native';
import { colors, globalStyles } from '../../../utils';
import Message from '../../../components/messages/Message';
import SearchEmpty from '../../../components/search/SearchEmpty';
import GuestItem from '../../../components/guests/GuestItem';
import { SecurityContext } from '../../../context/SecurityContextProvider';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';


function EventGuests({ route, navigation }) {
  const url = `/backend/event`;
  const [refreshing, setRefreshing] = useState(false);
  const [percentage, setPercentage] = useState(45);
  const { protectedAxios } = useContext(SecurityContext);
  const { updateEvent, state: {event} } = useContext(ApplicationContext);

  const handleRefresh = async() => {
    setRefreshing(true);
    try {
      const response = await protectedAxios.get(`${url}/${event.publicId}`);
      const { data } = response;
      updateEvent(data);
      //console.log(data);
    } catch (e) {

      console.log(e);
    }
    navigation.navigate('event', { publicId: event.publicId });
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      {event ? (
        <>
          <View style={styles.statistics}>
            <View style={styles.statisticsItemContainer}>
              <Text style={styles.guests}>{`${event.guests.length} invités`}</Text>
            </View>
            <View style={styles.progressBarContainer}>
               <View style={[StyleSheet.absoluteFill, styles.progressBar, {width: `${percentage}%`}]} >
                 <Text>{`${percentage} %`}</Text>
                </View>
            </View>
          </View>
          <FlatList
            scrollEventThrottle={150}
            onEndReachedThreshold={2}
            style={{backgroundColor: colors.white}}
            data={event.guests}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => <GuestItem index={index} item={item} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            ListEmptyComponent={<SearchEmpty />}
          />
        </>
      ) : (
        <SafeAreaView
          style={[globalStyles.container, { flex: 1, backgroundColor: colors.lightgray }]}
        >
          <View style={[globalStyles.container, { justifyContent: 'center' }]}>
            <Message firstText="Un instant nous recherchons votre évènement" />
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.error,
  },
  guests: {
    fontSize: 26,
    color: colors.blue,
    fontWeight: 'bold'
  },
  progressBarContainer: {
    height: 20,
    flexDirection: "row",
    width: '100%',
    backgroundColor: colors.lightgray,
    borderRadius: 5,
    overflow: 'hidden'
  },
  progressBar: {
    backgroundColor: colors.lightGreen,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statistics: {
    paddingVertical: 25,
    paddingHorizontal: 10
  },
  statisticsItemContainer: {
  }
})
export default EventGuests;
