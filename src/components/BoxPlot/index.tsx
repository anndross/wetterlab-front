"use client";
import ParamsContext from "@/app/dashboard/context";
import React, { useContext, useEffect, useState, useTransition } from "react";
import Plot from "react-plotly.js";
import { createBoxPlotData } from "./helpers/createBoxPlotData";

export type DataType = {
  date: string;
  min: number;
  p25: number;
  median: number;
  p75: number;
  max: number;
};

export interface ForecastType {
  dates: string[];
  stations: DataType[];
  models: DataType[];
}

export const BoxPlotExample = () => {
  const [forecast, setForecast] = useState<ForecastType>();
  const {
    params: { lat, lon, refTime, service, mean },
  } = useContext(ParamsContext);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function handleLoadForecast() {
      startTransition(async () => {
        const forecast = await fetch(
          `/api/meteor/forecast?latitude=${lat}&longitude=${lon}&ref-time=${refTime}&service=${service}&mean=30`
        ).then((data) => data.json());

        setForecast(forecast);
      });
    }

    if (lat && lon && refTime && service) handleLoadForecast();
  }, [lat, lon, refTime, service]);

  const boxPlotData =
    createBoxPlotData(forecast?.models, forecast?.stations) || [];

  return (
    <Plot
      data={boxPlotData}
      layout={{
        title: "Box Plot com Datas no Eixo X",
        xaxis: {
          title: "Datas",
          type: "category", // Configurar eixo X como categórico para lidar com agrupamento
        },
        yaxis: {
          title: "Valores",
        },
        boxmode: "group", // Agrupa as caixas por data
      }}
      config={{
        responsive: true, // Deixar o gráfico responsivo
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
