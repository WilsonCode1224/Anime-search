import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./Gloabalstyle.jsx";

// context
import { GlobalContextProvider } from "./context/global.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <GlobalStyle />
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
