import { GlobalMap } from "../../components/global-map";
import { HistoryBattle } from "../../components/history-battle";
import Navbar from "../../components/nav-bar";
import { useOccurrenceWebsocket } from "../../hooks/useOccurrencesWebsocket";

export const Home = () => {
  useOccurrenceWebsocket();

  return (
    <div className="h-full w-full">
      <HistoryBattle />
      <Navbar />
      <GlobalMap />
    </div>
  );
};
