import { render, screen } from "@testing-library/react";
import MenuOverlay from "../menu-overlay";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
];

test("should render Texts", () => {
  render(<MenuOverlay links={navLinks} />);

  const menuOverlayTitle = screen.getAllByText("About");

  expect(menuOverlayTitle).toBeTruthy();
});
