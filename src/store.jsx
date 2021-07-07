import { createStore, combineReducers, applyMiddleware } from "redux";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'


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


/* USER REDUCER */

const userInitialState = {
    user: null,
}

export const USER_LOGIN = "user@login"
export const USER_LOGOUT = "user@logout"

const userReducer = (state = userInitialState, action) => {
    if (action.type === USER_LOGIN) {
        return {
            user: action.payload,
        };
    }
    if (action.type === USER_LOGOUT) {
        return {
            user: null,
        };
    }
    return state;
};

export const userLogin = (user) => {
    return {
        type: USER_LOGIN,
        payload: user,
    };
};
export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};


/* COMBINATION */

const reducers = combineReducers({
    movies: moviesReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
    //whitelist: ['something']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persistedReducer,
    applyMiddleware()
)

const persistor = persistStore(store)
export {store, persistor}