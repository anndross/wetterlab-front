"use client";
import ParamsContext from "@/app/dashboard/context";
import { useContext, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { CiDroplet, CiTempHigh } from "react-icons/ci";
import { IoRainyOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";

export const services = [
  { value: "wspd", label: "Velocidade do Vento" },
  { value: "t", label: "temperatura" },
  { value: "prate", label: "Chuva" },
  { value: "rh", label: "Umidade" },
];

export function ServiceOptions() {
  const { params, setParams } = useContext(ParamsContext);
  const { service } = params;

  const handleSelectService = (value: string) =>
    setParams((prev: any) => ({ ...prev, service: value }));

  const markSelectedService = (value: string) => {
    if (service === value) {
      return "primary";
    }
    return "default";
  };

  useEffect(() => {
    setParams((prev: any) => ({ ...prev, service: "wspd" }));
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
          isIconOnly
          color={markSelectedService("wspd")}
          aria-label="Velocidade do vento"
          title="Velocidade do vento"
          className="w-10"
        >
          <FaWind />
        </Button>
        <Button
          onClick={() => handleSelectService("t")}
          isIconOnly
          color={markSelectedService("t")}
          aria-label="Temperatura"
          title="Temperatura"
          className="w-10"
        >
          <CiTempHigh />
        </Button>
        <Button
          onClick={() => handleSelectService("prate")}
          isIconOnly
          color={markSelectedService("prate")}
          aria-label="Chuva"
          title="Chuva"
          className="w-10"
        >
          <IoRainyOutline />
        </Button>
        <Button
          onClick={() => handleSelectService("rh")}
          isIconOnly
          color={markSelectedService("rh")}
          aria-label="Umidade"
          title="Umidade"
          className="w-10"
        >
          <CiDroplet />
        </Button>
      </div>
    </div>
  );
}
