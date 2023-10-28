import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils';
import {ActivityIndicator} from "react-native-paper";

function LoadingScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Veuillez patienter un instant...</Text>
            </View>
            <View style={styles.indicatorContainer}>
                <ActivityIndicator color={colors.white}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.blue
    },
    titleContainer: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 30,
        alignItems: 'center'
    },
    title: {
        width: '100%',
        textAlign: 'center',
        color: colors.white,
        fontSize: 38
    },
    indicatorContainer: {
        width: '100%',
        marginBottom: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export default LoadingScreen;
