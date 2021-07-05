import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import GlobalStyles from "styles/global";

import Home from "pages/Home";
import Login from "pages/Login/Login";
import Search from "pages/Search/Search";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import Header from "layout/Header/Header";

import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { initMovies } from "store";
import { getNewUploads } from "services/movies";

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    const [user, setUser] = useState(true);
    const dispatch = useDispatch();

    // replace this by custom hook
    useEffect(() => {
        getNewUploads().then((movies) => {
            dispatch(initMovies(movies));
        });
    }, [dispatch]);
    return (
        <Router>
            <GlobalStyles />
            {user ? <Header /> : null}
            <Switch>
                <ProtectedRoute
                    path="/search"
                    component={Search}
                    authorized={user}
                />
                <Route exact path="/login">
                    {user ? <Redirect to="/" /> : Login()}
                </Route>
                <ProtectedRoute path="/" component={Home} authorized={user} />
            </Switch>
        </Router>
    );
};

export default AppWrapper;
