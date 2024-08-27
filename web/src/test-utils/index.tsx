/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderOptions, render } from "@testing-library/react";

const renderWithProps = (ui: React.ReactElement, props?: RenderOptions) => render(ui, { ...props });

const renderWithQueryProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
};

export * from "@testing-library/react";

export { renderWithProps, renderWithQueryProvider };
