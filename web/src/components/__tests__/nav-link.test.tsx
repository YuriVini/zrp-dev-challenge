import { render, screen } from "@testing-library/react";
import NavLink from "../nav-link";

test("render Texts", () => {
  render(<NavLink href="#about" title="About" />);

  const navLinkTitle = screen.getAllByText("About");

  expect(navLinkTitle).toBeTruthy();
});

test("should get right link in href prop", () => {
  render(<NavLink href="#about" title="About" />);

  const navLinkTitle = screen.getByText("About");

  expect(navLinkTitle.getAttribute("href")).toBe("#about");
});
