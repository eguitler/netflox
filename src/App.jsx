import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import GlobalStyles from "styles/global";

import Home from "pages/Home";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import RecoverPassword from "pages/RecoverPassword/RecoverPassword";
import Header from "layout/Header/Header";
import Search from "pages/Search/Search";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

import { getNewUploads } from "services/movies";
import { connect, useDispatch } from "react-redux";
import { initMovies } from "store";

export const App = ({ user, userLogged }) => {
    // replace this by custom hook
    const dispatch = useDispatch();
    useEffect(() => {
        getNewUploads().then((movies) => {
            dispatch(initMovies(movies));
        });
    }, [dispatch]);
    return (
        <Router>
            <GlobalStyles />
            {userLogged ? <Header /> : null}
            <Switch>
                <ProtectedRoute
                    path="/search"
                    component={Search}
                    authorized={userLogged}
                />
                <Route exact path="/login">
                    {userLogged ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route exact path="/register">
                    {userLogged ? <Redirect to="/" /> : <Register />}
                </Route>
                <Route exact path="/recover">
                    {userLogged ? <Redirect to="/" /> : <RecoverPassword />}
                </Route>
                <ProtectedRoute
                    path="/"
                    component={Home}
                    authorized={userLogged}
                />
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    userLogged: state.user.userLogged,
});

export default connect(mapStateToProps, {})(App);
