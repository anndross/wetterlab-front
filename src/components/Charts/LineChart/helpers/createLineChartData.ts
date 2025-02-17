import {
  ModelsDataType,
  ModelsEnsembleDataType,
  StationsDataType,
} from "@/types/dashboard";

type LineChartDataType = {
  x: string[] | [];
  y: number[] | [];
  y0?: number[] | [];
  type?: "scatter";
  mode?: "lines+markers" | "none";
  name?: string;
  fill?: "tonexty";
  line?: { color: string };
  fillcolor?: string;
};

type BaseConfigType = {
  type?: "scatter";
  mode?: "lines+markers" | "none";
  name?: string;
  line?: { color: string };
  fill?: "tonexty";
  fillcolor?: string;
};

export function createLineChartData(
  models: ModelsDataType[] | undefined,
  stations: StationsDataType[] | undefined,
  modelsEnsemble: ModelsEnsembleDataType[] | undefined,
  enableStatistics: boolean
) {
  function getAxisData(data: Partial<ModelsEnsembleDataType>[] | undefined) {
    if (!data?.length) return { dates: [], statistics: {} };

    const dates: string[] = [];
    const statistics = {
      median: [] as number[],
      min: [] as number[],
      p25: [] as number[],
      p75: [] as number[],
      max: [] as number[],
    };

    for (const item of data) {
      item?.date && dates.push(item.date);
      item?.median && statistics.median.push(item.median);
      item?.min && statistics.min.push(item.min);
      item?.p25 && statistics.p25.push(item.p25);
      item?.p75 && statistics.p75.push(item.p75);
      item?.max && statistics.max.push(item.max);
    }

    return { dates, statistics };
  }

  const modelsData = getAxisData(models);
  const stationsData = getAxisData(stations);
  const modelsEnsembleData = getAxisData(modelsEnsemble);

  function generateLineChartDataWithY0(
    dates: string[],
    statistics: { [key: string]: number[] },
    baseConfig: {
      type: "scatter";
      mode: "lines+markers" | "none";
      name: string;
      line?: { color: string };
      fill?: "tonexty";
      fillcolor?: string;
    }[]
  ): LineChartDataType[] {
    if (
      statistics?.min &&
      statistics?.p25 &&
      statistics?.median &&
      statistics?.p75 &&
      statistics?.max &&
      enableStatistics
    ) {
      return [
        // Linha central (mediana)
        {
          x: dates,
          y: statistics.median,
          ...baseConfig[0],
        },
        {
          x: dates,
          y: statistics.min,
          y0: statistics.p25, // Define a base da área preenchida
          fill: "tonexty",
          fillcolor: baseConfig[2].fillcolor,
          type: "scatter",
          mode: "none",
          name: "Faixa min-p25",
        },
        // Faixa entre p25 e p75 (IQR - intervalo interquartil)
        {
          x: dates,
          y: statistics.p75,
          y0: statistics.median, // Define a base da área preenchida
          fill: "tonexty",
          fillcolor: baseConfig[1].fillcolor,
          type: "scatter",
          mode: "none",
          name: "Faixa p25-p75",
        },
        // Faixa entre min e p25
        {
          x: dates,
          y: statistics.p25,
          y0: statistics.median, // Define a base da área preenchida
          fill: "tonexty",
          fillcolor: baseConfig[2].fillcolor,
          type: "scatter",
          mode: "none",
          name: "Faixa min-p25",
        },
        // Faixa entre p75 e max
        {
          x: dates,
          y: statistics.max,
          y0: statistics.p75, // Define a base da área preenchida
          fill: "tonexty",
          fillcolor: baseConfig[3].fillcolor,
          type: "scatter",
          mode: "none",
          name: "Faixa p75-max",
        },
      ];
    } else {
      return [
        {
          x: dates,
          y: statistics.median,
          ...baseConfig[0],
        },
      ];
    }
  }

  const modelsBaseConfig: any = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Previsões",
      line: { color: "#dd6800" },
    },
    { fillcolor: "#dd680029" }, // Ciano transparente
    { fillcolor: "#dd68004a" }, // Azul claro e transparente
    { fillcolor: "#dd680029" }, // Verde transparente
    { fillcolor: "#dd68004a" }, // Azul claro e transparente
  ];

  const stationsBaseConfig: any = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Observados",
      line: { color: "#000", dash: "dash" },
    },
    { fillcolor: "#00000045" }, // Azul claro e transparente
    { fillcolor: "#00000021" }, // Azul claro e transparente
    { fillcolor: "#00000045" }, // Verde transparente
    { fillcolor: "#00000021" }, // Ciano transparente
  ];

  const modelsEnsembleBaseConfig: any = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Previsões Ensemble",
      line: { color: "#5f5f5f" },
    },
    { fillcolor: "#00000021" }, // Azul claro e transparente
    { fillcolor: "#00000014" }, // Azul claro e transparente
    { fillcolor: "#00000021" }, // Verde transparente
    { fillcolor: "#00000014" }, // Ciano transparente
  ];

  const modelsLineChartData = generateLineChartDataWithY0(
    modelsData.dates,
    modelsData.statistics,
    modelsBaseConfig
  );

  const stationsLineChartData = generateLineChartDataWithY0(
    stationsData.dates,
    stationsData.statistics,
    stationsBaseConfig
  );

  const modelsEnsembleLineChartData = generateLineChartDataWithY0(
    modelsEnsembleData.dates,
    modelsEnsembleData.statistics,
    modelsEnsembleBaseConfig
  );
  console.log("stationsLineChartData", modelsEnsembleLineChartData);

  return [
    ...modelsLineChartData,
    ...stationsLineChartData,
    ...(enableStatistics ? modelsEnsembleLineChartData : []),
  ];
}
