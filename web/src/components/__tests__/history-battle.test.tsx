import { render, screen } from "@testing-library/react";
import { HistoryBattle } from "../history-battle";
import { act, renderHook } from "@testing-library/react-hooks";
import { BATTLE_STATUS, useBattles } from "../../zustand-states/useBattles";
import { defaultMockHero, defaultMockThreat } from "../../test-utils/mock-data";

test("should render Texts", () => {
  const { result: resultBattles } = renderHook(() => useBattles());

  render(<HistoryBattle />);

  act(() => {
    resultBattles?.current?.addBattle({
      id: "1234",
      hero: defaultMockHero,
      threat: defaultMockThreat,
      status: BATTLE_STATUS.FINISHED,
    });
  });

  const HistoryBattleTitle = screen.getAllByText("John VS Hans Lada");

  expect(HistoryBattleTitle).toBeTruthy();
});
