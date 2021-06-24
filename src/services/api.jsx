import axios from "axios";

export const fetchingData = async (baseURL, query = "") => {
    const response = await axios.get(`${baseURL}?${query}`);
    const movies = await response.data;
    return movies.data;
};
