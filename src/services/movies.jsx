import axios from "axios";

const baseURL = `https://yts.mx/api/v2/list_movies.json?limit=30`;
const baseURL_details = function (id) {
    return `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
};

// query: "limit=30&genre=fantasy&sort_by=year",

export const getNewUploads = async () => {
    try {
        const response = await axios.get(baseURL);
        const data = await response.data;
        return data.data.movies;
    } catch (err) {
        console.log("err: ", err);
    }
    
};

export const getMovieDetails = async (id) => {
    try {
        const url = baseURL_details(id);
        const response = await axios.get(url);
        const data = await response.data;
        return data.data.movie;
    } catch (err) {
        console.log("err: ", err);
    }
};
