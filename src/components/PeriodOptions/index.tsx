import {Button} from "@nextui-org/button";
import { useContext, useEffect, useState } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";
import dayjs from "dayjs";

export function PeriodOptions() {
    const { filters: { dateRange: { start, end } }, setFilters } = useContext(stationsContext)

    const [selectedPeriod, setSelectedPeriod] = useState<number>(30)

    const today = dayjs().format('YYYY-MM-DD')

    const periods: { [key: string | number ]: string } = {
        1: today,
        7: dayjs().add(7, 'day').format('YYYY-MM-DD'),
        15: dayjs().add(15, 'day').format('YYYY-MM-DD'),
        30: dayjs().add(30, 'day').format('YYYY-MM-DD')
    }

    useEffect(() => {
        if(!start.length && !end.length) return

        if(
            start !== today || 
            end !== periods[selectedPeriod]
        ) {
            setSelectedPeriod(0)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, end])


    useEffect(() => {
        if(periods?.[selectedPeriod]) {
            setFilters((prev: filtersType) => ({
                ...prev,
                dateRange: {
                    start: today,
                    end: periods[selectedPeriod]
                }
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
        <div className="flex gap-2">
            <Button onClick={() => handleSelectPeriod(1)} color={markSelectedOption(1)}>
                1 dia
            </Button> 
            <Button onClick={() => handleSelectPeriod(7)} color={markSelectedOption(7)}>
                7 dias
            </Button> 
            <Button onClick={() => handleSelectPeriod(15)} color={markSelectedOption(15)}>
                15 dias
            </Button> 
            <Button onClick={() => handleSelectPeriod(30)} color={markSelectedOption(30)}>
                30 dias
            </Button> 
        </div>
    )
}