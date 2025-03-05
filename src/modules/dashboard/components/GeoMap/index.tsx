"use client";

import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useDashStore } from "../../store";
import { debounce } from "lodash";
import {
  getAvailableCoordinates,
  getCoordinateAddress,
} from "@/services/dashboard";

export function GeoMap() {
  const { params, setParams } = useDashStore();

  const {
    location: { coordinate },
  } = params;

  const cookies = useCookies();

  const [lat, lon] = coordinate;

  const [availableCoordinates, setAvailableCoordinates] = useState<number[][]>(
    []
  );

  const debounceSetCoordinate = useCallback(
    debounce(
      (location) =>
        setParams({
          location: {
            ...params.location,
            coordinate: [location[0], location[1]],
          },
        }),
      500
    ),
    [] // será criada apenas uma vez inicialmente
  );

  useEffect(() => {
    async function handleAvailableCoordinates() {
      const availableCoordinates = await getAvailableCoordinates();

      if (!availableCoordinates) return;

      setAvailableCoordinates(availableCoordinates);

      const [lat, lon] = availableCoordinates[0];

      setParams({
        location: {
          ...params.location,
          coordinate: [lat, lon],
        },
      });
    }

    handleAvailableCoordinates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  useEffect(() => {
    async function getCoordinateInfo() {
      if (!lat || !lon) return;

      const coordinateAddress = await getCoordinateAddress([lat, lon]);

      if (!coordinateAddress) return;

      const { address } = coordinateAddress;

      setParams({
        location: {
          ...params.location,
          state: address?.state || "",
          city: address?.city || address?.city_district || "",
        },
      });
    }
    if (lat && lon) getCoordinateInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const center: LatLngExpression = [lat ?? -7.337, lon ?? -47.46];
  return (
    <div className="w-96 h-full">
      <MapContainer
        style={{ height: "100%" }}
        center={center}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {availableCoordinates.length &&
          availableCoordinates.map((location: number[]) => {
            const isSelectedLocation = location[0] == lat && location[1] == lon;

            return (
              <Circle
                eventHandlers={{
                  click: () =>
                    debounceSetCoordinate([location[0], location[1]]),
                }}
                key={`${location}-${lat}-${lon}`}
                weight={10}
                color={isSelectedLocation ? "#f25e40" : "#86807e"}
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
}
