import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Profile from "./pages/Profile.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<App />} />
      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <ThemeProvider theme={darkTheme}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
