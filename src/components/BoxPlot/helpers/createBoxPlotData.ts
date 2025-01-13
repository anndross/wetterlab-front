import { DataType } from "..";

type BoxPlotDataType = {
  y: number[] | [];
  x: string[] | [];
  type: "box";
  name: string;
  boxpoints: "all";
};

export function createBoxPlotData(
  data1: DataType[] | undefined,
  data2: DataType[] | undefined
) {
  if (!data1?.length || !data2?.length) return null;

  let boxPlotData: BoxPlotDataType[] = [];

  for (let i = 0; i < data1.length; i++) {
    const data1Instance: BoxPlotDataType = {
      y: [],
      x: [],
      type: "box",
      name: "Dataset 1", // Nome da primeira caixa
      boxpoints: "all", // Mostrar todos os pontos
    };
    const data2Instance: BoxPlotDataType = {
      y: [],
      x: [],
      type: "box",
      name: "Dataset 2", // Nome da segunda caixa
      boxpoints: "all", // Mostrar todos os pontos
    };

    const data1ByIndex = data1[i];
    const data2ByIndex = data2[i];

    const values1 = Object.values(data1ByIndex).filter(
      (e) => typeof e !== "string"
    );
    const values2 = Object.values(data2ByIndex).filter(
      (e) => typeof e !== "string"
    );

    const axisX = `${data1ByIndex.date},`.repeat(values1.length).split(",");

    data1Instance.y = values1;
    data2Instance.y = values2;

    data1Instance.x = axisX;
    data2Instance.x = axisX;

    boxPlotData.push(data1Instance, data2Instance);
  }

  return boxPlotData;
}
