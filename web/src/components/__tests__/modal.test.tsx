import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "../modal";

const onCloseMock = vi.fn();

test("should render Texts", () => {
  render(
    <Modal visible onClose={onCloseMock}>
      My Modal
    </Modal>
  );

  const modalTitle = screen.getAllByText("My Modal");
  const modalCloseButton = screen.getByText("X");

  fireEvent.click(modalCloseButton);

  expect(modalTitle).toBeTruthy();
  expect(onCloseMock).toHaveBeenCalled();
});

test("should not render Texts", () => {
  render(
    <Modal visible={false} onClose={onCloseMock}>
      My Modal
    </Modal>
  );

  const modalTitle = screen.queryAllByText("My Modal");

  expect(modalTitle).toStrictEqual([]);
});
