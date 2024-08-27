import "leaflet/dist/leaflet.css";

import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import { useOccurrenceWebsocket } from "../hooks/useOccurrencesWebsocket";
import { useThreats } from "../zustand-states/useThreats";
import { Icon } from "leaflet";

import flame from "/flame.png";

export const GlobalMap = () => {
  const { threats } = useThreats();
  useOccurrenceWebsocket();

  const threatIcon = new Icon({
    iconUrl: flame,
    iconSize: [40, 60],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: "custom-icon",
  });

  return (
    <div className="h-full w-full">
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {threats?.map((threat, index) => (
          <Marker
            key={index}
            icon={threatIcon}
            position={[threat?.location[0]?.lat, threat?.location[0]?.lng]}
          >
            <Popup>
              <div>
                <img src={threat?.monster?.url} alt={threat?.monsterName} />
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
