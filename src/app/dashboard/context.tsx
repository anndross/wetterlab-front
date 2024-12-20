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

export type Forecast = {
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
  meteorData: Forecast;
  setMeteorData: (data: Forecast) => void;
  filters: filtersType | any;
  setFilters: (filters: filtersType | any) => void;
  loading: boolean;
};

// const stationsContext = createContext<StationsContextType>({
//   meteorData: {
//     dates: [],
//     stations: [],
//     models: [],
//   },
//   setMeteorData: () => {},
//   loading: true,
//   filters: {
//     state: "",
//     coordinates: [],
//     dateRange: {
//       start: "",
//       end: "",
//     },
//     services: [""],
//     mean: 1,
//     refTime: "",
//   },
//   setFilters: () => {},
// });

// export default stationsContext;

const ParamsContext = createContext<any>({
  lat: null,
  lon: null,
  refTime: "",
  mean: 1,
  service: "wspd",
});

export default ParamsContext;
