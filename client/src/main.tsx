import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import axios from "axios";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

import { router } from "./routes/router";

import LocationRestrictor from "./components/LocationRestrictor";

const targetLocation = { latitude: 30.487698, longitude: -95.992455 };
const radius = 5000;

axios.defaults.baseURL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3001/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <LocationRestrictor targetLocation={targetLocation} radius={radius}>
        <RouterProvider router={router}></RouterProvider>
      </LocationRestrictor>
    </ChakraProvider>
  </React.StrictMode>
);
