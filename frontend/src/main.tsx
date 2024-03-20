import { StrictMode, Fragment } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import OAuthCallbackPage from "./OAuthCallbackPage.tsx";
import ErrorPage from "./errorPage.tsx";
import Home from "./Home.tsx";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment errorElement={<ErrorPage />}>
      <Route element={<Home />} path="/" errorElement={<ErrorPage />}></Route>
      <Route
        element={<OAuthCallbackPage type="github" />}
        path="/oauth_callback/github"
      />
    </Fragment>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
