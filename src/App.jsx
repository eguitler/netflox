import React from "react";
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

import { connect } from "react-redux";

import { USER_LOGIN } from "store";
import Cookies from "universal-cookie";

export const App = ({ addUser,  user }) => {

    const userLogged = (user && user !== undefined)
    
    const cookie = new Cookies()
    if (!user && cookie.get("user")) {
        addUser(cookie.get("user"))
    }

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
});

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {
            dispatch({
                type: USER_LOGIN,
                payload: user,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);