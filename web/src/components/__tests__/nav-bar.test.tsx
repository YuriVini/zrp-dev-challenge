import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../nav-bar";

test("should render Texts", () => {
  render(<Navbar />);

  const navLink1 = screen.getAllByText("Home");
  const navLink2 = screen.getAllByText("Heróis");

  expect(navLink1).toBeTruthy();
  expect(navLink2).toBeTruthy();
});

test("should open nav bar in small screen and then close it", () => {
  render(<Navbar />);

  const navOpenButton = screen.getByText("Mais");

  fireEvent.click(navOpenButton);

  expect(navOpenButton).toBeTruthy();

  const navCloseButton = screen.getByText("X");

  fireEvent.click(navCloseButton);
});
