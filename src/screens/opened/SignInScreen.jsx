import React, { useState, useContext } from 'react';
import { Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground } from 'react-native';
import { colors, globalStyles, isValidEmail } from '../../utils';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Message from '../../components/messages/Message';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { SecurityContext } from '../../context/SecurityContextProvider';

function SignInScreen({ navigation }) {
  const image = require('../../../assets/images/scan-qr-code.jpg');
  //const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

  const message = 'Un instant nous vérifions votre compte.';
  const [isActivating, setIsActivating] = useState(false);
  const { signIn } = useContext(ApplicationContext);
  const { publicAxios } = useContext(SecurityContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = async (profile) => {
    setIsActivating(true);
    try {
      const {
        data: { token },
      } = await publicAxios.post('backend/signin', profile);
      signIn({ ...profile, accessToken: token });
      setIsActivating(false);
    } catch (error) {
      let message = error?.response?.data?.message;
      if (error?.response?.status === 401) {
        message = 'Identifiant ou mot de passe invalide';
      }
      Alert.alert('Une erreur est survenue', message, [{ text: 'OK' }]);
      setIsActivating(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      title: '',
      headerBackTitleVisible: false,
      headerTransparent: true,
      headerShadowVisible: false,
    });
  }, [navigation]);
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={[globalStyles.container, { backgroundColor: colors.blue }]}>
        <View style={globalStyles.creationHeader}>
          <Text
            style={[globalStyles.creationTitle, { fontWeight: 900, fontSize: 60, paddingTop: 20 }]}
          >
            ZEEVEN
          </Text>
          <Text style={[globalStyles.creationTitle, { fontSize: 20 }]}>
            Accès facile à vos évènements
          </Text>
        </View>
        <View style={styles.formContainer}>
          {isActivating ? (
            <Message firstText={message} />
          ) : (
            <>
              <View
                style={[
                  globalStyles.creationBodyFieldGroup,
                  errors?.email ? globalStyles.inputGroupError : globalStyles.inputGroupDefault,
                ]}
              >
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => isValidEmail(value),
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
                      placeholder="Adresse email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="username"
                />
              </View>
              {errors.username && <Text style={globalStyles.error}>L'email est invalide</Text>}

              <View
                style={[
                  globalStyles.creationBodyFieldGroup,
                  errors?.password ? globalStyles.inputGroupError : globalStyles.inputGroupDefault,
                ]}
              >
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
                      placeholder="Mot de passe"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={true}
                    />
                  )}
                  name="password"
                />
              </View>
              {errors?.password && (
                <Text style={globalStyles.error}>Le mot de passe est invalide</Text>
              )}
              <TouchableOpacity
                style={[styles.button]}
                onPress={handleSubmit(onSubmit)}
                activeOpacity={1}
              >
                <Text style={[styles.buttonLabel]}>Je me connecte</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  accountButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 5,
  },
  accountText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.darkgray,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
  buttonLabel: {
    color: colors.white,
    textAlign: 'center',
    padding: 10,
    fontSize: 22,
  },
  formContainer: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    marginBottom: 32,
  },

  image: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%'
  },
  absoluteImage : {
    position: "absolute",
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 0
  }
});
export default SignInScreen;
