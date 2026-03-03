import { Provider as ChackraProvider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

// 1. Создаем экземпляр QueryClient
// Здесь можно настроить глобальные параметры, например, отключить 
// автоматический перезапрос при ошибке (retry: false)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, 
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChackraProvider>     
        <RouterProvider router={router} />
      </ChackraProvider>
      
      {/*Инструменты разработчика*/}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);