import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "../login";
import { vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../lib/react-query";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

test("should render screen", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );

  const inputEmail = screen.getByPlaceholderText("Email");
  const inputPassword = screen.getByPlaceholderText("Senha");

  act(() => {
    fireEvent.input(inputEmail, {
      target: {
        value: "test@gmail.com",
      },
    });
    fireEvent.input(inputPassword, {
      target: {
        value: "123",
      },
    });
  });

  const submitButton = screen.getByText("Entrar");

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
