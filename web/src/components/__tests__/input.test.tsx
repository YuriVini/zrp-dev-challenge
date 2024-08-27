import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { act } from "react";

const schema = z.object({
  test: z.string().min(1, { message: "Campo obrigatório" }),
});

test("should render Texts and change input value", () => {
  const { result } = renderHook(() =>
    useForm<z.TypeOf<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        test: "",
      },
    })
  );

  render(<Input name="test" placeholder="Test" control={result?.current?.control} />);

  const input = screen.getByPlaceholderText("Test");

  fireEvent.input(input, {
    target: {
      value: "test",
    },
  });

  expect(input.getAttribute("value")).toBe("test");
});

test("should render error text", () => {
  const { result } = renderHook(() =>
    useForm<z.TypeOf<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        test: "",
      },
    })
  );

  render(<Input name="test" placeholder="Test" control={result?.current?.control} />);

  const input = screen.getByPlaceholderText("Test");

  act(() => {
    fireEvent.input(input, {
      target: {
        value: "test",
      },
    });

    result.current?.setError("test", { message: "Erro" });
  });
  const errorText = screen.getByPlaceholderText("Test");
  expect(errorText).toBeTruthy();
  expect(input.getAttribute("value")).toBe("test");
});
