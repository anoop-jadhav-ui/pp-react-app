import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FormContextProvider } from "./contexts/formContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <FormContextProvider>
        <App />
      </FormContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
