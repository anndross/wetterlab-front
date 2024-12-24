"use client";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { decodeJWT } from "@/utils/decodeJWT";
import ParamsContext from "@/app/dashboard/context";

export type LocationType = { latitude: number; longitude: number };

export const GeoMap: React.FC = () => {
  const { params, setParams } = useContext(ParamsContext);
  const { lat, lon } = params;
  const cookies = useCookies();

  const [availableCoordinates, setAvailableCoordinates] = useState<number[][]>(
    []
  );

  useEffect(() => {
    const token = cookies.get("token");
    const decodedToken = decodeJWT(token ?? "");
    const customerId = decodedToken?.customer_id;

    async function handleAvailableCoordinates() {
      const availableCoordinatesData = await fetch(
        `/api/erp/available-services?customer_id=${customerId}`
      ).then((res) => res.ok && res.json());

      setAvailableCoordinates(availableCoordinatesData);

      const [lat, lon] = availableCoordinatesData[0];

      setParams((prev) => ({
        ...prev,
        lat,
        lon,
      }));
    }

    if (customerId) handleAvailableCoordinates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  const center: LatLngExpression = [lat ?? -7.337, lon ?? -47.46];

  return (
    <div className="w-96 h-full">
      <MapContainer center={center} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {availableCoordinates.length &&
          availableCoordinates.map((location: number[]) => {
            return (
              <Circle
                eventHandlers={{
                  click: () =>
                    setParams((prev) => ({
                      ...prev,
                      lat: location[0],
                      lon: location[1],
                    })),
                }}
                key={`${location}`}
                weight={10}
                color={"#f25e40"}
                center={location as LatLngExpression}
                radius={5}
              />
            );
          })}

        <Marker
          position={center}
          icon={
            new Icon({
              iconUrl: "/assets/marker.png",
              iconSize: [30, 30],
            })
          }
        >
          <Popup>{center.join(", ")}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
