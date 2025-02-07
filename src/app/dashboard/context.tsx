import { createContext, Dispatch, SetStateAction } from "react";
export interface DashboardType {
  params: {
    location: {
      coordinate: number[] | null[];
      state?: string;
      city?: string;
    };
    refTime: string;
    /**
     * @alias 1: 1 dia
     * @alias 7: 7 dias
     * @alias 15: 15 dias
     * @alias 30: 30 dias
     */
    mean: 1 | 7 | 15 | 30;
    /**
     * @alias wspd: velocidade do vento
     * @alias t: temperatura
     * @alias rh: umidade
     * @alias prate: chuva
     */
    service: "wspd" | "t" | "rh" | "prate";
    chart: "LineChart" | "BoxPlot";
  };
  setParams: Dispatch<SetStateAction<DashboardType["params"]>>;
  toggleStatistics: boolean;
  setToggleStatistics: Dispatch<
    SetStateAction<DashboardType["toggleStatistics"]>
  >;
}

const DashboardContext = createContext<DashboardType>({
  params: {
    location: {
      coordinate: [null, null],
    },
    refTime: "",
    mean: 1,
    service: "wspd",
    chart: "LineChart",
  },
  setParams: () => {},
  toggleStatistics: false,
  setToggleStatistics: () => {},
});

export default DashboardContext;
