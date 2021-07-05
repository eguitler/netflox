import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

const ProtectedRoute = ({ authorized, component, path }) => {

    const historical = useHistory()
    if (!authorized) historical.push('/login')
    return (
        <Route exact path={path} component={component} />
    );
};

export default ProtectedRoute;
