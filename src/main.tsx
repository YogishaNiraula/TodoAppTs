import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { loader as appLoader, action as appAction } from "./App";
import ErrorPage from "./error-page";
import Projects, {
  loader as projectLoader,
  action as projectAction,
} from "./projects";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    action: appAction,
    children: [
      {
        path: "projects/:projectId",
        element: <Projects />,
        loader: projectLoader,
        action: projectAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
