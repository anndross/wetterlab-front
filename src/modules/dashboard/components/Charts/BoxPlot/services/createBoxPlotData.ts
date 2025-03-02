import {
  ModelsDataType,
  ModelsEnsembleDataType,
  StationsDataType,
} from "@/types/dashboard";

export type BoxPlotDataType = {
  y: number[] | [];
  x: string[] | [];
  type: "box";
  name: string;
  marker: { color: string };
};

export interface BoxPlotDataResponseType {
  data: BoxPlotDataType[];
  dates: Date[] | string[];
}

export function createBoxPlotData(
  modelsEnsemble: ModelsEnsembleDataType[] | undefined,
  models: ModelsEnsembleDataType[] | undefined,
  stations: ModelsEnsembleDataType[] | undefined
): BoxPlotDataResponseType {
  if (!modelsEnsemble?.length || !models?.length || !stations?.length)
    throw new Error("Dados inválidos");

  const modelsEnsembleTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Previsões Ensemble",
    marker: { color: "#5C7285" },
  };

  const modelsTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Previsões",
    marker: { color: "#CD5C08" },
  };

  const stationsTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Observados",
    marker: { color: "#35374B" },
  };

  for (let i = 0; i < modelsEnsemble.length; i++) {
    const modelsEnsembleByIndex = modelsEnsemble[i];
    const modelsByIndex = models[i];
    const stationsByIndex = stations[i];

    const getValues = (value: ModelsEnsembleDataType) => {
      return Object.values(value).filter((e) => typeof e !== "string");
    };

    const values1 = getValues(modelsEnsembleByIndex);
    const values2 = getValues(modelsByIndex);
    const values3 = getValues(stationsByIndex);

    const axisX = `${modelsByIndex.date},`
      .repeat(values2.length)
      .split(",")
      .filter((date) => {
        return !!new Date(date).getDate();
      });

    modelsEnsembleTrace.y = [...modelsEnsembleTrace.y, ...values1];
    modelsEnsembleTrace.x = [...modelsEnsembleTrace.x, ...axisX];

    modelsTrace.y = [...modelsTrace.y, ...values2];
    modelsTrace.x = [...modelsTrace.x, ...axisX];

    stationsTrace.y = [...stationsTrace.y, ...values3];
    stationsTrace.x = [...stationsTrace.x, ...axisX];
  }

  return {
    data: [modelsEnsembleTrace, modelsTrace, stationsTrace],
    dates: Object.keys(
      modelsTrace.x.reduce((acc, currentValue) => {
        acc[currentValue] = currentValue;
        return acc;
      }, {} as { [key: string]: string })
    ),
  };
}
