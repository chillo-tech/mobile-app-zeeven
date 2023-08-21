import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { colors, globalStyles } from '../../../utils';
import Message from '../../../components/messages/Message';

function EventScan() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading ? (
        <SafeAreaView style={[globalStyles.container, { flex: 1, backgroundColor: colors.lightgray }]}>
          <View style={[globalStyles.container, { justifyContent: 'center' }]}>
            <Message firstText="Un instant nous recherchons votre évènement" />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[globalStyles.container, { backgroundColor: colors.blue }]}
        ></SafeAreaView>
      )}
    </>
  );
}

export default EventScan;
