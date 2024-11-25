// Base url keys
export const REPLACE_URL_NAME_KEY = "replace_name:";
export const REPLACE_URL_PARAMETERS_KEY = "replace_parameters:";

export const API_KEY = "AIzaSyDn81tRf2NJytu4quy3cA_aSJkkixKqzDw";
export const GOOGLE_NEAR_BY_PLACE_URL =
  "https://places.googleapis.com/v1/places:searchNearby";
export const GOOGLE_PHOTO_URL = `https://places.googleapis.com/v1/${REPLACE_URL_NAME_KEY}/media?key=${API_KEY}&${REPLACE_URL_PARAMETERS_KEY}`;
