import { SET_EVENT, UPDATE_USER_INFOS, SIGN_IN, UPDATE_SEARCH_CRITERIA, SET_EVENTS, INITIAL_STATE } from '../utils/data';

export const ApplicationReducer = (state, action) => {
  const { type, data } = action || {};
  switch (type) {
    case SET_EVENT:
      return {
        ...state,
        event: data,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: data,
      };
    case SIGN_IN:
      return {
        ...state,
        authenticatedUser: data,
      };

    case UPDATE_SEARCH_CRITERIA:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          ...data,
        },
      };
    case UPDATE_USER_INFOS:
      return {
        ...state,
      };
    default: 
     return INITIAL_STATE
  }
};
