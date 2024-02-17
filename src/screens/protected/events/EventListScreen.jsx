import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ApplicationContext } from "../../../context/ApplicationContextProvider";
import { SecurityContext } from "../../../context/SecurityContextProvider";

import SearchEmpty from "../../../components/search/SearchEmpty";
import EventItem from "../../../components/events/EventItem";
import { colors, globalStyles } from "../../../utils";
import Message from "../../../components/messages/Message";

function EventListScreen({ navigation }) {
  const url = `/backend/event`;
  const { state, updateEvents, updateEvent, signOut } =
    useContext(ApplicationContext);
  const { protectedAxios } = useContext(SecurityContext);
  let isActive = true;
  const { events } = state;
  const [isLoading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const logout = () => {
    signOut();
  };
  const onRefresh = async () => {
    search();
    setRefreshing(false);
  };

  const displayItem = async (event) => {
    try {
      const response = await protectedAxios.get(`${url}/${event.publicId}`);
      const { data } = response;
      updateEvent(data);
      setIsloading(false);
    } catch (e) {
      setIsloading(false);
    }
    navigation.navigate("event", { publicId: event.publicId });
  };

  const search = async () => {
    try {
      const response = await protectedAxios.get(url);
      const { data } = response;
      updateEvents(data);
      setIsloading(false);
    } catch (e) {
      setIsloading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isActive) {
        search();
      }
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <>
      {isLoading ? (
        <SafeAreaView
          style={[globalStyles.container, { backgroundColor: colors.blue }]}
        >
          <View style={[globalStyles.container, { justifyContent: "center" }]}>
            <Message firstText="Un instant nous recherchons vos évènements" />
          </View>
        </SafeAreaView>
      ) : (
        <Pressable
          style={[globalStyles.container, { backgroundColor: colors.blue }]}
        >
          <View style={[globalStyles.creationHeader, { marginTop: 20 }]}>
            <Text
              style={[
                globalStyles.creationTitle,
                { fontWeight: 900, fontSize: 60, paddingTop: 20 },
              ]}
            >
              ZEEVEN
            </Text>
            <Text style={[globalStyles.creationTitle, { fontSize: 20 }]}>
              vos évènements
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.searchResultsContainer}
            scrollEventThrottle={150}
            onEndReachedThreshold={2}
            data={events}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <EventItem item={item} displayItem={displayItem} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={<SearchEmpty />}
          />

          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.success : colors.blue,
                color: pressed ? colors.blue : colors.white,
              },
              styles.logout,
            ]}
          >
            <Text style={styles.logoutText}>Déconnexion</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchResultsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center",
  },
  logout: {
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.white,
  },
  logoutText: {
    fontWeight: "600",
    fontSize: 18,
    color: colors.white,
  },
});
export default EventListScreen;
