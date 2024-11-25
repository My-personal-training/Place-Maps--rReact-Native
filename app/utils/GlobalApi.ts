import axios from "axios";
import { API_KEY, GOOGLE_NEAR_BY_PLACE_URL } from "@constants";

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.shortFormattedAddress",
      "places.location",
      "places.photos",
      "places.rating"
    ],
  },
};

export const nearByPlaceFetch = async (body: any) => {
  try {
    const { data } = await axios.post(
      GOOGLE_NEAR_BY_PLACE_URL,
      body,
      requestConfig
    );
    console.log("Near by place response", data);
    return data;
  } catch (error) {
    console.error("Error fetching near by place", error);
    return null;
  }
};
