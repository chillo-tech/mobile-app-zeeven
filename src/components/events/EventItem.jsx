import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors, toTitleCase, truncateTitle} from '../../utils';
import {Ionicons} from '@expo/vector-icons';
import {ActivityIndicator} from "react-native-paper";

function EventItem({item, displayItem}) {
    const [loading, setLoading] = useState(false);
    const goto = async (item) => {
        setLoading(true);
        await displayItem(item);
        setLoading(false);
    };

    useEffect(() => {
        if (loading) {
            // If the data hasn't been loaded after 30sec
            setTimeout(() => {
                setLoading(false)
            }, 30 * 1000)
        }
    }, [loading])

    return (
        <>
            <TouchableHighlight
                style={styles.item}
                underlayColor={'transparent'}
                onPress={() => goto(item)}
            >
                <View style={[styles.itemContainer]}>
                    {
                        loading ? (
                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'center'}}>
                                <ActivityIndicator color={colors.primary}/>
                            </View>
                        ) : (
                            <>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.infos}>
                                        <View style={{flexDirection: 'row', width: '75%'}}>
                                            <Text
                                                style={styles.infosName}>{toTitleCase(truncateTitle(item.name))}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', width: '18%'}}>
                                            <Ionicons name="ios-people" size={24} color={colors.primary}/>
                                            <Text style={styles.infosName}>{item.guests.length}</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )
                    }
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
