"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Theme appearance="dark" accentColor="lime" grayColor="slate" radius="small" scaling="95%">
          {children}
        </Theme>
      </QueryClientProvider>
    </Provider>
  );
}

