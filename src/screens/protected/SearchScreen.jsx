import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {SecurityContext} from '../../context/SecurityContextProvider';
import {BACKEND_URL} from '../../utils/endpoints-list';

import SearchEmpty from '../../components/search/SearchEmpty';
import EventItem from '../../components/events/EventItem';
import {globalStyles} from '../../utils';
import Message from '../../components/messages/Message';

function SearchScreen({route, navigation}) {
    const url = `${BACKEND_URL}/backend/event`;
    const {
        state,
        signOut,
        updateAds,
        updateSelectedItemId,
        updateSearchCriteria
    } = useContext(ApplicationContext);
    const {protectedAxios} = useContext(SecurityContext);
    let isActive = true;
    const {authenticatedUser, ads} = state;
    const [isLoading, setIsloading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        updateSearchCriteria({page: 0, pushResults: false});
        setRefreshing(true);
    };

    const displayAd = (id) => {
        updateSelectedItemId(id);
        navigation.push("ad-detail", {selectedId: id});
    }

    const search = async () => {
        const {authenticatedUser} = state;
        const authenticatedUserCoordinates = authenticatedUser?.location?.coordinates;
        const queryCoordinates = coordinates.length ? coordinates : authenticatedUserCoordinates;
        try {
            const {data: searchResult = []} = await protectedAxios.post(
                url,
                {
                    coordinates: queryCoordinates,
                    query,
                    proximity: `${authenticatedUserCoordinates[0]},${authenticatedUserCoordinates[1]}`
                }
            );
            if (pushResults) {
                updateAds([...ads, ...searchResult]);
            } else {
                updateAds(searchResult);
            }
            setIsloading(false);
            setRefreshing(false);
        } catch (e) {
            setIsloading(false);
        }
    };

    const fetchMore = () => {
        updateSearchCriteria({pushResults: true, page: (page + 1)});
    };

    return (
        <View style={{flex: 1}}>
            {isLoading ?
                (
                    <View style={[globalStyles.container, {justifyContent: 'center'}]}>
                        <Message firstText="Un instant nous recherchons des annonces"/>
                    </View>
                )
                : (
                    <View style={{flex: 1}}>
                        <SafeAreaView style={[globalStyles.container]}>
                            <FlatList
                                contentContainerStyle={styles.searchResultsContainer}
                                scrollEventThrottle={150}
                                onEndReachedThreshold={2}
                                onEndReached={fetchMore}
                                data={ads}
                                keyExtractor={(item, index) => `${item.id}-${index}`}
                                renderItem={({item}) => (
                                    <EventItem ad={item} displayAd={displayAd}/>
                                )}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                ListEmptyComponent={<SearchEmpty/>}
                            />
                        </SafeAreaView>
                    </View>
                )}
        </View>);
}

const styles = StyleSheet.create({
    searchResultsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});
export default SearchScreen;
