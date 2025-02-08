import { ModelsEnsembleDataType } from "@/types/dashboard";
import dayjs from "dayjs";

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
  modelsEnsemble: ModelsEnsembleDataType[] | undefined
): BoxPlotDataResponseType | null {
  if (!modelsEnsemble?.length) return null;

  const modelsEnsembleTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Previsões Ensemble",
    marker: { color: "#1f77b4" },
  };

  for (let i = 0; i < modelsEnsemble.length; i++) {
    const modelsEnsembleByIndex = modelsEnsemble[i];

    const values1 = Object.values(modelsEnsembleByIndex).filter(
      (e) => typeof e !== "string"
    );

    const axisX = `${modelsEnsembleByIndex.date},`
      .repeat(values1.length)
      .split(",")
      .filter((date) => {
        return !!new Date(date).getDate();
      });

    modelsEnsembleTrace.y = [...modelsEnsembleTrace.y, ...values1];

    modelsEnsembleTrace.x = [...modelsEnsembleTrace.x, ...axisX];
  }

  return { data: [modelsEnsembleTrace], dates: modelsEnsembleTrace.x };
}
