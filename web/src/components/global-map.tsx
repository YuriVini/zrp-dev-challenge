import "leaflet/dist/leaflet.css";

import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import { useOccurrenceWebsocket } from "../hooks/useOccurrencesWebsocket";
import { useThreats } from "../zustand-states/useThreats";

export const GlobalMap = () => {
  const { threats } = useThreats();
  useOccurrenceWebsocket();

  return (
    <div className="h-full w-full">
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {threats?.map((threat, index) => (
          <Marker key={index} position={[threat?.location[0]?.lat, threat?.location[0]?.lng]}>
            <Popup>
              <div>
                <img src={threat?.monster?.url} />
                <p className="font-bold text-lg">{threat?.monsterName}</p>
                <p>{threat?.monster?.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
