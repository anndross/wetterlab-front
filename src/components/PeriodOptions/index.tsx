import {Button} from "@nextui-org/button";
import { useContext, useEffect, useState } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";
import dayjs from "dayjs";

export function PeriodOptions() {
    const { filters: { mean }, setFilters } = useContext(stationsContext)

    const [selectedPeriod, setSelectedPeriod] = useState<number>(mean || 1)


    // var day = new Date(2022, 1, 1)
    // const today = dayjs(day).format('YYYY-MM-DD')

    // const periods: { [key: string | number ]: string } = {
    //     1: today,
    //     7: dayjs(day).add(7, 'day').format('YYYY-MM-DD'),
    //     15: dayjs(day).add(15, 'day').format('YYYY-MM-DD'),
    //     30: dayjs(day).add(30, 'day').format('YYYY-MM-DD')
    // }

    useEffect(() => {
        if(selectedPeriod) {
            setFilters((prev: filtersType) => ({
                ...prev,
                mean: selectedPeriod
            }))
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPeriod])

    const handleSelectPeriod = (value: number) => setSelectedPeriod(value)

    const markSelectedOption = (value: number) => {
        if(selectedPeriod == value) return 'primary'

        return 'default'
    }

    return (
        <div className="w-5 flex gap-2 flex-col">
            <Button className="w-10 max-w-10 min-w-10 h-10" onClick={() => handleSelectPeriod(1)} color={markSelectedOption(1)} title="Média de 1 dia">
                1
            </Button> 
            <Button className="w-10 max-w-10 min-w-10 h-10" onClick={() => handleSelectPeriod(7)} color={markSelectedOption(7)} title="Média de 7 dias">
                7
            </Button> 
            <Button className="w-10 max-w-10 min-w-10 h-10" onClick={() => handleSelectPeriod(15)} color={markSelectedOption(15)} title="Média de 15 dias">
                15
            </Button> 
            <Button className="w-10 max-w-10 min-w-10 h-10" onClick={() => handleSelectPeriod(30)} color={markSelectedOption(30)} title="Média de 30 dias">
                30
            </Button> 
        </div>
    )
}