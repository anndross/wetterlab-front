import { createContext } from "react";

export type filtersType = { 
    state: string,
    coordinates: number[], 
    dateRange: {
        start: string, 
        end: string
    },
    services: string[],
    mean: number | string
}

export type MeteorData = {
    dates: string[],
    stations: {
        date: string,
        value: number
    }[]
    models: {
        date: string,
        value: number
    }[]
}

export type StationsContextType = { 
    rawStationsData: any[], 
    meteorData: MeteorData, 
    setMeteorData: (data: MeteorData) => void, 
    filters: filtersType | any,
    setFilters: (filters: filtersType | any) => void
    loading: boolean
    availableCoordinates: number[][]
}


const stationsContext = createContext<StationsContextType>({
    rawStationsData: [], 
    meteorData: {
        dates: [],
        stations: [],
        models: []
    }, 
    setMeteorData: () => {},
    loading: true,
    filters: {
        state: '',
        coordinates: [],
        dateRange: {
            start: '',
            end: ''
        },
        services: [''],
        mean: 1,
    },
    availableCoordinates: [],
    setFilters: () => {}
})

export default stationsContext