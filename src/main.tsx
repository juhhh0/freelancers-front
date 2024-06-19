import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Freelancer from "./pages/Freelancer.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import NewFreelancer from "./pages/NewFreelancer.tsx";
import NewRecruiter from "./pages/NewRecruiter.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "freelancer/:id",
    element: <Freelancer />,
  },
  {
    path: "/new-freelancer",
    element: <NewFreelancer/>,
  },
  {
    path: "/new-recruiter",
    element: <NewRecruiter/>,
  }, 
  {
    path: "/login",
    element: <Login/>
  }, 
  {
    path: "/signup",
    element: <Signup/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
