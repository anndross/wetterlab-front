import { createContext } from "react";

export type filtersType = { 
    state: string,
    coordinates: number[], 
    dateRange: {
        start: string, 
        end: string
    },
    services: string[]
}

export type StationsContextType = { 
    rawStationsData: any[], 
    stationsData: any[], 
    setStationsData: (data: []) => void, 
    filters: filtersType | any,
    setFilters: (filters: filtersType | any) => void
}

const stationsContext = createContext<StationsContextType>({
    rawStationsData: [], 
    stationsData: [], 
    setStationsData: () => {},
    filters: {
        state: '',
        coordinates: [],
        dateRange: {
            start: '',
            end: ''
        },
        services: ['']
    },
    setFilters: () => {}
})

export default stationsContext