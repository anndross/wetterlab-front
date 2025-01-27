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
    <Dialog>
      <div className="flex flex-col justify-end gap-2">
        <span className="block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground">
          Coordenada
        </span>
        <DialogTrigger asChild>
          <Button variant="outline">{center.join(", ")}</Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mapa</DialogTitle>
          <DialogDescription>Selecione a coordenada</DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
