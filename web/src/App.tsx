import { RouterProvider } from "react-router-dom";
import { router } from "./routes-path";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
