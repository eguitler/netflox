import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "styles/global";

import Home from "pages/Home";

const App = () => {
    return (
        <Router>
            <GlobalStyles />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default App;
