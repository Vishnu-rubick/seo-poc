import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "./Details/Details";
import Home from "./Home/home";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const router = createBrowserRouter([
  {
    path: "/details/issues/:id",
    element: <Details />,
  },
  {
    path: "/details/pages/:id",
    element: <Details />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
