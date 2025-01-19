import { DataType } from "@/components/BoxPlot";

type LineChartDataType = {
  x: string[] | [];
  y: number[] | [];
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

  function generateLineChartData(
    dates: string[],
    statistics: { [key: string]: number[] },
    baseConfig: BaseConfigType[]
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
        fill: "tonexty",
        fillcolor: baseConfig[0].fillcolor,
        type: "scatter",
        mode: "none",
        name: `${baseConfig[0].name}: faixa min`,
      },
      {
        x: dates,
        y: statistics.p25,
        fill: "tonexty",
        fillcolor: baseConfig[1].fillcolor,
        type: "scatter",
        mode: "none",
        name: `${baseConfig[0].name}: faixa p25`,
      },
      {
        x: dates,
        y: statistics.p75,
        fill: "tonexty",
        fillcolor: baseConfig[2].fillcolor,
        type: "scatter",
        mode: "none",
        name: `${baseConfig[0].name}: faixa p75`,
      },
      {
        x: dates,
        y: statistics.max,
        fill: "tonexty",
        fillcolor: baseConfig[3].fillcolor,
        type: "scatter",
        mode: "none",
        name: `${baseConfig[0].name}: faixa max`,
      },
    ];
  }

  const modelsBaseConfig: BaseConfigType[] = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Previsões",
      line: { color: "#000" },
    },
    { fillcolor: "rgba(255, 0, 0, 0.1)" }, // Vermelho claro e transparente
    { fillcolor: "rgba(246, 93, 255, 0.11)" }, // Rosa claro e transparente
    { fillcolor: "rgba(255, 165, 0, 0.15)" }, // Laranja transparente
    { fillcolor: "rgba(255, 255, 0, 0.2)" }, // Amarelo transparente
  ];

  const stationsBaseConfig: BaseConfigType[] = [
    {
      type: "scatter",
      mode: "lines+markers",
      name: "Observados",
      line: { color: "#1f77b4" },
    },
    { fillcolor: "rgba(0, 0, 255, 0.1)" }, // Azul claro e transparente
    { fillcolor: "rgba(79, 69, 131, 0.11)" }, // Roxo claro e transparente
    { fillcolor: "rgba(0, 255, 0, 0.15)" }, // Verde transparente
    { fillcolor: "rgba(0, 255, 255, 0.2)" }, // Ciano transparente
  ];

  const modelsLineChartData = generateLineChartData(
    modelsData.dates,
    modelsData.statistics,
    modelsBaseConfig
  );

  const stationsLineChartData = generateLineChartData(
    stationsData.dates,
    stationsData.statistics,
    stationsBaseConfig
  );

  return [...modelsLineChartData, ...stationsLineChartData];
}
