import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {colors} from "../../utils";

export default function PrimaryButton({children, ...props}) {
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
        backgroundColor: colors.blue,
        width: '100%',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText : {
        color: colors.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});
