import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Register } from "../register";
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

test("should render screen and complete register", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  );

  const inputName = screen.getByPlaceholderText("Nome");
  const inputEmail = screen.getByPlaceholderText("Email");
  const inputPassword = screen.getByPlaceholderText("Senha");
  const inputConfirmPassword = screen.getByPlaceholderText("Confirmar Senha");

  act(() => {
    fireEvent.input(inputName, {
      target: {
        value: "Test",
      },
    });
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
    fireEvent.input(inputConfirmPassword, {
      target: {
        value: "123",
      },
    });
  });

  const submitButton = screen.getByText("Cadastrar");

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockedUseNavigate).toHaveBeenCalled();
  });
});
