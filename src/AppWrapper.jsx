import React from "react";
import { Provider } from "react-redux";
import App from "App";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<p>LOADING.....</p>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
};

export default AppWrapper;
