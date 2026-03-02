import { Provider as ChackraProvider } from "@/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChackraProvider>     
      <RouterProvider router={router} />
    </ChackraProvider>
  </React.StrictMode>
);