'use client'
import stationsContext, { filtersType } from "@/app/dashboard/context";
import {Select, SelectItem} from "@nextui-org/select";
import { useContext } from "react";

export const services = [
    { value: 'wspd', label: 'Velocidade do Vento' },
    { value: 't', label: 'temperatura' },
    { value: 'prate', label: 'Chuva' },
    { value: 'rh', label: 'Umidade' },
  ];

export function SelectService() {
    const { setFilters } = useContext(stationsContext)

    return (
        <Select
            label="Serviço"
            isRequired
            defaultSelectedKeys={["t"]}
            placeholder="Selecione um serviço"
            className="w-full h-10"
            onChange={(({target}) => {
                setFilters((prev: filtersType) => ({...prev, services: [target.value]}))
            })}
        >
            {services.map((service) => (
                <SelectItem key={service.value}>
                    {service.label}
                </SelectItem>
            ))}
        </Select>
    )
}