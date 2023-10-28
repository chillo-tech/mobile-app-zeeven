import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, RefreshControl, View, StyleSheet, Text, TextInput } from 'react-native';
import { colors, globalStyles, slugify } from '../../../utils';
import Message from '../../../components/messages/Message';
import SearchEmpty from '../../../components/search/SearchEmpty';
import GuestItem from '../../../components/guests/GuestItem';
import { SecurityContext } from '../../../context/SecurityContextProvider';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';
import * as Progress from 'react-native-progress';


function EventGuests({ route, navigation }) {
  const url = `/backend/event`;
  const [keyword, setKeyword] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { protectedAxios } = useContext(SecurityContext);
  const { updateEvent, state: {event} } = useContext(ApplicationContext);
  const {scans = [], guests = []} = event;

  const guestsFiltered = guests.filter(oneGuest => {
    result  = oneGuest.lastName.toLowerCase().includes(keyword.toLowerCase()) ||  oneGuest.firstName.toLowerCase().includes(keyword.toLowerCase())
    return result;
  });
  const guestsSorted = guestsFiltered.sort((a, b) => {
    const aSlug = slugify(`${a.lastName.toLowerCase()}${a.firstName.toLowerCase()}`);
    const bSlug = slugify(`${b.lastName.toLowerCase()}${b.firstName.toLowerCase()}`);
    return aSlug.localeCompare(bSlug);
  });


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
  
  const manualScan = (idOfGuest) => {
   const {invitation: { publicId: invitationPublicId }} = event;
    const data = `${event.publicId}|${invitationPublicId}|${idOfGuest}`;
    navigation.navigate({
      name: 'scan-ticket-response',
      params: {data}
    })
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
          <TextInput
            value={keyword}
            onChangeText={setKeyword}         
            placeholder='Rechercher'             
            style={[
              globalStyles.fieldFont, 
              globalStyles.creationBodyField, 
              {
                borderColor: colors.blue,
                borderWidth: 1,
                borderRadius: 6,
                backgroundColor: colors.white, 
                marginHorizontal: 10, marginBottom: 3
              },
              
            ]}

        />
          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            scrollEventThrottle={30}
            onEndReachedThreshold={30}
            style={{flex: 0, backgroundColor: colors.white, paddingBottom: 60}}
            initialNumToRender={event.guests.length+ 30}
            data={guestsSorted}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => <GuestItem manualScan={manualScan} index={index} item={item} scans={scans} invalidateScan={invalidateScan}/>}
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
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  statisticsItemContainer: {
  }
})
export default EventGuests;
