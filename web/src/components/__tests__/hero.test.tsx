import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Hero } from "../hero";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/react-query";
import { heroesKey } from "../../service/home/heroes.service";

const heroData = {
  id: "123",
  name: "John",
  rank: "A",
  image_url: "https://google.com",
};

test("should render Texts", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Hero hero={heroData} />
    </QueryClientProvider>
  );

  const heroName = screen.getByAltText("John");

  expect(heroName).toBeTruthy();
});

test("should render empty inputs", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Hero hero={{ ...heroData, name: "", image_url: "" }} />
    </QueryClientProvider>
  );

  const heroName = screen.getByAltText("");

  expect(heroName).toBeTruthy();
});

test("should open modal form and submit update", async () => {
  queryClient.setQueryData(heroesKey(), () => [
    { id: "12", name: "John", rank: "A", image_url: "https://google.com" },
    { id: "123", name: "John", rank: "A", image_url: "https://google.com" },
  ]);
  render(
    <QueryClientProvider client={queryClient}>
      <Hero hero={heroData} />
    </QueryClientProvider>
  );

  const heroName = screen.getByAltText("John");

  fireEvent.click(heroName);

  expect(heroName).toBeTruthy();

  const updateButton = screen.getByText("Atualizar");

  fireEvent.click(updateButton);

  expect(updateButton).toBeTruthy();

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

  const confirmButton = screen.getByText("Atualizar");

  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(inputName).not.toBeInTheDocument();
  });
});

test("should throw an alert", async () => {
  const spyOnAlert = vi.spyOn(window, "alert");

  queryClient.setQueryData(heroesKey(), () => [
    { id: "12", name: "John", rank: "A", image_url: "https://google.com" },
    { id: "123", name: "John", rank: "A", image_url: "https://google.com" },
  ]);
  render(
    <QueryClientProvider client={queryClient}>
      <Hero hero={heroData} />
    </QueryClientProvider>
  );

  const heroName = screen.getByAltText("John");

  fireEvent.click(heroName);

  expect(heroName).toBeTruthy();

  const updateButton = screen.getByText("Atualizar");

  fireEvent.click(updateButton);

  expect(updateButton).toBeTruthy();

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

  const confirmButton = screen.getByText("Atualizar");

  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(spyOnAlert).toHaveBeenCalledWith("Selectione um Rank");
  });
});

test("should open modal form and press delete", async () => {
  queryClient.setQueryData(heroesKey(), () => [
    { id: "123", name: "John", rank: "A", image_url: "https://google.com" },
  ]);

  render(
    <QueryClientProvider client={queryClient}>
      <Hero hero={heroData} />
    </QueryClientProvider>
  );

  const heroName = screen.getByAltText("John");

  fireEvent.click(heroName);

  expect(heroName).toBeTruthy();

  const deleteButton = screen.getByText("Excluir");

  fireEvent.click(deleteButton);

  expect(deleteButton).toBeTruthy();

  await waitFor(() => {
    expect(deleteButton).not.toBeInTheDocument();
  });
});

test("should open modal form and press close button", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Hero hero={heroData} />
    </QueryClientProvider>
  );

  const heroName = screen.getByAltText("John");

  fireEvent.click(heroName);

  expect(heroName).toBeTruthy();

  const closeButton = screen.getByText("X");

  fireEvent.click(closeButton);

  expect(closeButton).toBeTruthy();
});
