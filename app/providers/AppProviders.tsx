"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, persistor } from "@/lib/store";

import { PersistGate } from "redux-persist/integration/react";

const store = makeStore();
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
