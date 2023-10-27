import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, globalStyles } from '../../utils';

function BaseScreen({ isSafe = false, ...props }) {
  return (
    <>
      {isSafe ? (
        <>
          <StatusBar translucent backgroundColor="transparent" />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={globalStyles.container}
          >
            <SafeAreaView
              style={[
                styles.wrapScreen,
                {
                  backgroundColor: props?.backgroundColor
                    ? props?.backgroundColor
                    : styles.scrollScreen.backgroundColor,
                },
              ]}
            >
              {props.children}
            </SafeAreaView>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <StatusBar barStyle="dark-content" backgroundColor={colors.blue} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={globalStyles.container}
          >
            <SafeAreaView
              style={[
                styles.wrapScreen,
                {
                  backgroundColor: props?.backgroundColor
                    ? props?.backgroundColor
                    : styles.scrollScreen.backgroundColor,
                },
              ]}
            >
              {props.children}
            </SafeAreaView>
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapScreen: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  scrollScreen: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  contentScroll: {
    paddingBottom: 50,
  },
  viewScreen: {
    flex: 1,
    backgroundColor: colors.blue,
  },
});

export default React.memo(BaseScreen);
