import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import ContextProvider from "./Context";

const App = () => {
    return (
        <ContextProvider>
            <BrowserRouter>
                <ConfigProvider>
                    <Routes />
                </ConfigProvider>
            </BrowserRouter>
        </ContextProvider>
    );
};

export default App;
