import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, RefreshControl, View, StyleSheet, Text } from 'react-native';
import { colors, globalStyles } from '../../../utils';
import Message from '../../../components/messages/Message';
import SearchEmpty from '../../../components/search/SearchEmpty';
import GuestItem from '../../../components/guests/GuestItem';
import { SecurityContext } from '../../../context/SecurityContextProvider';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';
import * as Progress from 'react-native-progress';


function EventGuests({ route, navigation }) {
  const url = `/backend/event`;
  const [refreshing, setRefreshing] = useState(false);
  const { protectedAxios } = useContext(SecurityContext);
  const { updateEvent, state: {event} } = useContext(ApplicationContext);
  const {scans = [], guests = []} = event;
  const handleRefresh = async() => {
    setRefreshing(true);
    try {
      const response = await protectedAxios.get(`${url}/${event.publicId}`);
      const { data } = response;
      updateEvent(data);
    } catch (e) {
			const localEvent = await AsyncStorage.getItem(`event-${event.publicId}`);
      updateEvent(localEvent);
      console.log(e);
    }
    navigation.navigate('event', { publicId: event.publicId });
    setRefreshing(false);
  };

  const invalidateScan = async (guestId) => {
    try {
      await protectedAxios.delete(`${url}/${event.publicId}/scan/${guestId}`);
      handleRefresh();
    } catch (e) {
			const localEvent = await AsyncStorage.getItem(`event-${event.publicId}`);
      updateEvent(localEvent);
      console.log(e);
    }
    
  }
  return (
    <SafeAreaView>
      {event ? (
        <>
          <View style={styles.statistics}>
            <View style={styles.statisticsItemContainer}>
              <Text style={styles.guests}>{`${event.guests.length} invités`}</Text>
            </View>
            <Progress.Bar 
              height={18} 
              unfilledColor={colors.lightgray} 
              color={colors.lightGreen} 
              progress={(Math.round((scans.length / guests.length) * 100) / 100).toFixed(2) * 2} 
              width={null} 
            />
          </View>
          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            scrollEventThrottle={30}
            onEndReachedThreshold={30}
            style={{flex: 0, backgroundColor: colors.white, paddingBottom: 60}}
            initialNumToRender={event.guests.length+ 30}
            data={event.guests}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => <GuestItem index={index} item={item} scans={scans} invalidateScan={invalidateScan}/>}
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
