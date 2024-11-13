import { createContext } from "react";

export type filtersType = { 
    state: string,
    coordinates: number[], 
    dateRange: {
        start: string, 
        end: string
    },
    services: string[],
    mean: number | string,
    refTime: string
}

export type MeteorData = {
    dates: string[],
    stations: {
        x: string[],
        y: number[]
    }[]
    models: {
        x: string[],
        y: number[]
    }[]
}


export type ZoomInfo = {
    y: {
        from: number,
        to: number
    },
    x: {
        from: string,
        to: string
    }
}

export type StationsContextType = { 
    rawStationsData: any[], 
    meteorData: MeteorData, 
    setMeteorData: (data: MeteorData) => void, 
    filters: filtersType | any,
    setFilters: (filters: filtersType | any) => void
    loading: boolean
    availableCoordinates: number[][]
    zoomInfo: ZoomInfo
    setZoomInfo: (data: ZoomInfo) => void, 
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
        refTime: '',
    },
    availableCoordinates: [],
    setFilters: () => {},
    zoomInfo: {
        y: {
            from: 0,
            to: 0
        },
        x: {
            from: '',
            to: ''
        }
    },
    setZoomInfo: () => {},
})

export default stationsContext