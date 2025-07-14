import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./src/app/store";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppNavigator />
        <StatusBar style="auto" />
      </Provider>
    </QueryClientProvider>
  );
}
