import "leaflet/dist/leaflet.css";

import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import { useThreats } from "../zustand-states/useThreats";
import { Icon } from "leaflet";

import flame from "/flame.png";
import { BATTLE_STATUS, useBattles } from "../zustand-states/useBattles";

export const GlobalMap = () => {
  const { threats } = useThreats();
  const { battles } = useBattles();

  const threatIcon = new Icon({
    iconUrl: flame,
    iconSize: [15, 30],
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

        {battles?.map((battle, index) => {
          if (battle?.status === BATTLE_STATUS.FIGHTING)
            return (
              <Marker
                key={index}
                icon={
                  new Icon({
                    iconUrl: battle?.hero?.image_url,
                    iconSize: [15, 30],
                    iconAnchor: [40, 40],
                    popupAnchor: [-30, -40],
                    className: "custom-icon",
                  })
                }
                position={[battle?.threat?.location[0]?.lat, battle?.threat?.location[0]?.lng]}
              >
                <Popup>
                  <div>
                    <img src={battle?.hero?.image_url} alt={battle?.hero?.name} />
                    <p className="font-bold text-lg">{battle?.hero?.name}</p>
                  </div>
                </Popup>
              </Marker>
            );
          return null;
        })}
      </MapContainer>
    </div>
  );
};
