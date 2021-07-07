import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ authorized, component, path }) => {
    if (!authorized) window.location.href = '/login'
    return authorized && <Route exact path={path} component={component} />;
};

export default ProtectedRoute;
