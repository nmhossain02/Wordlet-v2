import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./routes/App";
import "./index.css";
import ErrorPage from "./routes/ErrorPage";
import SetsPage from "./routes/sets";
import PlayPage from "./routes/play";
import AddSetPage from "./routes/sets/add";
import { useAppProvider } from "./util/Context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "sets/",
        element: <SetsPage />,
        children: [
          {
            path: ":setId",
            element: <AddSetPage />,
          }
        ]
      },
      {
        path: "play/",
        element: <PlayPage />,
      },
    ],
  },
]);

const ContextProvider = useAppProvider();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
