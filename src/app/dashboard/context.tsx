import { createContext } from "react";

export type filtersType = {
  state: string;
  coordinates: number[];
  dateRange: {
    start: string;
    end: string;
  };
  services: string[];
  mean: number | string;
  refTime: string;
};

export type MeteorData = {
  dates: string[];
  stations: {
    x: string[];
    y: number[];
  }[];
  models: {
    x: string[];
    y: number[];
  }[];
};

export type StationsContextType = {
  meteorData: MeteorData;
  setMeteorData: (data: MeteorData) => void;
  filters: filtersType | any;
  setFilters: (filters: filtersType | any) => void;
  loading: boolean;
  availableCoordinates: number[][];
};

const stationsContext = createContext<StationsContextType>({
  meteorData: {
    dates: [],
    stations: [],
    models: [],
  },
  setMeteorData: () => { },
  loading: true,
  filters: {
    state: "",
    coordinates: [],
    dateRange: {
      start: "",
      end: "",
    },
    services: [""],
    mean: 1,
    refTime: "",
  },
  availableCoordinates: [],
  setFilters: () => { },
});

export default stationsContext;
