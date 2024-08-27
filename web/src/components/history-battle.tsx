import { useBattles } from "../zustand-states/useBattles";

export const HistoryBattle = () => {
  const { battles } = useBattles();

  return (
    <div className="justify-center items-center w-96 h-full overflow-x-hidden overflow-y-auto z-10 fixed inset-0 outline-none focus:outline-none bg-zinc-950 bg-opacity-50">
      <p className="text-center font-bold text-2xl mt-24">Histórico de Batalha</p>

      <div className="flex flex-col gap-4 mt-8">
        {battles?.map((battle) => (
          <div key={battle?.id} className="flex flex-row items-center gap-2 px-4">
            <img src={battle?.hero?.image_url} className="w-10 h-10 rounded-full" />
            <p>
              {battle.hero?.name} VS {battle.threat?.monsterName}
            </p>
            <img src={battle?.threat?.monster?.url} className="w-10 h-10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
