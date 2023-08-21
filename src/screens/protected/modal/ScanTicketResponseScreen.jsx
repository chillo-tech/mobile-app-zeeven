import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, StatusBar} from "react-native";
import {colors} from "../../../utils";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import {CommonActions} from "@react-navigation/native";

const dataPattern = /^([0-9]+)\|([0-9]+)\|([0-9]+)$/

const Divider = () => (<View style={styles.divider} />)

export default function ScanTicketResponseScreen({route: {params}, navigation}) {

    const {type, data} = params
    const [isValid, setIsValid] = React.useState(dataPattern.test(data))

    const [ticketInformations, setTicketInformations] = React.useState({
        ticketNumber: '',
        event: '',
        invitation: '',
        guest: ''
    })

    console.log(JSON.stringify(params), dataPattern.test(data))

    const goTo = (routeName) => {
        return () => {
            navigation.dispatch(
                CommonActions.navigate({
                    name: routeName,
                    params: {
                        launchScan: true
                    },
                    merge: true,
                })
            )
        }
    }

    React.useEffect(() => {
        setIsValid(dataPattern.test(data))
    }, [])

    React.useEffect( () => {
        if (isValid) {
            const arr = data.split('|')

            setTicketInformations( prevState => ({
                ticketNumber: arr[2],
                event : arr[0],
                invitation : arr[1],
                guest : arr[2],
            }))
        }
    }, [data, isValid] )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} />
            <View style={[
                styles.container,
                isValid ? styles.validTicketContainer : styles.invalidTicketContainer
            ]}>
                <View style={styles.cardContainer}>
                    <Text style={[styles.title, isValid ? styles.validTitle : styles.invalidTitle]}>
                        {isValid ? 'VALID' : 'INVALID'}</Text>
                    <Divider />
                    <View style={styles.cardContent}>
                        {
                            isValid ? (
                                <>
                                    <Text style={styles.textTitleContent}>
                                        Informations ticket</Text>

                                    <Text style={styles.textContent}>
                                        Numéro Ticket : <Text style={{fontWeight: 'bold'}}>{ticketInformations.ticketNumber}</Text>
                                    </Text>
                                    <Text style={styles.textContent}>
                                        Évenement : <Text style={{fontWeight: 'bold'}}>{ticketInformations.event}</Text>
                                    </Text>
                                    <Text style={styles.textContent}>
                                        Invitation : <Text style={{fontWeight: 'bold'}}>{ticketInformations.invitation}</Text>
                                    </Text>
                                    <Text style={styles.textContent}>
                                        Invité : <Text style={{fontWeight: 'bold'}}>{ticketInformations.guest}</Text>
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.textContent}>
                                        Numéro Ticket invalid : <Text style={{fontWeight: 'bold'}}>{ticketInformations.ticketNumber}</Text>
                                    </Text>
                                    <Text style={styles.textContent}>
                                        Soit le QR Code du ticket n'appartient pas à un évènement Zeeven,{'\n'}
                                        soit l'évènement a déjà expiré.
                                    </Text>
                                </>
                            )
                        }
                    </View>
                    <View style={styles.cardBottom}>
                        <PrimaryButton onPress={goTo('scan-ticket')}>Scanner à nouveau</PrimaryButton>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    validTicketContainer : {
        backgroundColor: colors.success,
    },
    invalidTicketContainer : {
        backgroundColor: colors.error
    },
    cardContainer: {
        backgroundColor: colors.white,
        height: 450,
        width: 300,
        borderRadius: 5,
        elevation: 5
    },
    cardContent : {
        padding: 15,
        gap: 10,
    },
    cardBottom : {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
        paddingHorizontal: 15,
    },
    divider: {
        height: 2,
        width: '100%',
        borderBottomWidth: 2,
        borderStyle: 'dotted',
        borderBottomColor: colors.darkgray
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        paddingVertical: 25
    },
    textContent : {
        fontSize: 16
    },
    textTitleContent : {
        width: '100%',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    validTitle : {
        color: colors.success,
    },
    invalidTitle: {
        color: colors.error
    }
})
