"use client";
import { useEffect } from "react";
import { CiDroplet, CiTempHigh } from "react-icons/ci";
import { IoRainyOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Services, useDashStore } from "@/modules/dashboard/store";
import clsx from "clsx";

export const services = [
  { value: "wspd", label: "Velocidade do Vento" },
  { value: "t", label: "temperatura" },
  { value: "prate", label: "Chuva" },
  { value: "rh", label: "Umidade" },
];

export function ServiceOptions() {
  const { params, setParams } = useDashStore();
  const { service } = params;

  const handleSelectService = (value: Services) =>
    setParams({ service: value });

  const markSelectedService = (value: Services) => {
    if (service == value) return "bg-main text-white hover:bg-main";

    return "bg-white";
  };

  useEffect(() => {
    setParams({ service: "wspd" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-end">
      <span className="block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground">
        Serviços
      </span>
      <div className="flex gap-2">
        <Button
          onClick={() => handleSelectService("wspd")}
          variant="outline"
          className={clsx("w-10", markSelectedService("wspd"))}
          aria-label="Velocidade do vento"
          title="Velocidade do vento"
        >
          <FaWind />
        </Button>
        <Button
          onClick={() => handleSelectService("t")}
          variant="outline"
          aria-label="Temperatura"
          title="Temperatura"
          className={clsx("w-10", markSelectedService("t"))}
        >
          <CiTempHigh />
        </Button>
        <Button
          onClick={() => handleSelectService("prate")}
          variant="outline"
          aria-label="Chuva"
          title="Chuva"
          className={clsx("w-10", markSelectedService("prate"))}
        >
          <IoRainyOutline />
        </Button>
        <Button
          onClick={() => handleSelectService("rh")}
          variant="outline"
          aria-label="Umidade"
          title="Umidade"
          className={clsx("w-10", markSelectedService("rh"))}
        >
          <CiDroplet />
        </Button>
      </div>
    </div>
  );
}
