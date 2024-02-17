import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  globalStyles,
  isValidEmail,
  COUNTRIES_CODES,
  CIVILIIES,
} from "../../utils";
import { StyleSheet } from "react-native";
import { ApplicationContext } from "../../context/ApplicationContextProvider";
import { SecurityContext } from "../../context/SecurityContextProvider";
import Message from "../../components/messages/Message";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const maxWidth = Dimensions.get("window").width;
const maxHeight = Dimensions.get("screen").height;

const AddUserScreen = () => {
  const {
    updateEvent,
    state: { event },
  } = useContext(ApplicationContext);
  const { scans = [], guests = [] } = event;
  const message = "Un instant nous ajoutons votre invite.";
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(ApplicationContext);
  const { protectedAxios } = useContext(SecurityContext);
  const [isSendButtonsVisible, setIsSendButtonsVisible] = useState(false);
  const [invitationsSentState, setInvitationsSentState] = useState({
    whatsapp: false,
    mail: false,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneIndex: "",
      phone: "",
      civility: "",
      partner: "",
    },
  });
  const onSubmit = async (guest) => {
    setIsLoading(true);
    try {
      let { data } = await protectedAxios.post(
        `/backend/event/${event.publicId}/guest`,
        guest
      );

      await protectedAxios.post(
        `/backend/event/${event.publicId}/invitations`,
        [data.id]
      );
      setIsLoading(false);
    } catch (error) {
      let message = error?.response?.data?.message;
      if (error?.response?.status === 401) {
        message = "Identifiant ou mot de passe invalide";
      }
      Alert.alert("Une erreur est survenue", message, [{ text: "OK" }]);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Text
        style={[
          globalStyles.creationTitle,
          {
            fontSize: 24,
            paddingTop: 12,
            paddingBottom: 12,
            textAlign: "center",
            color: colors.primary,
            fontWeight: "600",
          },
        ]}
      >
        Ajoutez un invité
      </Text>
      <ScrollView style={styles.formContainer}>
        {isLoading ? (
          <Message firstText={message} />
        ) : (
          <>
            {/* firstName */}
            <View
              style={[
                globalStyles.creationBodyFieldGroup,
                errors?.firstName
                  ? globalStyles.inputGroupError
                  : globalStyles.inputGroupDefault,
              ]}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      globalStyles.fieldFont,
                      globalStyles.creationBodyField,
                    ]}
                    placeholder="Nom"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="firstName"
              />
            </View>
            {errors.firstName && (
              <Text style={globalStyles.error}>Le nom est requis</Text>
            )}

            {/* lastName */}
            <View
              style={[
                globalStyles.creationBodyFieldGroup,
                errors?.lastName
                  ? globalStyles.inputGroupError
                  : globalStyles.inputGroupDefault,
              ]}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      globalStyles.fieldFont,
                      globalStyles.creationBodyField,
                    ]}
                    placeholder="Prénom"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="lastName"
              />
            </View>
            {errors.lastName && (
              <Text style={globalStyles.error}>Le prénom est requis</Text>
            )}

            {/* email */}
            <View
              style={[
                globalStyles.creationBodyFieldGroup,
                errors?.email
                  ? globalStyles.inputGroupError
                  : globalStyles.inputGroupDefault,
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
                    style={[
                      globalStyles.fieldFont,
                      globalStyles.creationBodyField,
                    ]}
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
            </View>
            {errors.email && (
              <Text style={globalStyles.error}>
                Une Adresse email valide est requise
              </Text>
            )}

            {/* partner */}
            <View
              style={[
                globalStyles.creationBodyFieldGroup,
                errors?.partner
                  ? globalStyles.inputGroupError
                  : globalStyles.inputGroupDefault,
              ]}
            >
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      globalStyles.fieldFont,
                      globalStyles.creationBodyField,
                    ]}
                    placeholder="partenaire"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="partner"
              />
            </View>

            {/* phone index */}
            <View
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <Controller
                name="phoneIndex"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <SelectDropdown
                      defaultButtonText="Pays"
                      buttonStyle={{
                        marginBottom: 12,
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        width: maxWidth - 30,
                        borderColor: "#b8b9ba",
                        borderRadius: 5,
                      }}
                      buttonTextStyle={{
                        textAlign: "left",
                      }}
                      data={COUNTRIES_CODES}
                      onSelect={(selectedItem, index) => {
                        onChange(selectedItem.dial_code);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return `${selectedItem.name} (${selectedItem.dial_code})`;
                      }}
                      rowTextForSelection={(item, index) => {
                        if (item.dial_code)
                          return `${item.name} (${item.dial_code})`;
                        else return item.name;
                      }}
                    />
                  );
                }}
              />
              {errors.phoneIndex && (
                <Text style={globalStyles.error}>
                  Veuillez entrer l'index telephonique
                </Text>
              )}
            </View>

            {/* phone */}
            <View
              style={[
                globalStyles.creationBodyFieldGroup,
                errors?.phone
                  ? globalStyles.inputGroupError
                  : globalStyles.inputGroupDefault,
              ]}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="phone-pad"
                    style={[
                      globalStyles.fieldFont,
                      globalStyles.creationBodyField,
                    ]}
                    placeholder="Telephone"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
              />
            </View>
            {errors.phone && (
              <Text style={globalStyles.error}>
                Veuillez entrer le numero de telephone
              </Text>
            )}

            {/* civility */}
            <View
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <Controller
                name="civility"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <SelectDropdown
                      defaultButtonText="Civilité"
                      buttonStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        width: maxWidth - 30,
                        borderColor: "#b8b9ba",
                        borderRadius: 5,
                      }}
                      buttonTextStyle={{
                        textAlign: "left",
                      }}
                      data={CIVILIIES}
                      onSelect={(selectedItem, index) => {
                        onChange(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  );
                }}
              />
              {errors.civility && (
                <Text style={globalStyles.error}>
                  Veuillez entrer une civilite
                </Text>
              )}
            </View>
            <View>
              {isSendButtonsVisible ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.iconButton(
                      invitationsSentState.whatsapp
                        ? colors.lightGreen
                        : colors.lightgray
                    )}
                    onPress={() => {
                      setInvitationsSentState((prev) => ({
                        ...prev,
                        whatsapp: !prev.whatsapp,
                      }));
                    }}
                    activeOpacity={1}
                  >
                    <FontAwesome name="whatsapp" size={50} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton(
                      invitationsSentState.whatsapp
                        ? colors.blue
                        : colors.lightgray
                    )}
                    onPress={handleMailInvitation}
                    activeOpacity={1}
                  >
                    <Entypo name="email" size={50} color="gray" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.button(2)}
                  onPress={() => {
                    setIsSendButtonsVisible(true);
                  }}
                  activeOpacity={1}
                >
                  <Text style={[styles.buttonLabel]}>Envoyer l'invitation</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.button(20)}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={1}
            >
              <Text style={[styles.buttonLabel]}>Soumettre</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddUserScreen;
const styles = StyleSheet.create({
  account: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  accountButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "normal",
    marginLeft: 5,
  },
  accountText: {
    fontSize: 16,
    fontWeight: "normal",
    color: colors.darkgray,
  },
  button: (mb) => ({
    backgroundColor: colors.blue,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: mb,
  }),
  buttonLabel: {
    color: colors.white,
    textAlign: "center",
    padding: 10,
    fontSize: 22,
  },
  formContainer: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    height: maxHeight - 210,
  },

  image: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  absoluteImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  iconButton: (color) => ({
    borderRadius: 100,
    backgroundColor: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    margin: 14,
  }),
});
