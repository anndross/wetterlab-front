import { create } from "zustand";

/**
 * @description latitude, longitude
 */
export type Coordinate = [number | null, number | null];

export type Location = {
  coordinate: Coordinate;
  state: string;
  city: string;
};

/**
 * @alias 1: 1 dia
 * @alias 7: 7 dias
 * @alias 15: 15 dias
 * @alias 30: 30 dias
 */
export type Mean = 1 | 7 | 15 | 30;

/**
 * @alias wspd: velocidade do vento
 * @alias t: temperatura
 * @alias rh: umidade
 * @alias prate: chuva
 */
export type Services = "wspd" | "t" | "rh" | "prate";

export type Chart = "LineChart" | "BoxPlot";

export type RefTime = {
  /**
   * @description YYYY-MM-DD-HH-MM-SS
   */
  value: string;
  respectiveCoordinate: Coordinate;
};
export interface DashStore {
  params: {
    location: Location;
    refTime: RefTime;
    enableStatistics: boolean;
    mean: Mean;
    service: Services;
    chart: Chart;
  };
  setParams: (data: Partial<DashStore["params"]>) => void;
}

export const useDashStore = create<DashStore>((set) => {
  return {
    params: {
      location: {
        coordinate: [null, null],
        state: "",
        city: "",
      },
      enableStatistics: true,
      refTime: {
        value: "",
        respectiveCoordinate: [null, null],
      },
      mean: 1,
      service: "wspd",
      chart: "LineChart",
    },
    setParams: (data) =>
      set((state) => ({ params: { ...state.params, ...data } })),
  };
});
