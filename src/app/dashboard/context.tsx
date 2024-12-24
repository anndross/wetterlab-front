import { createContext, Dispatch, SetStateAction } from "react";
export interface ParamsType {
  params: {
    lat: number | null;
    lon: number | null;
    refTime: string;
    mean: 1 | 7 | 15 | 30;
    /**
     * @alias wspd: velocidade do vento
     * @alias t: temperatura
     * @alias rh: umidade
     * @alias prate: chuva
     */
    service: "wspd" | "t" | "rh" | "prate";
  };
  setParams: Dispatch<SetStateAction<ParamsType["params"]>>;
}

const ParamsContext = createContext<ParamsType>({
  params: {
    lat: null,
    lon: null,
    refTime: "",
    mean: 1,
    service: "wspd",
  },
  setParams: () => {},
});

export default ParamsContext;
