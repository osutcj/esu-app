import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "uno.css";
import "@unocss/reset/tailwind.css";
import { BrowserRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
//@ts-ignore
import { registerSW } from "virtual:pwa-register";
registerSW({ immediate: true });

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
    primary: {
      main: "#ffcd29",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={esuTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
