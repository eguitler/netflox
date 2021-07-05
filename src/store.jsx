import { createStore, combineReducers } from "redux";

const initialState = {
    all: [],
    premiere: { title: "New Uploads", loaded: false, movies: [] },
    watchLater: { title: "Watch Later", loaded: false, movies: [] },
};

// move to moviesActions.jsx
export const MOVIES_INIT = "@movies/init";
export const ADD_TO_WATCH_LATER = "@movies/add_to_watch_later";
export const REMOVE_FROM_WATCH_LATER = "@movies/remove_from_watch_later";

// move this to moviesReducer.jsx
const moviesReducer = (state = initialState, action) => {
    if (action.type === MOVIES_INIT) {
        return {
            ...state,
            premiere: { ...state.premiere, loaded: true, movies: action.payload },
        };
    }
    if (action.type === ADD_TO_WATCH_LATER) {
        return {
            ...state,
            watchLater: {
                ...state.watchLater,
                movies: [...state.watchLater.movies, action.payload],
            },
        };
    }
    if (action.type === REMOVE_FROM_WATCH_LATER) {
        return {
            ...state,
            watchLater: {
                ...state.watchLater,
                movies: state.watchLater.movies.filter(
                    (movie) => movie.id !== action.payload
                ),
            },
        };
    }
    return state;
};

export const initMovies = (movies) => {
    return {
        type: MOVIES_INIT,
        payload: movies,
    };
};

export const addToWatchLater = (movie) => {
    return {
        type: ADD_TO_WATCH_LATER,
        payload: movie,
    };
};
export const removeFromWatchLater = (id) => {
    return {
        type: REMOVE_FROM_WATCH_LATER,
        payload: id,
    };
};

const reducer = combineReducers({
    movies: moviesReducer,
});

export default createStore(reducer);
