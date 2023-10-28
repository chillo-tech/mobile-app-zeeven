import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable, Alert} from 'react-native';
import {colors, getFormattedTime} from '../../utils';
import {SimpleLineIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {ActivityIndicator} from "react-native-paper";

function GuestItem(props) {
    const {item, index, scans, invalidateScan, manualScan} = props;
    const {item: {publicId: guestId}} = props;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            // If the data hasn't been loaded after 30sec
            setTimeout(() => {
                setLoading(false)
            }, 30 * 1000)
        }
    }, [loading])

    const getScannedTime = () => {
        const itemInScans = scans.filter((entry) => {
            const {guestPublicId, eventPublicId} = entry;
            const {publicId} = item;
            return guestPublicId === publicId;
        }) || [];
        if (itemInScans.length) {
            const {date} = itemInScans[0];
            return getFormattedTime(new Date(date));
        }
        return "";
    }

    const setLoadingState = (func) => {
        setLoading(true)
        return func
    }

    const validate = () => {
        // Confirm the manual scan before
        Alert.alert('Confirmation', 'Voulez-vous confirmer l\'arriver de l\'invité ?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: () => {
                    setLoadingState(manualScan)(guestId)
                    setLoading(false)
                }
            },
        ]);

    }

    return (
        <View>
            <View style={[styles.wrapper, index % 2 === 1 ? {backgroundColor: '#f0f0f5'} : '']}>
                <Pressable onPress={validate}>
                    {
                        loading ? (
                                <ActivityIndicator size={'small'} color={colors.primary}/>
                            )
                            : (
                                <>
                                    <View style={[styles.titleWrapper, styles.box]}>
                                        {(item.civility === 'Mme' || item.civility === 'Mlle' || item.civility === 'MLLE') && (
                                            <SimpleLineIcons style={styles.icon} name="user-female" size={24}
                                                             color="black"/>
                                        )}
                                        {(item.civility === 'MR' || item.civility === 'Mr') && (
                                            <SimpleLineIcons style={styles.icon} name="user" size={24} color="black"/>
                                        )}
                                        {item.civility === 'MR_MRS' && (
                                            <Feather style={styles.icon} name="users" size={24} color="black"/>
                                        )}
                                        <Text style={[styles.title, {maxWidth: getScannedTime().length ? 220 : '100%'}]}>
                                            {item.firstName} {item.lastName}
                                        </Text>
                                    </View>
                                    {item?.partner ? (
                                        <Text style={[styles?.title]}>
                                            {item?.partner}
                                        </Text>
                                    ) : null}
                                </>
                            )
                    }
                </Pressable>
                {
                    getScannedTime().length
                        ? (
                            <Pressable
                                onPress={() => invalidateScan(item?.publicId)}
                                style={{
                                    width: '25%',
                                    height: '100%',
                                    paddingVertical: 15,
                                    marginHorizontal: 5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                <Text style={{
                                    color: colors.success,
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }}>{getScannedTime()}</Text>
                                <Entypo style={{marginLeft: 4}} name="circle-with-cross" size={24}
                                        color={colors.error}/>
                            </Pressable>
                        )
                        : null
                }
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
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
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    box: {
        paddingVertical: 15,
    }
});
export default GuestItem;
