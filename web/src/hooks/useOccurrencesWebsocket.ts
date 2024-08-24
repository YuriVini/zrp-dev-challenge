import { useEffect } from "react";
import { io } from "socket.io-client";
import { useThreats } from "../zustand-states/useThreats";


export const useOccurrenceWebsocket = () => {
  const { addThreat } = useThreats()

  useEffect(() => {
    const ws = io(`${import.meta.env.VITE_APP_WEBSOCKET_URL}`)

    ws.on("connect", () => console.log("Connected"))

    ws.on("occurrence", event => {
      addThreat(event)
    })

    return () => {
      ws.close();
    }
  }, [addThreat])

}
