import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "uno.css";
import "@unocss/reset/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./routes/login";
import "./index.css";
import Main from "./routes/main";
import MainIndex from "./routes/main/index";
import { createTheme, ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root")!);

declare module "@mui/material/styles" {
  interface Theme {}

  interface Palette {
    googleRed: Palette["primary"];
  }
  interface PaletteOptions {
    googleRed: PaletteOptions["primary"];
  }
}

export const esuTheme = createTheme({
  palette: {
    googleRed: {
      main: "#ea4335",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={esuTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="app" element={<Main />}>
                <Route index element={<MainIndex />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
