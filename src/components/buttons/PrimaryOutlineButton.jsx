import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {colors} from "../../utils";
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function PrimaryOutlineButton({children, ...props}) {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...props} activeOpacity={0.8}>
            <Text style={styles.buttonText}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        color: colors.white,
        borderWidth: 1,
        borderColor: Colors.blue,
        width: '100%',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText : {
        color: colors.blue,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});
