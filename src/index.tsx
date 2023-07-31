import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, BrowserRouter } from "react-router-dom";
import Details from "./Details/Details";
import Home from "./Home/home";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PagesDetails from "./PagesDetails/pagesDetails";
import App from "./App";
import SiteAudit from "./site-audit";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
