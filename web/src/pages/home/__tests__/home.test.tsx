import { render } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../lib/react-query";
import { Home } from "../home";

test("should render screen", () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );

  expect(container).toBeTruthy();
});
