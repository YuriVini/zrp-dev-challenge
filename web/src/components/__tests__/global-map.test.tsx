import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { GlobalMap } from "../global-map";
import { expect, vi } from "vitest";
import { useThreats } from "../../zustand-states/useThreats";

global.setImmediate =
  global.setImmediate ||
  ((fn: () => void, ...args: Record<string, unknown>[]) => global.setTimeout(fn, 0, ...args));
vi.useFakeTimers();
vi.mock("leaflet");
vi.mock("react-leaflet");
vi.mock("leaflet", () => ({
  get Icon() {
    return vi.fn();
  },
}));

test("should render Map", () => {
  const { result } = renderHook(() => useThreats());

  result?.current?.addThreat({
    id: ":r1:",
    location: [
      {
        lat: 45.6994132330711,
        lng: 19.170766583394588,
      },
    ],
    dangerLevel: "Tiger",
    monsterName: "Hans Lada",
    monster: {
      name: "Hans Lada",
      url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Hans_Landa_IB_2009.jpg/225px-Hans_Landa_IB_2009.jpg",
      description:
        "Standartenführer Hans Landa is a fictional character and the main antagonist in the 2009 Quentin Tarantino film Inglourious Basterds. He is portrayed by Austrian actor Christoph Waltz.",
    },
  });

  const { container } = render(<GlobalMap />);

  expect(container).toBeTruthy();
});
