import { createContext } from "react";

export type filtersType = { 
    state: string,
    coordinates: number[], 
    dateRange: {
        start: string, 
        end: string
    },
    services: string[],
}

export type StationsContextType = { 
    rawStationsData: any[], 
    meteorData: any[], 
    setMeteorData: (data: []) => void, 
    filters: filtersType | any,
    setFilters: (filters: filtersType | any) => void
    loading: boolean
    availableCoordinates: number[][]
}

const stationsContext = createContext<StationsContextType>({
    rawStationsData: [], 
    meteorData: [], 
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
    },
    availableCoordinates: [],
    setFilters: () => {}
})

export default stationsContext