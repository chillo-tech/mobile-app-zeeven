import React, { useMemo, createContext, useReducer } from "react";
import { ApplicationReducer } from "./ApplicationReducer";
import {
  SET_EVENT,
  SET_EVENTS,
  UPDATE_SEARCH_CRITERIA,
  AUTHENTICATED_USER,
  INITIAL_STATE,
  SET_STEP_INDEX,
  SIGN_IN,
  SIGN_OUT,
} from "../utils/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ApplicationContext = createContext(null);

function ApplicationContextProvider({ children }) {
  const [state, dispatch] = useReducer(ApplicationReducer, INITIAL_STATE);
  const authContext = useMemo(
    () => ({
      signIn: async (infos) => {
        dispatch({ type: SIGN_IN, data: infos });
        await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify(infos));
      },

      updateEvents: async (events) => {
        await AsyncStorage.setItem("events", JSON.stringify(events));
        dispatch({ type: SET_EVENTS, data: events });
      },
      updateEvent: async (event) => {
        await AsyncStorage.setItem(
          `event-${event.publicId}`,
          JSON.stringify(event)
        );
        dispatch({ type: SET_EVENT, data: event });
      },
      updateSearchCriteria: (data) => {
        dispatch({ type: UPDATE_SEARCH_CRITERIA, data });
      },
      signOut: async () => {
        await AsyncStorage.removeItem(AUTHENTICATED_USER);
        dispatch({ type: SIGN_OUT });
      },
      goToStep: (stepIndex) =>
        dispatch({ type: SET_STEP_INDEX, data: stepIndex }),
    }),
    [state]
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let authenticatedUser = await AsyncStorage.getItem(AUTHENTICATED_USER);
      authenticatedUser = JSON.parse(authenticatedUser);
      if (authenticatedUser && authenticatedUser["accessToken"]) {
        dispatch({ type: SIGN_IN, data: authenticatedUser });
      } else {
        await AsyncStorage.removeItem(AUTHENTICATED_USER);
        dispatch({ type: SIGN_OUT });
      }
    };

    bootstrapAsync();
  }, []);
  return (
    <ApplicationContext.Provider value={{ state, ...authContext }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationContextProvider;
