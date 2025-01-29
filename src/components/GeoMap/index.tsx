"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { decodeJWT } from "@/utils/decodeJWT";
import DashboardContext from "@/app/dashboard/context";
import { FaCopy } from "react-icons/fa";

export function GeoMap() {
  const { params, setParams } = useContext(DashboardContext);
  const {
    location: { coordinate },
  } = params;
  const cookies = useCookies();

  const [lat, lon] = coordinate;

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
        location: {
          ...prev.location,
          coordinate: [lat, lon],
        },
      }));
    }

    if (customerId) handleAvailableCoordinates();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  useEffect(() => {
    async function getCoorinateInfo() {
      const coordinateInfo = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      ).then((res) => res.json());

      setParams((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          state: coordinateInfo?.address?.state || "",
          city:
            coordinateInfo?.address?.city ||
            coordinateInfo?.address?.city_district ||
            "",
        },
      }));
    }
    if (lat && lon) getCoorinateInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

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
            const isSelectedLocation = location[0] == lat && location[1] == lon;

            return (
              <Circle
                eventHandlers={{
                  click: () =>
                    setParams((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        coordinate: [location[0], location[1]],
                      },
                    })),
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
