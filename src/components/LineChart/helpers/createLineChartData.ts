import { DataType } from "@/components/BoxPlot";

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
  models: DataType[] | undefined,
  stations: DataType[] | undefined
) {
  function getAxisData(data: DataType[] | undefined) {
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
      dates.push(item.date);
      statistics.median.push(item.median);
      statistics.min.push(item.min);
      statistics.p25.push(item.p25);
      statistics.p75.push(item.p75);
      statistics.max.push(item.max);
    }

    return { dates, statistics };
  }

  const modelsData = getAxisData(models);
  const stationsData = getAxisData(stations);

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
    return [
      // Linha central
      {
        x: dates,
        y: statistics.median,
        ...baseConfig[0],
      },
      // Faixa entre min e p25
      {
        x: dates,
        y: statistics.min,
        y0: statistics.p25, // Referência para a área inferior
        fill: "tonexty",
        fillcolor: baseConfig[1].fillcolor,
        type: "scatter",
        mode: "none",
        name: "Faixa min-p25",
      },
      {
        x: dates,
        y: statistics.p25,
        y0: statistics.min, // Referência para a área inferior
        fill: "tonexty",
        fillcolor: baseConfig[2].fillcolor,
        type: "scatter",
        mode: "none",
        name: "Faixa min-p25",
      },
      // Faixa entre p25 e p75
      {
        x: dates,
        y: statistics.p75,
        y0: statistics.p25, // Referência para a área média
        fill: "tonexty",
        fillcolor: baseConfig[3].fillcolor,
        type: "scatter",
        mode: "none",
        name: "Faixa p25-p75",
      },
      // Faixa entre p75 e max
      {
        x: dates,
        y: statistics.max,
        y0: statistics.p75, // Referência para a área superior
        fill: "tonexty",
        fillcolor: baseConfig[4].fillcolor,
        type: "scatter",
        mode: "none",
        name: "Faixa p75-max",
      },
    ];
  }

  const modelsBaseConfig: any = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Previsões",
      line: { color: "#000" },
    },
    { fillcolor: "#00000045" }, // Azul claro e transparente
    { fillcolor: "#00000021" }, // Azul claro e transparente
    { fillcolor: "#00000045" }, // Verde transparente
    { fillcolor: "#00000021" }, // Ciano transparente
  ];

  const stationsBaseConfig: any = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Observados",
      line: { color: "#1c84cd" },
    },
    { fillcolor: "#1f77b43d" }, // Ciano transparente
    { fillcolor: "#1f77b41c" }, // Azul claro e transparente
    { fillcolor: "#1f77b43d" }, // Verde transparente
    { fillcolor: "#1f77b41c" }, // Azul claro e transparente
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
  console.log("stationsLineChartData", stationsLineChartData);

  return [...modelsLineChartData, ...stationsLineChartData];
}
