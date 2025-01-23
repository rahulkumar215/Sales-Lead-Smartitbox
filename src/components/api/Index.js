import axios from "axios";
const API_KEY = "U0wwNTNhN0VFWEgxcmxjVlJFc1hYMnREMG5vZmFueU9sWUNHTHlHeA==";

export const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          accept: "application/json",
          "X-CSCAPI-KEY": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const fetchStates = async (countryCode) => {
  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      {
        headers: {
          accept: "application/json",
          "X-CSCAPI-KEY": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
  }
};

export const fetchCities = async (stateCode) => {
  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
      {
        headers: {
          accept: "application/json",
          "X-CSCAPI-KEY": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};
