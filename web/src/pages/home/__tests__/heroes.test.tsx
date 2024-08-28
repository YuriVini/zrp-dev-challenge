import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../lib/react-query";
import { Heroes } from "../heroes";

test("should render screen and complete form", async () => {
  localStorage.setItem("authToken", "123");
  render(
    <QueryClientProvider client={queryClient}>
      <Heroes />
    </QueryClientProvider>
  );

  await waitFor(() => {
    const createHeroButton = screen.getByText("Criar Herói");

    fireEvent.click(createHeroButton);

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
  });

  localStorage.clear();
});

test("should render screen and close form", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Heroes />
    </QueryClientProvider>
  );

  await waitFor(() => {
    const createHeroButton = screen.getByText("Criar Herói");

    fireEvent.click(createHeroButton);

    act(() => {
      const closeButton = screen.getByText("X");

      fireEvent.click(closeButton);
    });
  });
});
