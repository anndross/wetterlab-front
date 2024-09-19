import { createContext } from "react";

export type filtersType = { 
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