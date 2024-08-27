import { useEffect } from "react";
import { io } from "socket.io-client";
import { Threat, useThreats } from "../zustand-states/useThreats";
import { BATTLE_STATUS, useBattles } from "../zustand-states/useBattles";
import { useGetHeroes } from "../service/home/heroes.service";
import { getRandomNumber } from "../utils";
import { v4 as uuidv4 } from 'uuid';


type BattlePriority = Record<string, {
  canBeDefeat: string;
  battleTime: {
    min: number,
    max: number,
  }
}>;

const battlePriority: BattlePriority = {
  "God": {
    canBeDefeat: "S",
    battleTime: {
      min: 300000,
      max: 600000,
    }
  },
  "Dragon": {
    canBeDefeat: "A",
    battleTime: {
      min: 300000,
      max: 120000,
    }
  },
  "Tiger": {
    canBeDefeat: "B",
    battleTime: {
      min: 10000,
      max: 20000,
    },
  },
  "Wolf": {
    canBeDefeat: "C",
    battleTime: {
      min: 1000,
      max: 2000,
    },
  },
}


export const useOccurrenceWebsocket = () => {
  const { addThreat, removeThreat } = useThreats()
  const { data: heroes } = useGetHeroes();
  const { addBattle, endBattle } = useBattles()

  const handleBattleEnd = (battleId: string, threatId: string, battleTime: number) => {
    setTimeout(() => {
      endBattle(battleId)
      removeThreat(threatId)
    }, battleTime)
  }

  useEffect(() => {
    const ws = io(`${import.meta.env.VITE_APP_WEBSOCKET_URL}`)

    ws.on("connect", () => console.log("Connected"))

    ws.on("occurrence", (event: Threat) => {

      const newId = uuidv4()

      addThreat({ ...event, id: newId })

      const heroForBattle = heroes?.find(hero => hero?.rank === battlePriority[event?.dangerLevel]?.canBeDefeat)

      const battleId = newId + heroForBattle?.id

      const battle = {
        id: battleId,
        hero: heroForBattle ?? {} as HomeApi.HeroesResponse,
        status: BATTLE_STATUS.FIGHTING,
        threat: { ...event, id: newId },
      }

      addBattle(battle)

      const minTime = battlePriority[event?.dangerLevel]?.battleTime?.min
      const maxTime = battlePriority[event?.dangerLevel]?.battleTime?.max

      const battleTime = getRandomNumber(minTime, maxTime)

      handleBattleEnd(battleId, newId, battleTime)

    })

    return () => {
      ws.close();
    }
  }, [addThreat])

}
