import { DataType } from "..";

type BoxPlotDataType = {
  y: number[] | [];
  x: string[] | [];
  type: "box";
  name: string;
  marker: { color: string };
};
export function createBoxPlotData(
  models: DataType[] | undefined,
  stations: DataType[] | undefined
): BoxPlotDataType[] | null {
  if (!models?.length || !stations?.length) return null;

  const modelsTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Previsões",
    marker: { color: "#1f77b4" },
  };

  const stationsTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Observados",
    marker: { color: "#000" },
  };

  for (let i = 0; i < models.length; i++) {
    const modelsByIndex = models[i];
    const stationsByIndex = stations[i];

    const values1 = Object.values(modelsByIndex).filter(
      (e) => typeof e !== "string"
    );
    const values2 = Object.values(stationsByIndex).filter(
      (e) => typeof e !== "string"
    );

    const axisX = `${modelsByIndex.date},`.repeat(values1.length).split(",");

    modelsTrace.y = [...modelsTrace.y, ...values1];
    stationsTrace.y = [...stationsTrace.y, ...values2];

    modelsTrace.x = [...modelsTrace.x, ...axisX];
    stationsTrace.x = [...stationsTrace.x, ...axisX];
  }

  return [modelsTrace, stationsTrace];
}
