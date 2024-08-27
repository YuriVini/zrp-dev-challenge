import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { HeroForm } from "../hero-form";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/react-query";

const submitActionMock = vi.fn();

test("should render Texts", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <HeroForm submitAction={submitActionMock} />
    </QueryClientProvider>
  );

  const heroFormTitle = screen.getAllByText("Criação de Herói");

  expect(heroFormTitle).toBeTruthy();
});

test("should select an option and submit", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <HeroForm submitAction={submitActionMock} />
    </QueryClientProvider>
  );

  const inputName = screen.getByPlaceholderText("Nome do Herói");
  const inputImage = screen.getByPlaceholderText("URL da Imagem");
  const myReactSelectField = screen.getByDisplayValue("--Selectione um rank--");

  fireEvent.input(inputName, {
    target: {
      value: "Hulk",
    },
  });
  fireEvent.input(inputImage, {
    target: {
      value:
        "https://i0.wp.com/www.ronizealine.com/wp-content/uploads/2013/08/hulk.jpg?fit=600%2C450&ssl=1",
    },
  });
  fireEvent.change(myReactSelectField, {
    target: {
      value: "S",
    },
  });

  act(() => {
    const confirmButton = screen.getByText("Confirmar");

    fireEvent.click(confirmButton);
  });

  await waitFor(() => {
    expect(submitActionMock).toHaveBeenCalled();
  });
});

test("should throw an alert", async () => {
  const spyOnAlert = vi.spyOn(window, "alert");

  render(
    <QueryClientProvider client={queryClient}>
      <HeroForm submitAction={submitActionMock} />
    </QueryClientProvider>
  );

  const inputName = screen.getByPlaceholderText("Nome do Herói");
  const inputImage = screen.getByPlaceholderText("URL da Imagem");
  const myReactSelectField = screen.getByDisplayValue("--Selectione um rank--");

  fireEvent.input(inputName, {
    target: {
      value: "Hulk",
    },
  });
  fireEvent.input(inputImage, {
    target: {
      value:
        "https://i0.wp.com/www.ronizealine.com/wp-content/uploads/2013/08/hulk.jpg?fit=600%2C450&ssl=1",
    },
  });
  fireEvent.change(myReactSelectField);

  act(() => {
    const confirmButton = screen.getByText("Confirmar");

    fireEvent.click(confirmButton);
  });

  await waitFor(() => {
    expect(spyOnAlert).toHaveBeenCalledWith("Selectione um Rank");
  });
});
