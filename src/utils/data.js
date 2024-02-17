const INITIAL_STATE = {};
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SET_STEP_INDEX = "SET_STEP_INDEX";
const AUTHENTICATED_USER = "AUTHENTICATED_USER";
const UPDATE_USER_INFOS = "UPDATE_USER_INFOS";
const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";
const SET_EVENTS = "SET_EVENTS";
const SET_EVENT = "SET_EVENT";
const LABELS = {
  "event-guests": "Invités",
  "event-scan": "Scan",
  "event-report": "Statistiques",
  "add-user": "Inviter",
  AdsHome: "Accueil",
  AdList: "Parcourir",
  favorites: "Favoris",
  More: "Plus",
  NewAd: "Créer",
};
const ICONS = {
  "event-guests": "people-outline",
  "event-scan": "qr-code-scanner",
  "event-report": "description",
  "add-user": "supervised-user-circle",
  AdsHome: "home",
  AdList: "search",
  favorites: "heart",
  More: "grid-view",
  NewAd: "plus-circle",
};

const CIVILIIES = ["MR", "Mr", "MRS", "Mme", "MME", "Mlle", "MLLE", "MR_MRS"];

export {
  CIVILIIES,
  AUTHENTICATED_USER,
  ICONS,
  INITIAL_STATE,
  LABELS,
  SET_EVENT,
  SET_EVENTS,
  SET_STEP_INDEX,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_SEARCH_CRITERIA,
  UPDATE_USER_INFOS,
};
