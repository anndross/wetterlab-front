'use client'
import stationsContext, { filtersType } from "@/app/dashboard/context";
import {Select, SelectItem} from "@nextui-org/select";
import { useContext } from "react";
import {Button} from "@nextui-org/button";
import { CiDroplet, CiTempHigh } from "react-icons/ci";
import { IoRainyOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";

export const services = [
    { value: 'wspd', label: 'Velocidade do Vento' },
    { value: 't', label: 'temperatura' },
    { value: 'prate', label: 'Chuva' },
    { value: 'rh', label: 'Umidade' },
  ];

export function SelectService() {
    const { setFilters } = useContext(stationsContext)

    return ( 
        <div className="flex gap-2">
            <Button 
                onClick={() => {
                    setFilters((prev: filtersType) => ({...prev, services: ['t']}))
                }} 
            isIconOnly color="default" aria-label="Temperatura" title="Temperatura">
                <CiTempHigh />
            </Button> 
            <Button  onClick={() => {
                    setFilters((prev: filtersType) => ({...prev, services: ['prate']}))
                }} isIconOnly color="default" aria-label="Chuva" title="Chuva">
                <IoRainyOutline />
            </Button> 
            <Button onClick={() => {
                    setFilters((prev: filtersType) => ({...prev, services: ['rh']}))
                }} isIconOnly color="default" aria-label="Umidade" title="Umidade">
                <CiDroplet />
            </Button> 
            <Button onClick={() => {
                    setFilters((prev: filtersType) => ({...prev, services: ['wspd']}))
                }} isIconOnly color="default" aria-label="Velocidade do vento" title="Velocidade do vento">
                <FaWind />
            </Button>
        </div>
    )
}