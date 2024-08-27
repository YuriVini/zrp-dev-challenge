import { render, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { GlobalMap } from "../global-map";
import { expect, vi } from "vitest";
import { useThreats } from "../../zustand-states/useThreats";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/react-query";
import { BATTLE_STATUS, useBattles } from "../../zustand-states/useBattles";
import { defaultMockHero, defaultMockThreat } from "../../test-utils/mock-data";

global.setImmediate =
  global.setImmediate ||
  ((fn: () => void, ...args: Record<string, unknown>[]) => global.setTimeout(fn, 0, ...args));
vi.useFakeTimers();
vi.mock("react-leaflet");
vi.mock("leaflet", () => ({
  get Icon() {
    return vi.fn();
  },
}));

test("should render Map", () => {
  const { result } = renderHook(() => useThreats());
  const { result: resultBattles } = renderHook(() => useBattles());

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <GlobalMap />
    </QueryClientProvider>
  );

  act(() => {
    result?.current?.addThreat(defaultMockThreat);
    resultBattles?.current?.addBattle({
      id: "123",
      hero: defaultMockHero,
      threat: defaultMockThreat,
      status: BATTLE_STATUS.FIGHTING,
    });
    resultBattles?.current?.addBattle({
      id: "1234",
      hero: defaultMockHero,
      threat: defaultMockThreat,
      status: BATTLE_STATUS.FINISHED,
    });
  });

  expect(container).toBeTruthy();
});
